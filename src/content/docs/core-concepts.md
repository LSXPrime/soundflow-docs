---
title: Core Concepts
description: Learn the fundamental building blocks of SoundFlow and how they interact to create a powerful and flexible audio processing pipeline.
---

# Core Concepts

This section explains the fundamental building blocks of SoundFlow and how they interact to create a powerful and flexible audio processing pipeline. Understanding these core concepts is essential for effectively using and extending the SoundFlow audio engine.

## Audio Engine (`AudioEngine`)

The `AudioEngine` is the heart of SoundFlow. It's responsible for:

*   **Initializing and managing the audio backend:** SoundFlow supports multiple audio backends (e.g., `MiniAudio`), which handle the low-level interaction with the operating system's audio API. The `AudioEngine` abstracts away the backend details, providing a consistent interface for higher-level components.
*   **Controlling audio device settings:** The engine allows you to configure parameters like sample rate, channel count, and buffer size.
*   **Driving the audio processing loop:** The `AudioEngine` runs a dedicated, high-priority thread that continuously processes audio data. This ensures real-time performance and minimizes latency.
*   **Providing the root of the audio graph:** The engine hosts the `Master` mixer, which is the starting point for building complex audio processing pipelines.

**Key Properties:**

*   `SampleRate`: The audio sample rate (e.g., 44100 Hz).
*   `Channels`: The number of audio channels (e.g., 2 for stereo).
*   `Capability`:  Indicates whether the engine is configured for `Playback`, `Recording`, `Mixed` (both), or `Loopback`.
*   `SampleFormat`: The format of audio samples (e.g., `F32` for 32-bit floating-point).
*   `Backend`: The currently active audio backend.
*   `IsDisposed`: Indicates whether the engine has been disposed.

**Key Methods:**

*   `CreateEncoder(...)`: Creates an instance of an `ISoundEncoder` for the current backend.
*   `CreateDecoder(...)`: Creates an instance of an `ISoundDecoder` for the current backend.
*   `SoloComponent(...)`: Isolates a specific `SoundComponent` in the audio graph for debugging or monitoring.
*   `UnsoloComponent(...)`: Removes a component from the soloed state.
*   `Dispose()`: Releases the resources used by the `AudioEngine`.

**Example:**

```csharp
// Initialize a MiniAudioEngine with a 48kHz sample rate, stereo output, and 32-bit float samples.
using var audioEngine = new MiniAudioEngine(48000, Capability.Playback, SampleFormat.F32, 2);
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
    *   `Pan`: Controls the stereo panning.
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
            buffer[i] = MathF.Sin(_phase);
            _phase += 2 * MathF.PI * Frequency / sampleRate;
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
var player = new SoundPlayer(new StreamDataProvider(File.OpenRead("audio.wav")));
var oscillator = new Oscillator { Frequency = 220, Type = Oscillator.WaveformType.Square };

// Add both to the Master mixer
Mixer.Master.AddComponent(player);
Mixer.Master.AddComponent(oscillator);
```


## Sound Modifiers (`SoundModifier`)

`SoundModifier` is an abstract base class for creating audio effects that modify the audio stream. Modifiers are applied to `SoundComponent` instances and process the audio data on a sample-by-sample basis.

**Key Features:**

*   **`ProcessSample(float sample, int channel)`:** This is the core method that derived classes must implement. It takes a single audio sample and the channel index as input and returns the modified sample.
*   **Chaining:** Modifiers can be chained together to create complex effects.

**Built-in Modifiers:**

SoundFlow provides a variety of built-in modifiers:

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
*  Treble Boost Modifier: Enhances high frequencies.


**Example:**

```csharp
// Create a SoundPlayer and a Reverb modifier
var player = new SoundPlayer(new StreamDataProvider(File.OpenRead("audio.wav")));
var reverb = new AlgorithmicReverbModifier { RoomSize = 0.8f, Wet = 0.2f };

// Add the reverb modifier to the player
player.AddModifier(reverb);

// Add the player to the Master mixer
Mixer.Master.AddComponent(player);
```


## Audio Playback (`SoundPlayer`, `SurroundPlayer`)

SoundFlow provides two classes for audio playback:

*   **`SoundPlayer`:** A basic `SoundComponent` that plays audio from an `ISoundDataProvider`.
*   **`SurroundPlayer`:** An extended version of `SoundPlayer` that supports advanced surround sound configurations.

**`ISoundPlayer` interface, which defines methods for controlling playback:**
*   `State`: Indicates the current playback state (Playing, Paused, Stopped).
*   `IsLooping`: Enables or disables looping.
*   `Time`: Gets the current playback position.
*   `Duration`: Gets the total duration of the audio.
*   `LoopStartSeconds`: Gets the loop start point in seconds.
*   `LoopEndSeconds`: Gets the loop end point in seconds. -1 indicates loop to the natural end of the audio.
*   `LoopStartSamples`: Gets the loop start point in samples.
*   `LoopEndSamples`: Gets the loop end point in samples. -1 indicates loop to the natural end of the audio.
*   `PlaybackEnded`: An event that is raised when playback finishes.
*   `Play()`: Begins audio playback.
*   `Pause()`: Pauses audio playback.
*   `Stop()`: Stops audio playback and resets the playhead to the beginning.
*   `Seek(float time)`: Seeks to a specific time in seconds.
*   `Seek(int sampleOffset)`: Seeks to a specific sample offset.
*   `SetLoopPoints(float startTime, float? endTime = -1f)`: Sets the loop points in seconds. `endTime` is optional, and using -1 or null loops to the natural end.
*   `SetLoopPoints(int startSample, int endSample = -1)`: Sets the loop points in samples. `endSample` is optional, and using -1 loops to the natural end.

**Key Features (`SoundPlayer`):**
*   Inherits from `ISoundPlayer`.

**Key Features (`SurroundPlayer`):**

*   Inherits from `ISoundPlayer`.
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
*   `FilePath`: The path to the output file (if recording to a file).
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

**Built-in Providers:**

*   `AssetDataProvider`: Loads audio data from a byte array (useful for in-memory assets).
*   `StreamDataProvider`: Reads audio data from a `Stream` (supports seeking if the stream is seekable).
*   `MicrophoneDataProvider`: Captures audio data from the microphone in real-time.
*   `ChunkedDataProvider`: Reads audio data from a file or stream in chunks, making it efficient for large files. It decodes audio on-demand and prefetches data to ensure smooth playback.
*   `NetworkDataProvider`: Reads audio data from a network source (URL). It supports both direct audio file URLs and HLS (HTTP Live Streaming) playlists. It handles playlist parsing, segment downloading, and seeking.
*   `RawDataProvider`: Reads audio data from a raw pcm stream. 

## Audio Encoding/Decoding (`ISoundEncoder`, `ISoundDecoder`)

`ISoundEncoder` and `ISoundDecoder` are interfaces for encoding and decoding audio data to and from different formats.

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
*   **Integration with Visualizers:** Analyzers are often used in conjunction with `IVisualizer` implementations to display the analysis results visually.

**Built-in Analyzers:**

*   Level Meter Analyzer: Measures the RMS (root mean square) and peak levels of an audio signal.
*   Spectrum Analyzer: Computes the frequency spectrum of the audio using the Fast Fourier Transform (FFT).
*   Voice Activity Detector: Detects the presence of human voice in an audio stream.


## Audio Visualization (`IVisualizer`)

`IVisualizer` is an interface for creating components that visualize audio data. Visualizers typically don't modify the audio stream but instead render a graphical representation of the data.

**Key Features:**

*   `Name`: A descriptive name for the visualizer.
*   `ProcessOnAudioData(Span<float> audioData)`: This method is called by the audio engine to provide the visualizer with a chunk of audio data to process.
*   `Render(IVisualizationContext context)`: This method is called to render the visualization. It receives an `IVisualizationContext` instance, which provides drawing methods.
*   `VisualizationUpdated`: An event that is raised when the visualization needs to be redrawn (e.g., when new audio data has been processed).

## Visualization Context (`IVisualizationContext`):

This interface provides a set of drawing methods for rendering the visualization. The specific implementation of `IVisualizationContext` will depend on the UI framework you are using.

**Built-in Visualizers:**

*   Level Meter Visualizer: Displays a level meter that shows the current RMS or peak level of the audio.
*   Spectrum Visualizer: Renders a bar graph representing the frequency spectrum of the audio.
*   Waveform Visualizer: Draws the waveform of the audio signal.