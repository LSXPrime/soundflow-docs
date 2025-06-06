---
title: Core Concepts
description: Learn the fundamental building blocks of SoundFlow and how they interact to create a powerful and flexible audio processing pipeline.
---

# Core Concepts

This section explains the fundamental building blocks of SoundFlow and how they interact to create a powerful and flexible audio processing pipeline. Understanding these core concepts is essential for effectively using and extending the SoundFlow audio engine.

## Audio Engine (`AudioEngine`)

The `AudioEngine` is the heart of SoundFlow. It's responsible for:

*   **Initializing and managing the audio backend:** SoundFlow supports multiple audio backends (e.g., `MiniAudio`), which handle the low-level interaction with the operating system's audio API. The `AudioEngine` abstracts away the backend details, providing a consistent interface for higher-level components.
*   **Enumerating and Managing Audio Devices:** The engine can list available playback and capture devices and allows switching between them during runtime.
*   **Controlling audio device settings:** The engine allows you to configure parameters like sample rate, channel count, and buffer size.
*   **Driving the audio processing loop:** The `AudioEngine` runs a dedicated, high-priority thread (or uses backend-driven callbacks) that continuously processes audio data. This ensures real-time performance and minimizes latency.
*   **Providing the root of the audio graph:** The engine hosts the `Master` mixer, which is the starting point for building complex audio processing pipelines.

**Key Properties:**

*   `SampleRate`: The audio sample rate (e.g., 44100 Hz, 48000 Hz).
*   `Channels`: The number of audio channels (e.g., 2 for stereo).
*   `Capability`:  Indicates whether the engine is configured for `Playback`, `Recording`, `Mixed` (both), or `Loopback`.
*   `SampleFormat`: The format of audio samples (e.g., `F32` for 32-bit floating-point).
*   `IsDisposed`: Indicates whether the engine has been disposed.
*   `CurrentPlaybackDevice`, `CurrentCaptureDevice`: Information about the currently active audio devices.
*   `PlaybackDevices`, `CaptureDevices`: Lists of available audio devices.

**Key Methods:**

*   `CreateEncoder(...)`: Creates an instance of an `ISoundEncoder` for the current backend.
*   `CreateDecoder(...)`: Creates an instance of an `ISoundDecoder` for the current backend.
*   `UpdateDevicesInfo()`: Refreshes the list of available audio devices.
*   `SwitchDevice(...)`, `SwitchDevices(...)`: Changes the active playback and/or capture device.
*   `SoloComponent(...)`: Isolates a specific `SoundComponent` in the audio graph for debugging or monitoring.
*   `UnsoloComponent(...)`: Removes a component from the soloed state.
*   `Dispose()`: Releases the resources used by the `AudioEngine`.

**Example:**

```csharp
// Initialize a MiniAudioEngine with a 48kHz sample rate, stereo output, and 32-bit float samples.
// 48kHz is a common rate and compatible with extensions like WebRTC APM.
using var audioEngine = new MiniAudioEngine(48000, Capability.Playback, SampleFormat.F32, 2);

// List playback devices
audioEngine.UpdateDevicesInfo();
foreach(var device in audioEngine.PlaybackDevices)
{
    Console.WriteLine($"Device: {device.Name}, Default: {device.IsDefault}");
}
```


## Sound Components (`SoundComponent`)

`SoundComponent` is the abstract base class for all audio processing units in SoundFlow. Each component represents a node in a directed acyclic graph (DAG), known as the **audio graph**.

**Key Features:**

*   **Modular Processing:** Components encapsulate specific audio processing logic, making the system modular and extensible.
*   **Input and Output Connections:** Components can have zero or more input and output connections, allowing data to flow between them.
*   **`GenerateAudio(Span<float> buffer)`:** This is the core method that derived classes must implement. It's called repeatedly by the audio engine to either:
    *   **Generate new audio samples:** For source components like oscillators or file players.
    *   **Modify existing audio samples:** For effects, filters, or analyzers.
*   **Properties:**
    *   `Name`: A descriptive name for the component.
    *   `Volume`: Controls the output gain.
    *   `Pan`: Controls the stereo panning (0.0 for full left, 0.5 for center, 1.0 for full right).
    *   `Enabled`: Enables or disables the component's processing.
    *   `Solo`: Isolates the component for debugging.
    *   `Mute`: Silences the component's output.
    *   `Parent`: The `Mixer` to which this component belongs (if any).
*   **Methods:**
    *   `ConnectInput(SoundComponent input)`: Connects another component's output to this component's input.
    *   `DisconnectInput(SoundComponent input)`: Disconnects an input connection.
    *   `AddAnalyzer(AudioAnalyzer analyzer)`: Adds an `AudioAnalyzer` to this component.
    *   `RemoveAnalyzer(AudioAnalyzer analyzer)`: Removes an `AudioAnalyzer` from this component.
    *   `AddModifier(SoundModifier modifier)`: Adds a `SoundModifier` to this component.
    *   `RemoveModifier(SoundModifier modifier)`: Removes a `SoundModifier` from this component.

**Example:**

```csharp
// A simple custom SoundComponent that generates a sine wave
public class SineWaveGenerator : SoundComponent
{
    public float Frequency { get; set; } = 440f; // Frequency in Hz
    private float _phase;

    protected override void GenerateAudio(Span<float> buffer)
    {
        var sampleRate = AudioEngine.Instance.SampleRate;
        for (int i = 0; i < buffer.Length; i++)
        {
            buffer[i] = MathF.Sin(_phase); // Assumes mono output or fills one channel
            _phase += 2 * MathF.PI * Frequency / sampleRate;
            if (_phase > 2 * MathF.PI) _phase -= 2 * MathF.PI;
        }
    }
}
```


## Mixer (`Mixer`)

The `Mixer` is a specialized `SoundComponent` that combines the output of multiple `SoundComponent` instances into a single audio stream.

**Key Features:**

*   **`Master` Mixer:** The `Mixer.Master` static property provides access to the default root mixer, which is automatically created by the `AudioEngine`. All audio ultimately flows through the `Master` mixer before reaching the output device.
*   **Adding and Removing Components:**
    *   `AddComponent(SoundComponent component)`: Adds a component to the mixer's inputs.
    *   `RemoveComponent(SoundComponent component)`: Removes a component from the mixer.
*   **Efficient Mixing:** The `Mixer` uses SIMD instructions (when available) to perform mixing operations very efficiently.

**Example:**

```csharp
// Create a SoundPlayer and an Oscillator
using var dataProvider = new StreamDataProvider(File.OpenRead("audio.wav"));
var player = new SoundPlayer(dataProvider);
var oscillator = new Oscillator { Frequency = 220, Type = Oscillator.WaveformType.Square };

// Add both to the Master mixer
Mixer.Master.AddComponent(player);
Mixer.Master.AddComponent(oscillator);
// ...
// Don't forget to dispose dataProvider when done if not using 'using' on player scope
```


## Sound Modifiers (`SoundModifier`)

`SoundModifier` is an abstract base class for creating audio effects that modify the audio stream. Modifiers are applied to `SoundComponent` instances or to `AudioSegment`, `Track`, `Composition` and process the audio data.

**Key Features:**

*   **`ProcessSample(float sample, int channel)`:** This is the core method that derived classes can implement to process audio on a sample-by-sample basis.
*   **`Process(Span<float> buffer)`:** This method can be overridden for buffer-based processing, which is often more efficient for complex effects. By default, it calls `ProcessSample` for each sample.
*   **`Enabled` Property:** Allows dynamically enabling or disabling the modifier's effect.
*   **Chaining:** Modifiers can be chained together on a `SoundComponent` to create complex effect pipelines.

**Built-in Modifiers:**

SoundFlow provides a variety of built-in modifiers, including:
*   Algorithmic Reverb Modifier: Simulates reverberation.
*   Ambient Reverb Modifier: Creates a sense of spaciousness.
*   Bass Boost Modifier: Enhances low frequencies.
*   Chorus Modifier: Creates a chorus effect.
*   Compressor Modifier: Reduces dynamic range.
*   Delay Modifier: Applies a delay effect.
*   Frequency Band Modifier: Boosts or cuts frequency bands.
*   Noise Reduction Modifier: Reduces noise.
*   Parametric Equalizer: Provides precise EQ control.
*   Stereo Chorus Modifier: Creates a stereo chorus.
*   Treble Boost Modifier: Enhances high frequencies.
*   And potentially external modifiers like `WebRtcApmModifier` via extensions.


**Example:**

```csharp
// Create a SoundPlayer and a Reverb modifier
using var dataProvider = new StreamDataProvider(File.OpenRead("audio.wav"));
var player = new SoundPlayer(dataProvider);
var reverb = new AlgorithmicReverbModifier { RoomSize = 0.8f, Wet = 0.2f };

// Add the reverb modifier to the player
player.AddModifier(reverb);

// Add the player to the Master mixer
Mixer.Master.AddComponent(player);
// ...
```

## Sound Player Base (`SoundPlayerBase`)

`SoundPlayerBase` is a new abstract class that provides common functionality for sound playback components like `SoundPlayer` and `SurroundPlayer`.

**Key Features (inherited by `SoundPlayer` and `SurroundPlayer`):**

*   Implements `ISoundPlayer`.
*   Handles core playback logic: reading from an `ISoundDataProvider`, managing playback state (Play, Pause, Stop).
*   Supports playback speed adjustment via `PlaybackSpeed` property.
*   Manages looping with `IsLooping`, `LoopStartSamples`/`Seconds`, `LoopEndSamples`/`Seconds`.
*   Provides seeking capabilities via `Seek` methods (accepting time in seconds, sample offset, or `TimeSpan`).
*   `Volume` control (inherited from `SoundComponent`).
*   `PlaybackEnded` event.

## Audio Playback (`SoundPlayer`, `SurroundPlayer`)

SoundFlow provides concrete classes for audio playback, deriving from `SoundPlayerBase`:

*   **`SoundPlayer`:** A `SoundPlayerBase` implementation for standard mono or stereo audio playback from an `ISoundDataProvider`.
*   **`SurroundPlayer`:** An extended `SoundPlayerBase` implementation that supports advanced surround sound configurations.

**Key Features (`SoundPlayer`):**
*   All features from `SoundPlayerBase` and `ISoundPlayer`.

**Key Features (`SurroundPlayer`):**
*   All features from `SoundPlayerBase` and `ISoundPlayer`.
*   `SpeakerConfiguration`: Allows you to define the speaker setup (e.g., Stereo, Quad, 5.1, 7.1, or a custom configuration).
*   `PanningMethod`: Selects the panning algorithm to use (Linear, EqualPower, or VBAP).
*   `ListenerPosition`: Sets the listener's position relative to the speakers.
*   `VbapParameters`: Provides fine-grained control over VBAP (Vector Base Amplitude Panning) settings.


## Audio Recording (`Recorder`)

The `Recorder` class allows you to capture audio input from a recording device.

**Key Features:**

*   `StartRecording()`: Begins the recording process.
*   `PauseRecording()`: Pauses the recording.
*   `ResumeRecording()`: Resumes a paused recording.
*   `StopRecording()`: Stops the recording and finalizes the output.
*   `State`: Indicates the current recording state (Playing, Paused, Stopped).
*   `SampleFormat`: The sample format to use for recording.
*   `EncodingFormat`: The encoding format to use when saving to a file (e.g., WAV, FLAC), Currently only WAV supported by miniaudio backend.
*   `SampleRate`: The sample rate for recording.
*   `Channels`: The number of channels to record.
*   `Stream`: The output `Stream` where recorded audio is written.
*   `ProcessCallback`: A delegate that can be used to process recorded audio samples in real time.
*   **Voice Activity Detection:** The `Recorder` can be integrated with a `VoiceActivityDetector` to automatically start and stop recording based on the presence of voice activity.


## Audio Providers (`ISoundDataProvider`)

`ISoundDataProvider` is an interface that defines a standard way to access audio data, regardless of its source.

**Key Features:**

*   `Position`: The current read position within the audio data (in samples).
*   `Length`: The total length of the audio data (in samples).
*   `CanSeek`: Indicates whether seeking is supported.
*   `SampleFormat`: The format of the audio samples.
*   `SampleRate`: The sample rate of the audio.
*   `ReadBytes(Span<float> buffer)`: Reads a chunk of audio data into the provided buffer.
*   `Seek(int offset)`: Moves the read position to a specific offset (in samples).
*   `EndOfStreamReached`: An event that is raised when the end of the audio data is reached.
*   `PositionChanged`: An event that is raised when the read position changes.
*   `Dispose()`: Implementations should release underlying resources (e.g., file streams).

**Built-in Providers:**

*   `AssetDataProvider`: Loads audio data from a byte array or `Stream`.
*   `StreamDataProvider`: Reads audio data from a `Stream`.
*   `MicrophoneDataProvider`: Captures audio data from the microphone in real-time.
*   `ChunkedDataProvider`: Reads audio data from a file or stream in chunks.
*   `NetworkDataProvider`: Reads audio data from a network source (URL, HLS).
*   `RawDataProvider`: Reads audio data from a raw PCM stream or various raw array types (`float[]`, `byte[]`, `int[]`, `short[]`).

It's good practice to dispose of `ISoundDataProvider` instances when they are no longer needed, for example, using a `using` statement.

```csharp
using var dataProvider = new StreamDataProvider(File.OpenRead("audio.wav"));
// Use dataProvider
```

## Audio Encoding/Decoding (`ISoundEncoder`, `ISoundDecoder`)

`ISoundEncoder` and `ISoundDecoder` are interfaces for encoding and decoding audio data to and from different formats. Both are `IDisposable`.

*   **`ISoundEncoder`:** Encodes raw audio samples into a specific format (e.g., WAV, FLAC, MP3). Currently only WAV supported by miniaudio backend.
*   **`ISoundDecoder`:** Decodes audio data from a specific format into raw audio samples.

**`MiniAudio` Backend:**

The `MiniAudio` backend provides implementations of these interfaces using the `miniaudio` library:

*   `MiniAudioEncoder`
*   `MiniAudioDecoder`


## Audio Analysis (`AudioAnalyzer`)

`AudioAnalyzer` is an abstract base class for creating components that analyze audio data. Analyzers typically extract information from the audio stream without modifying it.

**Key Features:**

*   `Analyze(Span<float> buffer)`: An abstract method that derived classes must implement to perform their specific analysis.
*   `Enabled`: If false, the `Analyze` step might be skipped by the `SoundComponent` it's attached to.
*   **Integration with Visualizers:** Analyzers are often used in conjunction with `IVisualizer` implementations to display the analysis results visually.

**Built-in Analyzers:**

*   Level Meter Analyzer: Measures the RMS (root mean square) and peak levels of an audio signal.
*   Spectrum Analyzer: Computes the frequency spectrum of the audio using the Fast Fourier Transform (FFT).
*   Voice Activity Detector: Detects the presence of human voice in an audio stream.


## Audio Visualization (`IVisualizer`)

`IVisualizer` is an interface for creating components that visualize audio data. Visualizers typically don't modify the audio stream but instead render a graphical representation of the data. It implements `IDisposable`.

**Key Features:**

*   `Name`: A descriptive name for the visualizer.
*   `ProcessOnAudioData(Span<float> audioData)`: This method is called by the audio engine to provide the visualizer with a chunk of audio data to process.
*   `Render(IVisualizationContext context)`: This method is called to render the visualization. It receives an `IVisualizationContext` instance, which provides drawing methods.
*   `VisualizationUpdated`: An event that is raised when the visualization needs to be redrawn (e.g., when new audio data has been processed).
*   `Dispose()`: Releases resources held by the visualizer.

## Visualization Context (`IVisualizationContext`):

This interface provides a set of drawing methods for rendering the visualization. The specific implementation of `IVisualizationContext` will depend on the UI framework you are using.

**Built-in Visualizers:**

*   Level Meter Visualizer: Displays a level meter that shows the current RMS or peak level of the audio.
*   Spectrum Visualizer: Renders a bar graph representing the frequency spectrum of the audio.
*   Waveform Visualizer: Draws the waveform of the audio signal.

## Editing Engine & Persistence (`SoundFlow.Editing`, `SoundFlow.Editing.Persistence`)

SoundFlow v1.1.0 introduces a powerful non-destructive audio editing engine. For a detailed guide, please see the [Editing Engine & Persistence](./editing-engine.mdx) documentation.

**Key Concepts:**

*   **`Composition`**: The main container for an audio project, holding multiple `Track`s. It can be rendered or played back.
*   **`Track`**: Represents a single audio track within a `Composition`. Contains `AudioSegment`s and has its own settings (volume, pan, mute, solo, effects).
*   **`AudioSegment`**: A clip of audio placed on a `Track`'s timeline. It references a portion of an `ISoundDataProvider` and has its own extensive settings.
    *   **`AudioSegmentSettings`**: Controls volume, pan, fades (with `FadeCurveType`), looping (`LoopSettings`), reverse playback, speed, and **pitch-preserved time stretching** (via `TimeStretchFactor` or `TargetStretchDuration`, powered by `WsolaTimeStretcher`).
    *   Supports segment-level modifiers and analyzers.
*   **Non-Destructive:** Edits do not alter the original audio source files. All operations are applied at runtime during playback or rendering.
*   **Project Persistence (`CompositionProjectManager`)**:
    *   Save and load entire compositions as `.sfproj` files.
    *   **Media Consolidation**: Option to copy all external audio files into an `Assets` folder within the project.
    *   **Embed Small Media**: Option to embed small audio files (e.g., SFX) directly into the project file.
    *   **Relink Missing Media**: If an audio file is moved, the project can be relinked to its new location.

This new engine allows for programmatic creation and manipulation of complex audio timelines, effects processing at multiple levels (segment, track, master), and robust project management.