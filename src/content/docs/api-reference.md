---
title: API Reference
description: A detailed overview of the SoundFlow API, including namespaces, classes, interfaces, and their members.
---

# API Reference

This section provides a detailed overview of the SoundFlow API, including namespaces, classes, interfaces, and their members. It serves as a comprehensive reference for developers working with the SoundFlow library.

## Namespaces

SoundFlow is organized into the following namespaces:

*   **`SoundFlow.Abstracts`:** Contains abstract classes and interfaces that define the core framework of SoundFlow. These classes provide the foundation for building custom components, modifiers, and other extensions.
*   **`SoundFlow.Backends`:** Provides backend-specific implementations for audio input/output. The primary backend currently supported is `SoundFlow.Backends.MiniAudio`, which uses the `miniaudio` library.
*   **`SoundFlow.Components`:** Contains concrete `SoundComponent` classes that provide various audio processing functionalities, including playback, recording, mixing, and analysis.
*   **`SoundFlow.Enums`:** Contains enumerations used throughout the SoundFlow library to represent different states, options, and capabilities.
*   **`SoundFlow.Exceptions`:** Contains custom exception classes used for error handling within SoundFlow.
*   **`SoundFlow.Extensions`:** Namespace for official extensions.
    *   **`SoundFlow.Extensions.WebRtc.Apm`:** Provides integration with the WebRTC Audio Processing Module for features like echo cancellation, noise suppression, and automatic gain control.
        *   **`SoundFlow.Extensions.WebRtc.Apm.Components`:** Contains components utilizing the WebRTC APM, like `NoiseSuppressor`.
        *   **`SoundFlow.Extensions.WebRtc.Apm.Modifiers`:** Contains modifiers utilizing the WebRTC APM, like `WebRtcApmModifier`.
*   **`SoundFlow.Interfaces`:** Contains interfaces that define contracts for various functionalities, such as audio data providers, encoders, decoders, and visualizers.
*   **`SoundFlow.Modifiers`:** Contains concrete `SoundModifier` classes that implement various audio effects.
*   **`SoundFlow.Providers`:** Contains classes that implement the `ISoundDataProvider` interface, providing ways to load audio data from different sources.
*   **`SoundFlow.Structs`:** Contains custom struct types used within SoundFlow, often for interop or specific data representation.
*   **`SoundFlow.Utils`:** Contains utility classes and extension methods that provide helpful functionalities for working with audio data and performing common operations.
*   **`SoundFlow.Visualization`:** Contains classes related to audio visualization, including analyzers and visualizers.

## Key Classes and Interfaces

Below is a summary of the key classes and interfaces in SoundFlow.


### Abstracts

| Class/Interface                               | Description                                                                                                     |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [`AudioAnalyzer`](#abstracts-audioanalyzer)   | Abstract base class for audio analysis components. Inherits from `SoundComponent`.                              |
| [`AudioEngine`](#abstracts-audioengine)       | Abstract base class for audio engine implementations. Manages audio device, processing thread, and audio graph. |
| [`SoundComponent`](#abstracts-soundcomponent) | Abstract base class for all audio processing units in SoundFlow. Represents a node in the audio graph.          |
| [`SoundModifier`](#abstracts-soundmodifier)   | Abstract base class for audio effects that modify audio samples.                                                |
| [`SoundPlayerBase`](#abstracts-soundplayerbase) | Abstract base class providing common functionality for sound playback components. Inherits from `SoundComponent` and implements `ISoundPlayer`. |

### Backends.MiniAudio

| Class/Interface                                           | Description                                                                                                                                |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [`MiniAudioDecoder`](#backendsminiaudio-miniaudiodecoder) | `ISoundDecoder` implementation using the `miniaudio` library.                                                                              |
| [`MiniAudioEncoder`](#backendsminiaudio-miniaudiodecoder) | `ISoundEncoder` implementation using the `miniaudio` library.                                                                              |
| [`MiniAudioEngine`](#backendsminiaudio-miniaudioengine)   | `AudioEngine` implementation that uses the `miniaudio` library for audio I/O. Provides concrete implementations for encoding and decoding. |

### Components

| Class/Interface                                                | Description                                                                                                                                            |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`EnvelopeGenerator`](#components-envelopegenerator)           | `SoundComponent` that generates an ADSR (Attack, Decay, Sustain, Release) envelope signal.                                                             |
| [`Filter`](#components-filter)                                 | `SoundComponent` that applies a digital filter (low-pass, high-pass, band-pass, notch) to the audio signal.                                            |
| [`LowFrequencyOscillator`](#components-lowfrequencyoscillator) | `SoundComponent` that generates a low-frequency oscillator (LFO) signal with various waveforms.                                                        |
| [`Mixer`](#components-mixer)                                   | `SoundComponent` that mixes multiple audio streams together. The `Mixer.Master` property provides access to the default root mixer.                    |
| [`Oscillator`](#components-oscillator)                         | `SoundComponent` that generates various waveforms (sine, square, sawtooth, triangle, noise, pulse).                                                    |
| [`Recorder`](#components-recorder)                             | `SoundComponent` that captures audio input from a recording device and allows saving it to a file or processing it via a callback.                     |
| [`SoundPlayer`](#components-soundplayer)                       | `SoundPlayerBase` implementation that plays audio from an `ISoundDataProvider`.                                                                        |
| [`SurroundPlayer`](#components-surroundplayer)                 | `SoundPlayerBase` implementation that extends `SoundPlayer` to support surround sound configurations with customizable speaker positions, delays, and panning methods. |
| [`VoiceActivityDetector`](#components-voiceactivitydetector)   | `SoundComponent` and `AudioAnalyzer` that detects the presence of human voice in an audio stream using spectral features and energy thresholds.        |

### Enums

| Enum                                             | Description                                                                                                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Capability`](#enums-capability)                | Specifies the capabilities of an `AudioEngine` instance (Playback, Recording, Mixed, Loopback).                                           |
| [`DeviceType`](#enums-devicetype)                | Specifies the type of audio device (Playback, Capture).                                                                                     |
| [`EncodingFormat`](#enums-encodingformat)        | Specifies the audio encoding format to use (e.g., WAV, FLAC, MP3, Vorbis).                                                              |
| [`PlaybackState`](#enums-playbackstate)          | Specifies the current playback state of a `SoundPlayer` or `SurroundPlayer` (Stopped, Playing, Paused).                                    |
| [`Result`](#enums-result)                        | Represents the result of an operation, including success and various error codes.                                                           |
| [`SampleFormat`](#enums-sampleformat)            | Specifies the format of audio samples (e.g., U8, S16, S24, S32, F32).                                                                     |
| [`FilterType`](#enums-filtertype)                | Specifies the type of filter to use in the `Filter` and `ParametricEqualizer` components (Peaking, LowShelf, HighShelf, BandPass, Notch, LowPass, HighPass) |
| [`EnvelopeGenerator.EnvelopeState`](#enums-envelopegenerator-envelopestate) | Specifies the current state of the envelope generator (Idle, Attack, Decay, Sustain, Release) |
| [`EnvelopeGenerator.TriggerMode`](#enums-envelopegenerator-triggermode) | Specifies how the envelope generator is triggered (NoteOn, Gate, Trigger) |
| [`LowFrequencyOscillator.WaveformType`](#enums-lowfrequencyoscillator-waveformtype) | Specifies the waveform type for the low-frequency oscillator (Sine, Square, Triangle, Sawtooth, ReverseSawtooth, Random, SampleAndHold) |
| [`LowFrequencyOscillator.TriggerMode`](#enums-lowfrequencyoscillator-triggermode) | Specifies how the LFO is triggered (FreeRunning, NoteTrigger) |
| [`Oscillator.WaveformType`](#enums-oscillator-waveformtype) | Specifies the waveform type for the oscillator (Sine, Square, Sawtooth, Triangle, Noise, Pulse) |
| [`SurroundPlayer.SpeakerConfiguration`](#enums-surroundplayer-speakerconfiguration) | Specifies the speaker configuration for the surround player (Stereo, Quad, Surround51, Surround71, Custom) |
| [`SurroundPlayer.PanningMethod`](#enums-surroundplayer-panningmethod) | Specifies the panning method for the surround player (Linear, EqualPower, Vbap) |
| **`SoundFlow.Extensions.WebRtc.Apm` Enums**          |                                                                                                                                             |
| [`ApmError`](#extensions-webrtc-apm-apmerror)     | Error codes returned by the WebRTC Audio Processing Module.                                                                                |
| [`NoiseSuppressionLevel`](#extensions-webrtc-apm-noisesuppressionlevel) | Specifies noise suppression levels (Low, Moderate, High, VeryHigh).                                                                  |
| [`GainControlMode`](#extensions-webrtc-apm-gaincontrolmode) | Specifies gain controller modes (AdaptiveAnalog, AdaptiveDigital, FixedDigital).                                                        |
| [`DownmixMethod`](#extensions-webrtc-apm-downmixmethod) | Specifies methods for downmixing audio channels (AverageChannels, UseFirstChannel).                                                    |
| [`RuntimeSettingType`](#extensions-webrtc-apm-runtimesettingtype) | Specifies types of runtime settings for the WebRTC APM.                                                                        |

### Exceptions

| Class                                           | Description                                                                                   |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`BackendException`](#exceptions-backendexception) | Thrown when an error occurs in a specific audio backend.                                     |

### Extensions.WebRtc.Apm

| Class/Interface                                                                 | Description                                                                                                                                       |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`AudioProcessingModule`](#extensions-webrtc-apm-audioprocessingmodule)         | Provides access to the native WebRTC Audio Processing Module for advanced audio processing like AEC, NS, AGC.                                     |
| [`ApmConfig`](#extensions-webrtc-apm-apmconfig)                                 | Represents a configuration for the `AudioProcessingModule`, allowing enabling/disabling and setting parameters for various APM features.            |
| [`StreamConfig`](#extensions-webrtc-apm-streamconfig)                           | Represents a stream configuration (sample rate, channels) for audio processing within the APM.                                                    |
| [`ProcessingConfig`](#extensions-webrtc-apm-processingconfig)                   | Holds multiple `StreamConfig` instances for input, output, and reverse streams for the APM.                                                       |
| **Components Namespace**                                                        |                                                                                                                                                   |
| [`NoiseSuppressor`](#extensions-webrtc-apm-components-noisesuppressor)          | A component for offline/batch noise suppression using WebRTC APM, processing audio from an `ISoundDataProvider`.                                  |
| **Modifiers Namespace**                                                         |                                                                                                                                                   |
| [`WebRtcApmModifier`](#extensions-webrtc-apm-modifiers-webrtcapmmodifier)       | A `SoundModifier` that applies WebRTC APM features (AEC, NS, AGC, etc.) in real-time to an audio stream within the SoundFlow graph. Configurable. |

### Interfaces

| Interface                                           | Description                                                                                                                                  |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`ISoundDataProvider`](#interfaces-isounddataprovider) | Defines a standard way to access audio data from various sources. Implements `IDisposable`.                                                |
| [`ISoundDecoder`](#interfaces-isounddecoder)         | Defines the contract for decoding audio data from a specific format into raw audio samples.                                                 |
| [`ISoundEncoder`](#interfaces-isoundencoder)         | Defines the contract for encoding raw audio samples into a specific format.                                                                 |
| [`ISoundPlayer`](#interfaces-isoundplayer)           | Defines the contract for controlling audio playback (Play, Pause, Stop, Seek, Looping, Speed, Volume).                                       |
| [`IVisualizationContext`](#interfaces-ivisualizationcontext) | Provides drawing methods for rendering audio visualizations. The implementation depends on the specific UI framework used.               |
| [`IVisualizer`](#interfaces-ivisualizer)             | Defines the contract for components that visualize audio data.                                                                            |

### Modifiers

| Class                                                               | Description                                                                                                                                                                                           |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`AlgorithmicReverbModifier`](#modifiers-algorithmicreverbmodifier) | Simulates reverberation using a network of comb and all-pass filters.                                                                                                                                 |
| [`AmbientReverbModifier`](#modifiers-ambientreverbmodifier)         | Creates a sense of spaciousness by simulating ambient reflections.                                                                                                                                    |
| [`BassBoostModifier`](#modifiers-bassboostmodifier)                 | Enhances low-frequency content using a low-pass filter.                                                                                                                                               |
| [`ChorusModifier`](#modifiers-chorusmodifier)                       | Creates a chorus effect by mixing delayed and modulated copies of the signal.                                                                                                                         |
| [`CompressorModifier`](#modifiers-compressormodifier)               | Reduces the dynamic range of the audio signal using a compressor algorithm.                                                                                                                           |
| [`DelayModifier`](#modifiers-delaymodifier)                         | Applies a delay effect with feedback and optional low-pass filtering of the delayed signal.                                                                                                           |
| [`FrequencyBandModifier`](#modifiers-frequencybandmodifier)         | Allows boosting or cutting specific frequency bands using a combination of low-pass and high-pass filters.                                                                                            |
| [`NoiseReductionModifier`](#modifiers-noisereductionmodifier)       | Reduces noise in an audio stream using spectral subtraction.                                                                                                                                          |
| [`ParametricEqualizer`](#modifiers-parametricequalizer)             | Provides precise control over the frequency spectrum with multiple configurable bands, each of which can be set as a peaking, low-shelf, high-shelf, band-pass, notch, low-pass, or high-pass filter. |
| [`StereoChorusModifier`](#modifiers-stereochorusmodifier)           | Creates a stereo chorus effect with independent processing for the left and right channels.                                                                                                           |
| [`TrebleBoostModifier`](#modifiers-trebleboostmodifier)             | Enhances high-frequency content using a high-pass filter.                                                                                                                                             |
| [`WebRtcApmModifier`](#extensions-webrtc-apm-modifiers-webrtcapmmodifier) (from `SoundFlow.Extensions.WebRtc.Apm.Modifiers`) | Applies WebRTC APM features like echo cancellation, noise suppression, and AGC in real-time. |

### Providers

| Class                                                         | Description                                                                                                                                  |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`AssetDataProvider`](#providers-assetdataprovider)           | `ISoundDataProvider` implementation that reads audio data from a byte array (useful for in-memory assets). Implements `IDisposable`.            |
| [`StreamDataProvider`](#providers-streamdataprovider)         | `ISoundDataProvider` implementation that reads audio data from a generic `Stream` (supports seeking if the stream is seekable). Implements `IDisposable`. |
| [`MicrophoneDataProvider`](#providers-microphonedataprovider) | `ISoundDataProvider` implementation that captures and provides audio data from the microphone in real-time. Implements `IDisposable`.            |
| [`ChunkedDataProvider`](#providers-chunkeddataprovider)       | `ISoundDataProvider` implementation that reads and decodes audio data from a file or stream in chunks, improving efficiency for large files. Implements `IDisposable`. |
| [`NetworkDataProvider`](#providers-networkdataprovider)       | `ISoundDataProvider` implementation that provides audio data from a network source (direct URL or HLS playlist). Implements `IDisposable`.   |
| [`RawDataProvider`](#providers-rawdataprovider)               | `ISoundDataProvider` implementation for reading raw PCM audio data from a stream. Implements `IDisposable`.                                   |

### Structs

| Struct                                       | Description                                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [`DeviceInfo`](#structs-deviceinfo)          | Represents information about an audio device, including ID, name, and supported formats.         |
| [`NativeDataFormat`](#structs-nativedataformat) | Represents a native data format supported by an audio device (format, channels, sample rate). |

### Utils

| Class                                       | Description                                                                                                                                                                                                 |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Extensions`](#utils-extensions)           | Provides extension methods for working with audio data and other utility functions, including `ReadArray<T>` for reading structures from native memory.                                                                                                                             |
| [`MathHelper`](#utils-mathhelper)           | Provides mathematical functions and algorithms used in audio processing, including optimized FFT, window functions, `Mod`, and `PrincipalAngle`. |

### Visualization

| Class/Interface                                         | Description                                                                                                                                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`LevelMeterAnalyzer`](#visualization-levelmeteranalyzer) | `AudioAnalyzer` that calculates the RMS (root mean square) and peak levels of an audio signal.                                                                                                  |
| [`LevelMeterVisualizer`](#visualization-levelmetervisualizer) | `IVisualizer` that displays a level meter showing the current RMS or peak level of the audio.                                                                                                 |
| [`SpectrumAnalyzer`](#visualization-spectrumanalyzer)    | `AudioAnalyzer` that computes the frequency spectrum of the audio using the Fast Fourier Transform (FFT).                                                                                         |
| [`SpectrumVisualizer`](#visualization-spectrumvisualizer)  | `IVisualizer` that renders a bar graph representing the frequency spectrum of the audio.                                                                                                        |
| [`WaveformVisualizer`](#visualization-waveformvisualizer)  | `IVisualizer` that draws the waveform of the audio signal.                                                                                                                                     |

## Detailed Class and Interface Documentation

This section provides more in-depth information about some of the key classes and interfaces.

### Abstracts `AudioAnalyzer`

```csharp
public abstract class AudioAnalyzer : SoundComponent
{
    protected AudioAnalyzer(IVisualizer? visualizer = null);

    public override string Name { get; set; }

    protected abstract void Analyze(Span<float> buffer);
    protected override void GenerateAudio(Span<float> buffer);
}
```

**Properties:**

*   `Name`: The name of the analyzer.

**Methods:**

*   `Analyze(Span<float> buffer)`: Abstract method to be implemented by derived classes to perform audio analysis on the provided buffer.
*   `GenerateAudio(Span<float> buffer)`: Overrides `SoundComponent`'s `GenerateAudio`, internally calls `Analyze` and then processes the visualizer if one is attached.

### Abstracts `AudioEngine`

```csharp
public abstract class AudioEngine : IDisposable
{
    protected AudioEngine(int sampleRate, Capability capability, SampleFormat sampleFormat, int channels);

    public static int Channels { get; protected set; }
    public Capability Capability { get; }
    public static AudioEngine Instance { get; }
    public bool IsDisposed { get; protected set; }
    public float InverseSampleRate { get; }
    public SampleFormat SampleFormat { get; }
    public int SampleRate { get; }
    public DeviceInfo? CurrentPlaybackDevice { get; protected set; }
    public DeviceInfo? CurrentCaptureDevice { get; protected set; }
    public int CaptureDeviceCount { get; protected set; }
    public int PlaybackDeviceCount { get; protected set; }
    public DeviceInfo[] PlaybackDevices { get; protected set; }
    public DeviceInfo[] CaptureDevices { get; protected set; }

    public static event AudioProcessCallback? OnAudioProcessed;

    ~AudioEngine();

    protected abstract void CleanupAudioDevice();
    public abstract ISoundDecoder CreateDecoder(Stream stream);
    public abstract ISoundEncoder CreateEncoder(string filePath, EncodingFormat encodingFormat, SampleFormat sampleFormat, int encodingChannels, int sampleRate);
    protected virtual void Dispose(bool disposing);
    protected abstract void InitializeAudioDevice();
    protected abstract void ProcessAudioData();
    protected void ProcessAudioInput(nint input, int length);
    protected void ProcessGraph(nint output, int length);
    public void SoloComponent(SoundComponent component);
    public void UnsoloComponent(SoundComponent component);
    public abstract void SwitchDevice(DeviceInfo deviceInfo, DeviceType type = DeviceType.Playback);
    public abstract void SwitchDevices(DeviceInfo? playbackDeviceInfo, DeviceInfo? captureDeviceInfo);
    public abstract void UpdateDevicesInfo();
    public void Dispose();
}
```

**Properties:**

*   `Channels`: The number of audio channels.
*   `Capability`: The audio engine's capabilities (Playback, Recording, Mixed, Loopback).
*   `Instance`: Gets the singleton instance of the `AudioEngine`.
*   `IsDisposed`: Indicates whether the engine has been disposed.
*   `InverseSampleRate`: The inverse of the sample rate (1 / `SampleRate`).
*   `SampleFormat`: The audio sample format.
*   `SampleRate`: The audio sample rate.
*   `CurrentPlaybackDevice`: Gets the currently selected playback device.
*   `CurrentCaptureDevice`: Gets the currently selected capture device.
*   `CaptureDeviceCount`: Gets the number of available capture devices.
*   `PlaybackDeviceCount`: Gets the number of available playback devices.
*   `PlaybackDevices`: Gets an array of available playback devices.
*   `CaptureDevices`: Gets an array of available capture devices.


**Events:**

*   `OnAudioProcessed`: Event that is raised after each audio processing cycle.

**Methods:**

*   `CleanupAudioDevice()`: Abstract method to be implemented by derived classes to clean up audio device resources.
*   `CreateDecoder(Stream stream)`: Creates an `ISoundDecoder` for the specific backend.
*   `CreateEncoder(string filePath, EncodingFormat encodingFormat, SampleFormat sampleFormat, int encodingChannels, int sampleRate)`: Creates an `ISoundEncoder` for the specific backend.
*   `Dispose(bool disposing)`: Releases resources used by the engine.
*   `InitializeAudioDevice()`: Abstract method to be implemented by derived classes to initialize the audio device.
*   `ProcessAudioData()`: Abstract method to be implemented by derived classes to perform the main audio processing loop.
*   `ProcessAudioInput(nint input, int length)`: Processes the audio input buffer.
*   `ProcessGraph(nint output, int length)`: Processes the audio graph and outputs to the specified buffer.
*   `SoloComponent(SoundComponent component)`: Solos a component in the audio graph.
*   `UnsoloComponent(SoundComponent component)`: Unsolos a component in the audio graph.
*   `SwitchDevice(DeviceInfo deviceInfo, DeviceType type = DeviceType.Playback)`: Switches the audio engine to use the specified device.
*   `SwitchDevices(DeviceInfo? playbackDeviceInfo, DeviceInfo? captureDeviceInfo)`: Switches playback and/or capture devices.
*   `UpdateDevicesInfo()`: Retrieves and updates the list of available audio devices.
*   `Dispose()`: Public method to dispose of the engine and its resources.

### Abstracts `SoundComponent`

```csharp
public abstract class SoundComponent
{
    protected SoundComponent();

    public virtual float Pan { get; set; } // Range 0.0 (Left) to 1.0 (Right), 0.5 is Center
    public virtual string Name { get; set; }
    public Mixer? Parent { get; set; }
    public virtual bool Solo { get; set; }
    public virtual float Volume { get; set; }
    public virtual bool Enabled { get; set; }
    public virtual bool Mute { get; set; }

    public IReadOnlyList<SoundComponent> Inputs { get; }
    public IReadOnlyList<SoundModifier> Modifiers { get; }
    public IReadOnlyList<AudioAnalyzer> Analyzers { get; }

    public void AddModifier(SoundModifier modifier);
    public void ConnectInput(SoundComponent input);
    public void AddAnalyzer(AudioAnalyzer analyzer);
    public void DisconnectInput(SoundComponent input);
    public void RemoveAnalyzer(AudioAnalyzer analyzer);
    protected abstract void GenerateAudio(Span<float> buffer);
    internal void Process(Span<float> outputBuffer);
    public void RemoveModifier(SoundModifier modifier);
}
```

**Properties:**

* `Pan`: The panning of the component's output (0.0 for full left, 0.5 for center, 1.0 for full right, using equal-power panning).
* `Name`: The name of the component.
* `Parent`: The parent mixer of this component.
* `Solo`: Whether the component is soloed.
* `Volume`: The volume of the component's output.
* `Enabled`: Whether the component is enabled.
* `Mute`: Whether the component is muted.
* `Inputs`: Read-only list of connected input components.
* `Modifiers`: Read-only list of applied modifiers.
* `Analyzers`: Read-only list of attached audio analyzers.

**Methods:**

* `AddModifier(SoundModifier modifier)`: Adds a sound modifier to the component.
* `RemoveModifier(SoundModifier modifier)`: Removes a sound modifier from the component.
* `ConnectInput(SoundComponent input)`: Connects another component's output to this component's input.
* `DisconnectInput(SoundComponent input)`: Disconnects an input from this component.
* `AddAnalyzer(AudioAnalyzer analyzer)`: Adds an audio analyzer to the component.
* `RemoveAnalyzer(AudioAnalyzer analyzer)`: Removes an audio analyzer from the component.
* `GenerateAudio(Span<float> buffer)`: Abstract method that derived classes must implement to generate or modify audio data.
* `Process(Span<float> outputBuffer)`: Processes the component's audio, including applying modifiers and handling input/output connections.

### Abstracts `SoundModifier`

```csharp
public abstract class SoundModifier
{
    public SoundModifier();

    public virtual string Name { get; set; }
    public bool Enabled { get; set; } = true;

    public abstract float ProcessSample(float sample, int channel);
    public virtual void Process(Span<float> buffer);
}
```

**Properties:**

*   `Name`: The name of the modifier.
*   `Enabled`: Gets or sets whether the modifier is active and should process audio. Defaults to true.

**Methods:**

*   `ProcessSample(float sample, int channel)`: Abstract method to be implemented by derived classes to process a single audio sample.
*   `Process(Span<float> buffer)`: Processes a buffer of audio data. Applies `ProcessSample` to each sample if not overridden.

### Abstracts `SoundPlayerBase`

```csharp
public abstract class SoundPlayerBase : SoundComponent, ISoundPlayer
{
    protected SoundPlayerBase(ISoundDataProvider dataProvider);

    public float PlaybackSpeed { get; set; }
    public PlaybackState State { get; private set; }
    public bool IsLooping { get; set; }
    public float Time { get; }
    public float SourceTimeSeconds { get; } // Time in normal playback speed (1.0)
    public float Duration { get; }
    public int LoopStartSamples { get; }
    public int LoopEndSamples { get; }
    public float LoopStartSeconds { get; }
    public float LoopEndSeconds { get; }
    // Volume is inherited from SoundComponent

    public event EventHandler<EventArgs>? PlaybackEnded;

    protected override void GenerateAudio(Span<float> output);
    protected virtual void HandleEndOfStream(Span<float> remainingOutputBuffer);
    protected virtual void OnPlaybackEnded();

    public void Play();
    public void Pause();
    public void Stop();
    public bool Seek(TimeSpan time, SeekOrigin seekOrigin = SeekOrigin.Begin);
    public bool Seek(float time);
    public bool Seek(int sampleOffset);
    public void SetLoopPoints(float startTime, float? endTime = -1f);
    public void SetLoopPoints(int startSample, int endSample = -1);
    public void SetLoopPoints(TimeSpan startTime, TimeSpan? endTime = null);
}
```

**Properties:**

*   `PlaybackSpeed`: Gets or sets the playback speed (1.0 is normal).
*   `State`: Gets the current playback state (`Stopped`, `Playing`, `Paused`).
*   `IsLooping`: Gets or sets whether looping is enabled.
*   `Time`: Gets the current playback position in seconds, affected by `PlaybackSpeed`.
*   `SourceTimeSeconds`: Gets the current playback position in seconds as if `PlaybackSpeed` were 1.0.
*   `Duration`: Gets the total duration of the audio in seconds.
*   `LoopStartSamples`: Gets the loop start point in samples.
*   `LoopEndSamples`: Gets the loop end point in samples (-1 for end of audio).
*   `LoopStartSeconds`: Gets the loop start point in seconds.
*   `LoopEndSeconds`: Gets the loop end point in seconds (-1 for end of audio).
*   `Volume`: (Inherited from `SoundComponent`) Gets or sets the volume of the player.

**Events:**

*   `PlaybackEnded`: Occurs when playback reaches the end of the audio (not raised during looping).

**Methods:**

*   `GenerateAudio(Span<float> output)`: (Protected Override) Core audio generation logic, handles reading from data provider, resampling for playback speed, and looping.
*   `HandleEndOfStream(Span<float> remainingOutputBuffer)`: (Protected Virtual) Handles logic when the data provider reaches its end (looping or stopping).
*   `OnPlaybackEnded()`: (Protected Virtual) Invokes the `PlaybackEnded` event.
*   `Play()`: Starts or resumes playback.
*   `Pause()`: Pauses playback.
*   `Stop()`: Stops playback and resets the position to the beginning.
*   `Seek(TimeSpan time, SeekOrigin seekOrigin = SeekOrigin.Begin)`: Seeks to a specific time using `TimeSpan`. Returns `true` if successful.
*   `Seek(float time)`: Seeks to a specific time in seconds. Returns `true` if successful.
*   `Seek(int sampleOffset)`: Seeks to a specific sample offset. Returns `true` if successful.
*   `SetLoopPoints(float startTime, float? endTime = -1f)`: Configures loop points using start/end times in seconds.
*   `SetLoopPoints(int startSample, int endSample = -1)`: Configures loop points using start/end sample indices.
*   `SetLoopPoints(TimeSpan startTime, TimeSpan? endTime = null)`: Configures loop points using `TimeSpan`.

### Backends.MiniAudio `MiniAudioDecoder`

```csharp
internal sealed unsafe class MiniAudioDecoder : ISoundDecoder
{
    internal MiniAudioDecoder(Stream stream);

    public bool IsDisposed { get; private set; }
    public int Length { get; private set; } // Length can be updated after initial check
    public SampleFormat SampleFormat { get; }

    public event EventHandler<EventArgs>? EndOfStreamReached;

    public int Decode(Span<float> samples);
    public void Dispose();
    public bool Seek(int offset);
}
```

**Properties:**

* `IsDisposed`: Indicates whether the decoder has been disposed.
* `Length`: The total length of the decoded audio data in samples. *Note: Can be updated after initial checks if the stream length was not immediately available.*
* `SampleFormat`: The sample format of the decoded audio data.

**Events:**

* `EndOfStreamReached`: Occurs when the end of the audio stream is reached during decoding.

**Methods:**

* `Decode(Span<float> samples)`: Decodes a portion of the audio stream into the provided buffer. Internally synchronized.
* `Dispose()`: Releases the resources used by the decoder.
* `Seek(int offset)`: Seeks to the specified offset within the audio stream (in samples). Internally synchronized.

### Backends.MiniAudio `MiniAudioEncoder`

```csharp
internal sealed unsafe class MiniAudioEncoder : ISoundEncoder
{
    public MiniAudioEncoder(string filePath, EncodingFormat encodingFormat, SampleFormat sampleFormat, int channels, int sampleRate);

    public string FilePath { get; }
    public bool IsDisposed { get; private set; }

    public void Dispose();
    public int Encode(Span<float> samples);
}
```

**Properties:**

*   `FilePath`: The path to the output file.
*   `IsDisposed`: Indicates whether the encoder has been disposed.

**Methods:**

*   `Dispose()`: Releases the resources used by the encoder.
*   `Encode(Span<float> samples)`: Encodes the provided audio samples and writes them to the output file or stream.

### Backends.MiniAudio `MiniAudioEngine`

```csharp
public sealed class MiniAudioEngine : AudioEngine
{
    public MiniAudioEngine(int sampleRate, Capability capability, SampleFormat sampleFormat = SampleFormat.F32, int channels = 2);

    protected override void CleanupAudioDevice();
    public override ISoundDecoder CreateDecoder(Stream stream);
    public override ISoundEncoder CreateEncoder(string filePath, EncodingFormat encodingFormat, SampleFormat sampleFormat, int encodingChannels, int sampleRate); // Now public
    protected override void InitializeAudioDevice();
    protected override void ProcessAudioData();
    public override void SwitchDevice(DeviceInfo deviceInfo, DeviceType type = DeviceType.Playback);
    public override void SwitchDevices(DeviceInfo? playbackDeviceInfo, DeviceInfo? captureDeviceInfo);
    public override void UpdateDevicesInfo();
}
```

**Methods:**

*   `CleanupAudioDevice()`: Cleans up the audio device resources.
*   `CreateDecoder(Stream stream)`: Creates a `MiniAudioDecoder` instance.
*   `CreateEncoder(string filePath, EncodingFormat encodingFormat, SampleFormat sampleFormat, int encodingChannels, int sampleRate)`: Creates a `MiniAudioEncoder` instance.
*   `InitializeAudioDevice()`: Initializes the audio device using `miniaudio`, including context initialization.
*   `ProcessAudioData()`: Implements the main audio processing loop using `miniaudio` (typically via callbacks).
*   `SwitchDevice(DeviceInfo deviceInfo, DeviceType type = DeviceType.Playback)`: Switches the playback or capture device.
*   `SwitchDevices(DeviceInfo? playbackDeviceInfo, DeviceInfo? captureDeviceInfo)`: Switches both playback and capture devices if specified.
*   `UpdateDevicesInfo()`: Retrieves and updates the list of available playback and capture devices from MiniAudio.

### Components `EnvelopeGenerator`

```csharp
public class EnvelopeGenerator : SoundComponent
{
    public EnvelopeGenerator();

    public float AttackTime { get; set; }
    public float DecayTime { get; set; }
    public override string Name { get; set; }
    public float ReleaseTime { get; set; }
    public bool Retrigger { get; set; }
    public float SustainLevel { get; set; }
    public TriggerMode Trigger { get; set; }

    public event Action<float>? LevelChanged;

    protected override void GenerateAudio(Span<float> buffer);
    public void TriggerOff();
    public void TriggerOn();
}
```

**Properties:**

*   `AttackTime`: The attack time of the envelope (in seconds).
*   `DecayTime`: The decay time of the envelope (in seconds).
*   `Name`: The name of the envelope generator.
*   `ReleaseTime`: The release time of the envelope (in seconds).
*   `Retrigger`: Whether to retrigger the envelope on each new trigger.
*   `SustainLevel`: The sustain level of the envelope.
*   `Trigger`: The trigger mode (`NoteOn`, `Gate`, `Trigger`).

**Events:**

*   `LevelChanged`: Occurs when the envelope level changes.

**Methods:**

*   `GenerateAudio(Span<float> buffer)`: Generates the envelope signal.
*   `TriggerOff()`: Triggers the release stage of the envelope (if in `Gate` mode).
*   `TriggerOn()`: Triggers the attack stage of the envelope.

### Components `Filter`

```csharp
public class Filter : SoundComponent
{
    public Filter();

    public float CutoffFrequency { get; set; }
    public override string Name { get; set; }
    public float Resonance { get; set; }
    public FilterType Type { get; set; }

    protected override void GenerateAudio(Span<float> buffer);
}
```

**Properties:**

*   `CutoffFrequency`: The cutoff frequency of the filter.
*   `Name`: The name of the filter.
*   `Resonance`: The resonance of the filter.
*   `Type`: The filter type (`LowPass`, `HighPass`, `BandPass`, `Notch`).

**Methods:**

*   `GenerateAudio(Span<float> buffer)`: Applies the filter to the audio buffer.

### Components `LowFrequencyOscillator`

```csharp
public class LowFrequencyOscillator : SoundComponent
{
    public LowFrequencyOscillator();

    public float Depth { get; set; }
    public TriggerMode Mode { get; set; }
    public override string Name { get; set; }
    public float Phase { get; set; }
    public float Rate { get; set; }
    public WaveformType Type { get; set; }

    protected override void GenerateAudio(Span<float> buffer);
    public float GetLastOutput();
    public void Trigger();
}
```

**Properties:**

*   `Depth`: The depth of the LFO's modulation.
*   `Mode`: The trigger mode (`FreeRunning`, `NoteTrigger`).
*   `Name`: The name of the LFO.
*   `Phase`: The initial phase of the LFO.
*   `Rate`: The rate (frequency) of the LFO.
*   `Type`: The waveform type (`Sine`, `Square`, `Triangle`, `Sawtooth`, `ReverseSawtooth`, `Random`, `SampleAndHold`).

**Methods:**

*   `GenerateAudio(Span<float> buffer)`: Generates the LFO signal.
*   `GetLastOutput()`: Returns the last generated output sample.
*   `Trigger()`: Triggers the LFO (if in `NoteTrigger` mode).

### Components `Mixer`

```csharp
public sealed class Mixer : SoundComponent
{
    public Mixer();

    public static Mixer Master { get; }
    public override string Name { get; set; }

    public void AddComponent(SoundComponent component);
    protected override void GenerateAudio(Span<float> buffer);
    public void RemoveComponent(SoundComponent component);
}
```

**Properties:**

*   `Master`: The static instance of the master mixer.
*   `Name`: The name of the mixer.

**Methods:**

*   `AddComponent(SoundComponent component)`: Adds a component to the mixer.
*   `GenerateAudio(Span<float> buffer)`: Mixes the audio from all connected components.
*   `RemoveComponent(SoundComponent component)`: Removes a component from the mixer.

### Components `Oscillator`

```csharp
public class Oscillator : SoundComponent
{
    public Oscillator();

    public float Amplitude { get; set; }
    public float Frequency { get; set; }
    public override string Name { get; set; }
    public float Phase { get; set; }
    public float PulseWidth { get; set; }
    public WaveformType Type { get; set; }

    protected override void GenerateAudio(Span<float> buffer);
}
```

**Properties:**

*   `Amplitude`: The amplitude of the oscillator.
*   `Frequency`: The frequency of the oscillator.
*   `Name`: The name of the oscillator.
*   `Phase`: The initial phase of the oscillator.
*   `PulseWidth`: The pulse width (for pulse waveforms).
*   `Type`: The waveform type (`Sine`, `Square`, `Sawtooth`, `Triangle`, `Noise`, `Pulse`).

**Methods:**

*   `GenerateAudio(Span<float> buffer)`: Generates the oscillator's output.

### Components `Recorder`

```csharp
public class Recorder : IDisposable
{
    public Recorder(string filePath, SampleFormat sampleFormat = SampleFormat.F32, EncodingFormat encodingFormat = EncodingFormat.Wav, int sampleRate = 44100, int channels = 2, VoiceActivityDetector? vad = null);
    public Recorder(AudioProcessCallback callback, SampleFormat sampleFormat = SampleFormat.F32, EncodingFormat encodingFormat = EncodingFormat.Wav, int sampleRate = 44100, int channels = 2, VoiceActivityDetector? vad = null);

    public ReadOnlyCollection<AudioAnalyzer> Analyzers { get; }
    public int Channels { get; }
    public EncodingFormat EncodingFormat { get; }
    public string FilePath { get; }
    public ReadOnlyCollection<SoundModifier> Modifiers { get; }
    public AudioProcessCallback? ProcessCallback { get; set; }
    public int SampleRate { get; }
    public PlaybackState State { get; }
    public SampleFormat SampleFormat {get;}

    public void AddAnalyzer(AudioAnalyzer analyzer);
    public void AddModifier(SoundModifier modifier);
    public void Dispose();
    public void PauseRecording();
    public void RemoveAnalyzer(AudioAnalyzer analyzer);
    public void RemoveModifier(SoundModifier modifier);
    public void ResumeRecording();
    public void StartRecording();
    public void StopRecording();
}
```

**Properties:**

*   `Analyzers`: Gets a read-only collection of <see cref="AudioAnalyzer"/> components applied to the recorder. Analyzers are used to process and extract data from the audio stream during recording.
*   `Channels`: The number of channels to record.
*   `EncodingFormat`: The encoding format for the recorded audio.
*   `FilePath`: The path to the output file (if recording to a file).
*   `Modifiers`: Gets a read-only collection of <see cref="SoundModifier"/> components applied to the recorder. Modifiers are applied to the audio data before encoding or processing via callback, allowing for real-time audio effects during recording.
*   `ProcessCallback`: A callback for processing recorded audio in real time.
*   `SampleRate`: The sample rate for recording.
*   `State`: The current recording state (`Stopped`, `Playing`, `Paused`).
*   `SampleFormat`: The sample format for recording.

**Methods:**

*   `AddAnalyzer(AudioAnalyzer analyzer)`: Adds an <see cref="AudioAnalyzer"/> to the recording pipeline. Analyzers process audio data during recording, enabling real-time analysis.
*   `AddModifier(SoundModifier modifier)`: Adds a <see cref="SoundModifier"/> to the recording pipeline. Modifiers apply effects to the audio data in real-time as it's being recorded.
*   `Dispose()`: Releases resources used by the recorder.
*   `PauseRecording()`: Pauses the recording.
*   `RemoveAnalyzer(AudioAnalyzer analyzer)`: Removes a specific <see cref="AudioAnalyzer"/> from the recording pipeline.
*   `RemoveModifier(SoundModifier modifier)`: Removes a specific <see cref="SoundModifier"/> from the recording pipeline.
*   `ResumeRecording()`: Resumes a paused recording.
*   `StartRecording()`: Starts the recording.
*   `StopRecording()`: Stops the recording.
### Components `SoundPlayer`

```csharp
public sealed class SoundPlayer : SoundPlayerBase
{
    public SoundPlayer(ISoundDataProvider dataProvider);
    public override string Name { get; set; } // Overrides SoundPlayerBase's default
}
```
Inherits all playback functionality, properties, and events from `SoundPlayerBase`.

**Properties:**
* `Name`: The name of the sound player component (default: "Sound Player").

### Components `SurroundPlayer`

```csharp
public sealed class SurroundPlayer : SoundPlayerBase
{
    public SurroundPlayer(ISoundDataProvider dataProvider);

    public override string Name { get; set; } // Overrides SoundPlayerBase's default
    public Vector2 ListenerPosition { get; set; }
    public PanningMethod Panning { get; set; }
    public VbapParameters VbapParameters { get; set; }
    public SurroundConfiguration SurroundConfig { get; set; }
    public SpeakerConfiguration SpeakerConfig { get; set; }

    protected override void GenerateAudio(Span<float> output);
    public void SetSpeakerConfiguration(SpeakerConfiguration config);
    // Inherits Play, Pause, Stop, Seek, IsLooping, etc. from SoundPlayerBase
}
```
Inherits base playback functionality from `SoundPlayerBase` and adds surround-specific features.

**Properties:**
*   `Name`: The name of the surround player component (default: "Surround Player").
*   `ListenerPosition`: The position of the listener in the surround sound field (Vector2).
*   `Panning`: Gets or sets the panning method to use for surround sound (`Linear`, `EqualPower`, `VBAP`).
*   `SpeakerConfig`: Gets or sets the speaker configuration (`Stereo`, `Quad`, `Surround51`, `Surround71`, `Custom`).
*   `VbapParameters`: Gets or sets parameters for Vector Base Amplitude Panning (VBAP).
*   `SurroundConfig`: Gets or sets the custom surround configuration when `SpeakerConfig` is set to `Custom`.

**Methods:**
*   `GenerateAudio(Span<float> output)`: (Overrides `SoundPlayerBase`) Reads audio data, applies resampling, then applies surround processing and looping if enabled.
*   `SetSpeakerConfiguration(SpeakerConfiguration config)`: Sets the speaker configuration for surround sound playback.
*   `Seek(int sampleOffset)`: (Overrides `SoundPlayerBase`) Seeks and re-initializes delay lines for surround processing.


### Components `VoiceActivityDetector`

```csharp
public class VoiceActivityDetector : AudioAnalyzer
{
    public VoiceActivityDetector(int fftSize = 1024, float threshold = 0.01f, IVisualizer? visualizer = null);

    public bool IsVoiceActive { get; }
    public int SpeechHighBand { get; set; }
    public int SpeechLowBand { get; set; }
    public double Threshold { get; set; }

    public override string Name { get; set; }

    public event Action<bool>? SpeechDetected;

    protected override void Analyze(Span<float> buffer);
}
```

**Properties:**

*   `IsVoiceActive`: Indicates whether voice activity is currently detected. This is a read-only property that reflects the detector's current state.
*   `Name`: Gets or sets the name of the voice activity detector component, useful for identification and debugging.
*   `SpeechHighBand`: Gets or sets the upper bound of the frequency range (in Hz) that the detector uses to analyze for speech. Frequencies above this band are ignored in the voice activity detection process. Default is 3400 Hz.
*   `SpeechLowBand`: Gets or sets the lower bound of the frequency range (in Hz) that the detector focuses on for speech detection. Frequencies below this band are not considered for voice activity. Default is 300 Hz.
*   `Threshold`: Gets or sets the detection sensitivity threshold. This value determines how sensitive the detector is to voice activity. A lower threshold value increases sensitivity, making the detector more likely to identify quieter sounds as voice activity. Default is 0.01.

**Events:**

*   `SpeechDetected`: An event that is raised whenever the voice activity state changes (i.e., when speech is detected or ceases to be detected). Listeners can subscribe to this event to respond in real-time to changes in voice activity.

**Methods:**

*   `VoiceActivityDetector(int fftSize = 1024, float threshold = 0.01f, IVisualizer? visualizer = null)`: Constructor for the VoiceActivityDetector class. Initializes a new instance of the voice activity detector with configurable FFT size, detection threshold and optional visualizer for audio analysis visualization.
    *   `fftSize`: `int` – The size of the FFT (Fast Fourier Transform) window used for spectral analysis. Must be a power of two. Larger FFT sizes provide finer frequency resolution but may increase processing latency. Default is 1024.
    *   `threshold`: `float` – The sensitivity threshold for voice detection. A lower value increases sensitivity. Default is 0.01.
    *   `visualizer`: `IVisualizer?` – An optional visualizer instance that can be attached to the analyzer for visualizing audio processing data, useful for debugging and tuning. Default is `null`.
*   `Analyze(Span<float> buffer)`: перевіряє audio buffer та оновлює `IsVoiceActive` property на основі алгоритму детекції.
    *   `buffer`: `Span<float>` – The audio buffer to analyze for voice activity. The audio data in this buffer is processed to determine if voice is present.
*   `GenerateAudio(Span<float> buffer)`: This method is inherited from `AudioAnalyzer` but not directly used in `VoiceActivityDetector`. Voice Activity Detector works by analyzing the input audio buffer provided to the `Analyze` method and does not generate audio; use `Process` method instead.

**Remarks:**

*   **Frequency Range:** The `SpeechLowBand` and `SpeechHighBand` properties allow you to customize the frequency range that the VAD focuses on for speech detection. Speech typically falls within the 300Hz to 3400Hz range, but you may need to adjust these values depending on the characteristics of your audio and the type of speech you are detecting.
*   **Threshold Sensitivity:** The `Threshold` property is crucial for controlling the sensitivity of the voice activity detection. Adjusting this threshold may be necessary to achieve optimal performance in different environments and with varying audio input levels.
*   **FFT Size:** The `fftSize` parameter in the constructor determines the FFT window size. A larger FFT size provides better frequency resolution, which can be beneficial in noisy environments or when detecting subtle voice activity. However, it also increases the computational cost and latency. Ensure that the FFT size is always a power of 2 for optimal performance and compatibility with FFT algorithms.
*   **Performance Tuning:** For optimal performance, especially in real-time applications, carefully tune the `fftSize` and `Threshold` parameters. Larger FFT sizes are more computationally intensive but offer better frequency resolution. Adjust the `Threshold` based on the ambient noise level and the desired sensitivity of voice detection.
*   **Environment Considerations:** The ideal settings for `fftSize`, `Threshold`, `SpeechLowBand`, and `SpeechHighBand` may vary depending on the environment in which the voice activity detector is used. In noisy environments, you might need to increase the `fftSize` and adjust the `Threshold` to minimize false positives.
*   **Visualizer for Debugging:** The optional `visualizer` parameter in the constructor is highly useful for debugging and tuning the voice activity detector. By attaching a visualizer, you can visually inspect the audio data and the detector's response, which can help in understanding and adjusting the detector's parameters for optimal performance in your specific use case.

### Enums `Capability`

```csharp
[Flags]
public enum Capability
{
    Playback = 1,
    Record = 2,
    Mixed = Playback | Record,
    Loopback = 4
}
```

**Values:**

*   `Playback`: Indicates playback capability.
*   `Record`: Indicates recording capability.
*   `Mixed`: Indicates both playback and recording capability.
*   `Loopback`: Indicates loopback capability (recording system audio output).

### Enums `DeviceType`

```csharp
public enum DeviceType
{
    Playback,
    Capture
}
```
**Values:**
*   `Playback`: Device used for audio playback.
*   `Capture`: Device used for audio capture.

### Enums `EncodingFormat`

```csharp
public enum EncodingFormat
{
    Unknown = 0,
    Wav,
    Flac,
    Mp3,
    Vorbis
}
```

**Values:**

*   `Unknown`: Unknown encoding format.
*   `Wav`: Waveform Audio File Format (WAV).
*   `Flac`: Free Lossless Audio Codec (FLAC).
*   `Mp3`: MPEG-1 Audio Layer III (MP3).
*   `Vorbis`: Ogg Vorbis.

### Enums `PlaybackState`

```csharp
public enum PlaybackState
{
    Stopped,
    Playing,
    Paused
}
```

**Values:**

*   `Stopped`: Playback is stopped.
*   `Playing`: Playback is currently in progress.
*   `Paused`: Playback is paused.

### Enums `Result`

```csharp
public enum Result
{
    Success = 0,
    Error = -1,
    // ... (other error codes)
    CrcMismatch = -100,
    FormatNotSupported = -200,
    // ... (other backend-specific error codes)
    DeviceNotInitialized = -300,
    // ... (other device-related error codes)
    FailedToInitBackend = -400
    // ... (other backend initialization error codes)
}
```

**Values:**

*   `Success`: The operation was successful.
*   `Error`: A generic error occurred.
*   `CrcMismatch`: CRC checksum mismatch.
*   `FormatNotSupported`: The requested audio format is not supported.
*   `DeviceNotInitialized`: The audio device is not initialized.
*   `FailedToInitBackend`: Failed to initialize the audio backend.
*   **(Many other error codes representing various error conditions)**

### Enums `SampleFormat`

```csharp
public enum SampleFormat
{
    Default = 0,
    U8 = 1,
    S16 = 2,
    S24 = 3,
    S32 = 4,
    F32 = 5
}
```

**Values:**

*   `Default`: The default sample format (typically `F32`).
*   `U8`: Unsigned 8-bit integer.
*   `S16`: Signed 16-bit integer.
*   `S24`: Signed 24-bit integer packed in 3 bytes.
*   `S32`: Signed 32-bit integer.
*   `F32`: 32-bit floating-point.

### Enums `FilterType`

```csharp
public enum FilterType
{
    Peaking,
    LowShelf,
    HighShelf,
    BandPass,
    Notch,
    LowPass,
    HighPass
}
```

**Values:**

*   `Peaking`: Peaking filter.
*   `LowShelf`: Low-shelf filter.
*   `HighShelf`: High-shelf filter.
*   `BandPass`: Band-pass filter.
*   `Notch`: Notch filter.
*   `LowPass`: Low-pass filter.
*   `HighPass`: High-pass filter.

### Enums `EnvelopeGenerator.EnvelopeState`

```csharp
public enum EnvelopeState
{
    Idle,
    Attack,
    Decay,
    Sustain,
    Release
}
```

**Values:**

*   `Idle`: The envelope is inactive.
*   `Attack`: The attack stage of the envelope.
*   `Decay`: The decay stage of the envelope.
*   `Sustain`: The sustain stage of the envelope.
*   `Release`: The release stage of the envelope.

### Enums `EnvelopeGenerator.TriggerMode`

```csharp
public enum TriggerMode
{
    NoteOn,
    Gate,
    Trigger
}
```

**Values:**

* `NoteOn`: The envelope will go directly from attack to sustain, without a decay stage.
* `Gate`: The envelope will progress normally, and will only enter release stage when trigger is off.
* `Trigger`: The envelope will always progress to the end, including the release stage.

### Enums `LowFrequencyOscillator.WaveformType`

```csharp
public enum WaveformType
{
    Sine,
    Square,
    Triangle,
    Sawtooth,
    ReverseSawtooth,
    Random,
    SampleAndHold
}
```

**Values:**

*   `Sine`: Sine wave.
*   `Square`: Square wave.
*   `Triangle`: Triangle wave.
*   `Sawtooth`: Sawtooth wave.
*   `ReverseSawtooth`: Reverse sawtooth wave.
*   `Random`: Random values.
*   `SampleAndHold`: Sample and hold random values.

### Enums `LowFrequencyOscillator.TriggerMode`

```csharp
public enum TriggerMode
{
    FreeRunning,
    NoteTrigger
}
```

**Values:**

* `FreeRunning`: The LFO will run continuously without needing a trigger.
* `NoteTrigger`: The LFO will only start when triggered.

### Enums `Oscillator.WaveformType`

```csharp
public enum WaveformType
{
    Sine,
    Square,
    Sawtooth,
    Triangle,
    Noise,
    Pulse
}
```

**Values:**

*   `Sine`: Sine wave.
*   `Square`: Square wave.
*   `Sawtooth`: Sawtooth wave.
*   `Triangle`: Triangle wave.
*   `Noise`: White noise.
*   `Pulse`: Pulse wave.

### Enums `SurroundPlayer.SpeakerConfiguration`

```csharp
public enum SpeakerConfiguration
{
    Stereo,
    Quad,
    Surround51,
    Surround71,
    Custom
}
```

**Values:**

*   `Stereo`: Standard stereo configuration (2 speakers).
*   `Quad`: Quadraphonic configuration (4 speakers).
*   `Surround51`: 5.1 surround sound configuration (6 speakers).
*   `Surround71`: 7.1 surround sound configuration (8 speakers).
* *   `Custom`: A custom speaker configuration defined by the user.

### Enums `SurroundPlayer.PanningMethod`

```csharp
public enum PanningMethod
{
    Linear,
    EqualPower,
    Vbap
}
```

**Values:**

*   `Linear`: Linear panning.
*   `EqualPower`: Equal power panning.
*   `Vbap`: Vector Base Amplitude Panning (VBAP).

### Extensions.WebRtc.Apm (New Namespace)

#### `AudioProcessingModule` (Class)
```csharp
public class AudioProcessingModule : IDisposable
{
    public AudioProcessingModule();
    public ApmError ApplyConfig(ApmConfig config);
    public ApmError Initialize();
    public ApmError ProcessStream(float[][] src, StreamConfig inputConfig, StreamConfig outputConfig, float[][] dest);
    public ApmError ProcessReverseStream(float[][] src, StreamConfig inputConfig, StreamConfig outputConfig, float[][] dest);
    // ... other methods for setting delays, levels, runtime settings, getting info, AEC dump ...
    public static int GetFrameSize(int sampleRateHz);
    public void Dispose();
}
```
**Description:** Provides low-level access to the WebRTC Audio Processing Module. It's responsible for initializing the APM, applying configurations, and processing audio frames. Generally used internally by `WebRtcApmModifier` and `NoiseSuppressor`.

#### `ApmConfig` (Class)
```csharp
public class ApmConfig : IDisposable
{
    public ApmConfig();
    public void SetEchoCanceller(bool enabled, bool mobileMode);
    public void SetNoiseSuppression(bool enabled, NoiseSuppressionLevel level);
    public void SetGainController1(bool enabled, GainControlMode mode, int targetLevelDbfs, int compressionGainDb, bool enableLimiter);
    public void SetGainController2(bool enabled);
    public void SetHighPassFilter(bool enabled);
    public void SetPreAmplifier(bool enabled, float fixedGainFactor);
    public void SetPipeline(int maxInternalRate, bool multiChannelRender, bool multiChannelCapture, DownmixMethod downmixMethod);
    public void Dispose();
}
```
**Description:** Used to configure the features of the `AudioProcessingModule` such as echo cancellation, noise suppression, gain control, etc.

#### `StreamConfig` (Class)
```csharp
public class StreamConfig : IDisposable
{
    public StreamConfig(int sampleRateHz, int numChannels);
    public int SampleRateHz { get; }
    public int NumChannels { get; }
    public void Dispose();
}
```
**Description:** Defines the properties (sample rate, number of channels) of an audio stream being processed by the APM.

#### `ProcessingConfig` (Class)
This class holds multiple `StreamConfig` instances for different parts of the APM pipeline (input, output, reverse input, reverse output).

#### `NoiseSuppressor` (Component - `SoundFlow.Extensions.WebRtc.Apm.Components`)
```csharp
public class NoiseSuppressor : IDisposable
{
    public NoiseSuppressor(ISoundDataProvider dataProvider, int sampleRate, int numChannels, NoiseSuppressionLevel suppressionLevel = NoiseSuppressionLevel.High, bool useMultichannelProcessing = false);
    public event ProcessedAudioChunkHandler? OnAudioChunkProcessed;
    public float[] ProcessAll();
    public void ProcessChunks(Action<ReadOnlyMemory<float>>? chunkHandler = null);
    public void Dispose();
}
```
**Description:** A component for offline/batch noise suppression using WebRTC APM. It takes an `ISoundDataProvider`, processes its audio, and outputs the cleaned audio either as a whole or in chunks.
**Key Members:**
*   `NoiseSuppressor(ISoundDataProvider dataProvider, int sampleRate, int numChannels, ...)`: Constructor.
*   `OnAudioChunkProcessed` (event): Raised when a chunk of audio is processed.
*   `ProcessAll()`: Processes the entire audio stream and returns it.
*   `ProcessChunks()`: Processes audio in chunks, raising `OnAudioChunkProcessed`.

#### `WebRtcApmModifier` (Modifier - `SoundFlow.Extensions.WebRtc.Apm.Modifiers`)
```csharp
public sealed class WebRtcApmModifier : SoundModifier, IDisposable
{
    public WebRtcApmModifier(
        bool aecEnabled = false, bool aecMobileMode = false, int aecLatencyMs = 40,
        bool nsEnabled = false, NoiseSuppressionLevel nsLevel = NoiseSuppressionLevel.High,
        // ... other AGC, HPF, PreAmp, Pipeline settings ...
    );

    public override string Name { get; set; }
    public EchoCancellationSettings EchoCancellation { get; }
    public NoiseSuppressionSettings NoiseSuppression { get; }
    public AutomaticGainControlSettings AutomaticGainControl { get; }
    public ProcessingPipelineSettings ProcessingPipeline { get; }
    public bool HighPassFilterEnabled { get; set; }
    public bool PreAmplifierEnabled { get; set; }
    public float PreAmplifierGainFactor { get; set; }
    public float PostProcessGain { get; set; }

    public override void Process(Span<float> buffer);
    public override float ProcessSample(float sample, int channel); // Throws NotSupportedException
    public void Dispose();
}
```
**Description:** A `SoundModifier` that applies various WebRTC APM features (AEC, NS, AGC, HPF, PreAmp) to an audio stream in real-time.
**Key Members:**
*   Constructor with detailed initial settings.
*   Properties for configuring each APM feature (`EchoCancellation`, `NoiseSuppression`, `AutomaticGainControl`, `ProcessingPipeline`, `HighPassFilterEnabled`, etc.).
*   `Process(Span<float> buffer)`: Core processing logic.
*   `Dispose()`: Releases native APM resources.

#### Enums for WebRTC APM
*   `ApmError`: Error codes.
*   `NoiseSuppressionLevel`: Low, Moderate, High, VeryHigh.
*   `GainControlMode`: AdaptiveAnalog, AdaptiveDigital, FixedDigital.
*   `DownmixMethod`: AverageChannels, UseFirstChannel.
*   `RuntimeSettingType`: Types for runtime APM settings.

### Interfaces `ISoundDataProvider`

```csharp
public interface ISoundDataProvider : IDisposable
{
    int Position { get; }
    int Length { get; }
    bool CanSeek { get; }
    SampleFormat SampleFormat { get; }
    int? SampleRate { get; set; }

    event EventHandler<EventArgs> EndOfStreamReached;
    event EventHandler<PositionChangedEventArgs> PositionChanged;

    int ReadBytes(Span<float> buffer);
    void Seek(int offset);
}
```
**Note:** `ISoundDataProvider` now implements `IDisposable`. Implementations should release their underlying resources (like streams) when disposed.

**Properties:**

*   `Position`: The current read position within the audio data (in samples).
*   `Length`: The total length of the audio data (in samples).
*   `CanSeek`: Indicates whether seeking is supported.
*   `SampleFormat`: The format of the audio samples.
*   `SampleRate`: The sample rate of the audio data.

**Events:**

*   `EndOfStreamReached`: Raised when the end of the audio data is reached.
*   `PositionChanged`: Raised when the read position changes.

**Methods:**

*   `ReadBytes(Span<float> buffer)`: Reads audio samples into the provided buffer.
*   `Seek(int offset)`: Seeks to the specified offset (in samples) within the audio data.
*   `Dispose()`: Releases resources held by the data provider.

### Interfaces `ISoundDecoder`

```csharp
public interface ISoundDecoder : IDisposable
{
    bool IsDisposed { get; }
    int Length { get; }
    SampleFormat SampleFormat { get; }

    event EventHandler<EventArgs>? EndOfStreamReached;

    int Decode(Span<float> samples);
    bool Seek(int offset);
}
```

**Properties:**

*   `IsDisposed`: Indicates whether the decoder has been disposed.
*   `Length`: The total length of the decoded audio data (in samples).
*   `SampleFormat`: The sample format of the decoded audio data.

**Events:**

*   `EndOfStreamReached`: Raised when the end of the audio stream is reached during decoding.

**Methods:**

*   `Decode(Span<float> samples)`: Decodes a portion of the audio stream into the provided buffer.
*   `Seek(int offset)`: Seeks to the specified offset (in samples) within the audio stream.
*   `Dispose()`: Releases the resources used by the decoder.

### Interfaces `ISoundEncoder`

```csharp
public interface ISoundEncoder : IDisposable
{
    bool IsDisposed { get; }

    int Encode(Span<float> samples);
}
```

**Properties:**

*   `IsDisposed`: Indicates whether the encoder has been disposed.

**Methods:**

*   `Encode(Span<float> samples)`: Encodes the provided audio samples.
*   `Dispose()`: Releases the resources used by the encoder.


### Interfaces `ISoundPlayer`

```csharp
public interface ISoundPlayer
{
    PlaybackState State { get; }
    bool IsLooping { get; set; }
    float PlaybackSpeed { get; set; }
    float Volume { get; set; }
    float Time { get; }
    float Duration { get; }
    float LoopStartSeconds { get; }
    float LoopEndSeconds { get; }
    int LoopStartSamples { get; }
    int LoopEndSamples { get; }

    void Play();
    void Pause();
    void Stop();
    bool Seek(TimeSpan time, SeekOrigin seekOrigin = SeekOrigin.Begin);
    bool Seek(float time);
    bool Seek(int sampleOffset);
    void SetLoopPoints(float startTime, float? endTime = -1f);
    void SetLoopPoints(int startSample, int endSample = -1);
    void SetLoopPoints(TimeSpan startTime, TimeSpan? endTime = null);
}
```

**Properties:**

*   `State`: The current playback state (`Stopped`, `Playing`, `Paused`).
*   `IsLooping`: Whether looping is enabled or disabled (`get`, `set`).
*   `PlaybackSpeed`: Gets or sets the playback speed. 1.0 is normal speed.
*   `Volume`: Gets or sets the volume of the sound player (0.0 to 1.0 or higher for gain).
*   `Time`: The current playback position (in seconds).
*   `Duration`: The total duration of the audio (in seconds).
*   `LoopStartSeconds`: Gets the configured loop start point in seconds.
*   `LoopEndSeconds`: Gets the configured loop end point in seconds.  -1 indicates looping to the natural end.
*   `LoopStartSamples`: Gets the configured loop start point in samples.
*   `LoopEndSamples`: Gets the configured loop end point in samples. -1 indicates looping to the natural end.

**Methods:**

*   `Play()`: Starts or resumes playback.
*   `Pause()`: Pauses playback.
*   `Stop()`: Stops playback and resets the position to the beginning.
*   `Seek(TimeSpan time, SeekOrigin seekOrigin = SeekOrigin.Begin)`: Seeks to the specified time using `TimeSpan`. Returns `true` if successful.
*   `Seek(float time)`: Seeks to the specified time (in seconds). Returns `true` if successful.
*   `Seek(int sampleOffset)`: Seeks to the specified sample offset (in samples). Returns `true` if successful.
*   `SetLoopPoints(float startTime, float? endTime = -1f)`: Configures custom loop points using start and end times in seconds. `endTime` is optional;  use -1 or `null` to loop to the natural end.
*   `SetLoopPoints(int startSample, int endSample = -1)`: Configures custom loop points using start and end sample indices. `endSample` is optional; use -1 to loop to the natural end.
*   `SetLoopPoints(TimeSpan startTime, TimeSpan? endTime = null)`: Configures custom loop points using `TimeSpan`.

### Interfaces `IVisualizationContext`

```csharp
public interface IVisualizationContext
{
    void Clear();
    void DrawLine(float x1, float y1, float x2, float y2, Color color, float thickness = 1f);
    void DrawRectangle(float x, float y, float width, float height, Color color);
}
```

**Methods:**

*   `Clear()`: Clears the drawing surface.
*   `DrawLine(float x1, float y1, float x2, float y2, Color color, float thickness = 1f)`: Draws a line from (`x1`, `y1`) to (`x2`, `y2`) with the specified color and thickness.
*   `DrawRectangle(float x, float y, float width, float height, Color color)`: Draws a rectangle with the specified position, dimensions, and color.

### Interfaces `IVisualizer`

```csharp
public interface IVisualizer : IDisposable
{
    string Name { get; }

    event EventHandler VisualizationUpdated;

    void ProcessOnAudioData(Span<float> audioData);
    void Render(IVisualizationContext context);
}
```

**Properties:**

*   `Name`: The name of the visualizer.

**Events:**

*   `VisualizationUpdated`: Raised when the visualization needs to be updated.

**Methods:**

*   `ProcessOnAudioData(Span<float> audioData)`: Processes a chunk of audio data for visualization.
*   `Render(IVisualizationContext context)`: Renders the visualization using the provided `IVisualizationContext`.
*   `Dispose()`: Releases the resources used by the visualizer.

### Modifiers `AlgorithmicReverbModifier`

```csharp
public class AlgorithmicReverbModifier : SoundModifier
{
    public AlgorithmicReverbModifier();

    public float Damp { get; set; }
    public override string Name { get; set; }
    public float PreDelay { get; set; }
    public float RoomSize { get; set; }
    public float Wet { get; set; }
    public float Width { get; set; }
    public float Mix { get; set; }

    public override float ProcessSample(float sample, int channel);
}
```

**Properties:**

*   `Damp`: The damping factor of the reverb.
*   `Name`: The name of the modifier.
*   `PreDelay`: The pre-delay time (in milliseconds).
*   `RoomSize`: The simulated room size.
*   `Wet`: The wet/dry mix of the reverb (0 = dry, 1 = wet).
*   `Width`: The stereo width of the reverb.
*   `Mix`: The mix level of the reverb.

**Methods:**

*   `ProcessSample(float sample, int channel)`: Processes a single audio sample and applies the reverb effect.

### Modifiers `AmbientReverbModifier`

```csharp
public class AmbientReverbModifier : SoundModifier
{
    public AmbientReverbModifier(int baseDelayLength, float baseDecayFactor, float roomSize, float stereoWidth, float diffusion);

    public override float ProcessSample(float sample, int channel);
}
```

**Properties:**
There are no public properties exposed by `AmbientReverbModifier`. The constructor takes the following parameters that act as its properties:

*   `baseDelayLength`: The base delay length (in samples) for the reverb.
*   `baseDecayFactor`: The base decay factor for the reverb.
*   `roomSize`: The simulated room size.
*   `stereoWidth`: The stereo width of the reverb.
*   `diffusion`: The diffusion factor of the reverb.

**Methods:**

*   `ProcessSample(float sample, int channel)`: Processes a single audio sample and applies the ambient reverb effect.

### Modifiers `BassBoostModifier`

```csharp
public class BassBoostModifier : SoundModifier
{
    public BassBoostModifier(float cutoffFrequency);

    public float CutoffFrequency { get; set; }

    public override float ProcessSample(float sample, int channel);
}
```

**Properties:**

*   `CutoffFrequency`: The cutoff frequency below which the bass boost is applied.

**Methods:**

*   `ProcessSample(float sample, int channel)`: Processes a single audio sample and applies the bass boost effect.

### Modifiers `ChorusModifier`

```csharp
public class ChorusModifier : SoundModifier
{
    public ChorusModifier(float depth, float rate, float feedback, float wetDryMix, int maxDelayLength);

    public override float ProcessSample(float sample, int channel);
}
```

**Properties:**
There are no public properties exposed by `ChorusModifier`. The constructor takes the following parameters that act as its properties:

*   `depth`: The depth of the chorus effect.
*   `rate`: The rate of the chorus effect.
*   `feedback`: The feedback amount of the chorus effect.
*   `wetDryMix`: The wet/dry mix of the chorus effect.
*   `maxDelayLength`: The maximum delay length (in samples) used by the chorus effect.

**Methods:**

*   `ProcessSample(float sample, int channel)`: Processes a single audio sample and applies the chorus effect.

### Modifiers `CompressorModifier`

```csharp
public class CompressorModifier : SoundModifier
{
    public CompressorModifier(float threshold, float ratio, float attack, float release, float knee, float makeupGain);

    public override float ProcessSample(float sample, int channel);
}
```

**Properties:**
There are no public properties exposed by `CompressorModifier`. The constructor takes the following parameters that act as its properties:

*   `threshold`: The threshold (in dB) above which compression is applied.
*   `ratio`: The compression ratio.
*   `attack`: The attack time (in milliseconds).
*   `release`: The release time (in milliseconds).
*   `knee`: The knee width (in dB).
*   `makeupGain`: The amount of makeup gain to apply after compression.

**Methods:**

*   `ProcessSample(float sample, int channel)`: Processes a single audio sample and applies the compression effect.

### Modifiers `DelayModifier`

```csharp
public class DelayModifier : SoundModifier
{
    public DelayModifier(int delayLength, float feedback, float wetMix, float cutoffFrequency);

    public override float ProcessSample(float sample, int channel);
}
```

**Properties:**
There are no public properties exposed by `DelayModifier`. The constructor takes the following parameters that act as its properties:

*   `delayLength`: The delay length (in samples).
*   `feedback`: The feedback amount of the delay.
*   `wetMix`: The wet/dry mix of the delay (0 = dry, 1 = wet).
*   `cutoffFrequency`: The cutoff frequency for the low-pass filter applied to the delayed signal.

**Methods:**

*   `ProcessSample(float sample, int channel)`: Processes a single audio sample and applies the delay effect.

### Modifiers `FrequencyBandModifier`

```csharp
public class FrequencyBandModifier : SoundModifier
{
    public FrequencyBandModifier(float lowCutoffFrequency, float highCutoffFrequency);

    public float HighCutoffFrequency { get; set; }
    public float LowCutoffFrequency { get; set; }

    public override float ProcessSample(float sample, int channel);
}
```

**Properties:**

*   `HighCutoffFrequency`: The high cutoff frequency of the frequency band.
*   `LowCutoffFrequency`: The low cutoff frequency of the frequency band.

**Methods:**

*   `ProcessSample(float sample, int channel)`: Processes a single audio sample and applies the frequency band modification.

### Modifiers `NoiseReductionModifier`

```csharp
public class NoiseReductionModifier : SoundModifier
{
    public NoiseReductionModifier(int fftSize = 2048, float alpha = 3f, float beta = 0.001f, float smoothingFactor = 0.9f, float gain = 1.5f, int noiseFrames = 5, VoiceActivityDetector? vad = null);

    public override string Name { get; set; }

    public override void Process(Span<float> buffer);
    public override float ProcessSample(float sample, int channel);
}
```

**Properties:**

*   `Name`: The name of the modifier.

**Methods:**

*   `Process(Span<float> buffer)`: Processes an entire buffer of audio, applying noise reduction.
*   `ProcessSample(float sample, int channel)`: This method throws a `NotSupportedException` because `NoiseReductionModifier` operates on buffers, not individual samples.

### Modifiers `ParametricEqualizer`

```csharp
public class ParametricEqualizer : SoundModifier
{
    public ParametricEqualizer(int channels);

    public override string Name { get; set; }
    
    public void AddBand(EqualizerBand band);
    public void AddBand(FilterType filterType, float frequency, float gain, float q, float bandwidth);
    public void AddBands(IEnumerable<EqualizerBand> bands);
    public void ClearBands();
    public override void Process(Span<float> buffer);
    public override float ProcessSample(float sample, int channel);
    public void RemoveBand(EqualizerBand band);
}
```

**Properties:**

*   `Name`: The name of the modifier.

**Methods:**

*   `AddBand(EqualizerBand band)`: Adds an `EqualizerBand` to the equalizer.
*   `AddBand(FilterType filterType, float frequency, float gain, float q, float bandwidth)`: Adds an equalizer band with the specified parameters.
*   `AddBands(IEnumerable<EqualizerBand> bands)`: Adds multiple equalizer bands.
*   `ClearBands()`: Removes all equalizer bands.
*   `Process(Span<float> buffer)`: Processes an entire buffer of audio, applying equalization.
*   `ProcessSample(float sample, int channel)`: This method throws a `NotSupportedException` because `ParametricEqualizer` operates on buffers, not individual samples.
*   `RemoveBand(EqualizerBand band)`: Removes a specific equalizer band.

### Modifiers `StereoChorusModifier`

```csharp
public class StereoChorusModifier : SoundModifier
{
    public StereoChorusModifier(float depthLeft, float depthRight, float rateLeft, float rateRight, float feedbackLeft, float feedbackRight, float wetDryMix, int maxDelayLength);

    public override void Process(Span<float> buffer);
    public override float ProcessSample(float sample, int channel);
}
```

**Properties:**
There are no public properties exposed by `StereoChorusModifier`. The constructor takes the following parameters that act as its properties:

*   `depthLeft`: The depth of the chorus effect for the left channel.
*   `depthRight`: The depth of the chorus effect for the right channel.
*   `rateLeft`: The rate of the chorus effect for the left channel.
*   `rateRight`: The rate of the chorus effect for the right channel.
*   `feedbackLeft`: The feedback amount for the left channel.
*   `feedbackRight`: The feedback amount for the right channel.
*   `wetDryMix`: The wet/dry mix of the chorus effect.
*   `maxDelayLength`: The maximum delay length (in samples) used by the chorus effect.

**Methods:**

*   `Process(Span<float> buffer)`: Processes an entire buffer of audio, applying the stereo chorus effect.
*   `ProcessSample(float sample, int channel)`: Processes a single audio sample and applies the stereo chorus effect.

### Modifiers `TrebleBoostModifier`

```csharp
public class TrebleBoostModifier : SoundModifier
{
    public TrebleBoostModifier(float cutoffFrequency);

    public float CutoffFrequency { get; set; }

    public override float ProcessSample(float sample, int channel);
}
```

**Properties:**

*   `CutoffFrequency`: The cutoff frequency above which the treble boost is applied.

**Methods:**

*   `ProcessSample(float sample, int channel)`: Processes a single audio sample and applies the treble boost effect.

### Providers `AssetDataProvider`

```csharp
public sealed class AssetDataProvider : ISoundDataProvider, IDisposable
{
    public AssetDataProvider(Stream stream, int? sampleRate = null);
    public AssetDataProvider(byte[] data, int? sampleRate = null);

    public bool CanSeek { get; }
    public int Length { get; }
    public int Position { get; }
    public int? SampleRate { get; set; }
    public SampleFormat SampleFormat { get; private set; }

    public event EventHandler<PositionChangedEventArgs>? PositionChanged;
    public event EventHandler<EventArgs>? EndOfStreamReached;

    public void Dispose();
    public int ReadBytes(Span<float> buffer);
    public void Seek(int sampleOffset);
}
```

**Properties:**

*   `CanSeek`: Indicates whether seeking is supported (always true for `AssetDataProvider`).
*   `Length`: The total length of the audio data (in samples).
*   `Position`: The current read position within the audio data (in samples).
*   `SampleRate`: The sample rate of the audio data.
*   `SampleFormat`: The format of the audio samples.

**Events:**

*   `PositionChanged`: Raised when the read position changes.
*   `EndOfStreamReached`: Raised when the end of the audio data is reached.

**Methods:**

*   `Dispose()`: Releases the resources used by the provider.
*   `ReadBytes(Span<float> buffer)`: Reads audio samples into the provided buffer.
*   `Seek(int sampleOffset)`: Seeks to the specified offset (in samples) within the audio data.

### Providers `StreamDataProvider`

```csharp
public sealed class StreamDataProvider : ISoundDataProvider
{
    public StreamDataProvider(Stream stream, int? sampleRate = null);

    public bool CanSeek { get; }
    public int Length { get; }
    public int Position { get; private set; }
    public int? SampleRate { get; set; }
    public SampleFormat SampleFormat { get; }

    public event EventHandler<PositionChangedEventArgs>? PositionChanged;
    public event EventHandler<EventArgs>? EndOfStreamReached;

    public int ReadBytes(Span<float> buffer);
    public void Seek(int sampleOffset);
    public void Dispose();
}
```

**Properties:**

*   `CanSeek`: Indicates whether seeking is supported (depends on the underlying stream).
*   `Length`: The total length of the audio data (in samples).
*   `Position`: The current read position within the audio data (in samples).
*   `SampleRate`: The sample rate of the audio data.
*   `SampleFormat`: The format of the audio samples.

**Events:**

*   `PositionChanged`: Raised when the read position changes.
*   `EndOfStreamReached`: Raised when the end of the audio stream is reached.

**Methods:**

*   `ReadBytes(Span<float> buffer)`: Reads audio samples from the stream into the provided buffer.
*   `Seek(int sampleOffset)`: Seeks to the specified offset (in samples) within the audio stream (if supported).
*   `Dispose()`: Releases resources used by the provider.

### Providers `MicrophoneDataProvider`

```csharp
public class MicrophoneDataProvider : ISoundDataProvider, IDisposable
{
    public MicrophoneDataProvider(int bufferSize = 8, int? sampleRate = null);

    public int Position { get; private set; }
    public int Length { get; }
    public bool CanSeek { get; }
    public SampleFormat SampleFormat { get; }
    public int? SampleRate { get; set; }

    public event EventHandler<EventArgs>? EndOfStreamReached;
    public event EventHandler<PositionChangedEventArgs>? PositionChanged;

    public void StartCapture();
    public void StopCapture();    
    public int ReadBytes(Span<float> buffer);
    public void Seek(int offset);
    public void Dispose();
}
```

**Properties:**

*   `Position`: The current read position within the captured audio data (in samples).
*   `Length`: Returns -1, indicating an unknown length for the live microphone stream.
*   `CanSeek`: Returns `false` because seeking is not supported for live microphone input.
*   `SampleFormat`: The sample format of the captured audio data, which matches the `AudioEngine`'s sample format.
*   `SampleRate`: The sample rate of the captured audio data.

**Events:**

*   `EndOfStreamReached`: Raised when `StopCapture()` is called, signaling the end of the microphone input stream.
*   `PositionChanged`: Raised after reading data, indicating that the read position has changed.

**Methods:**

*   `MicrophoneDataProvider(int bufferSize = 8, int? sampleRate = null)`: Constructor that initializes the `MicrophoneDataProvider`. It sets the buffer queue size (default is 8), the sample rate (defaults to the `AudioEngine`'s sample rate), and subscribes to the `AudioEngine.OnAudioProcessed` event to capture audio data.
    * `bufferSize`: The number of audio sample arrays to hold in internal queue. Higher values will lead to higher latency but will be more resilient to performance spikes.
    * `sampleRate`: The sample rate of the microphone, will use the audioEngine sample rate if not set.
*   `StartCapture()`: Starts capturing audio data from the microphone.
*   `StopCapture()`: Stops capturing audio data and raises the `EndOfStreamReached` event.
*   `ReadBytes(Span<float> buffer)`: Reads captured audio samples into the provided buffer. If not enough data is available in the queue it will fill the rest of the buffer with silence.
*   `Seek(int offset)`: Throws `NotSupportedException` because seeking is not supported for live microphone input.
*   `Dispose()`: Releases resources used by the `MicrophoneDataProvider`, unsubscribes from the `AudioEngine.OnAudioProcessed` event, and clears the internal buffer queue.

### Providers `ChunkedDataProvider`

```csharp
public sealed class ChunkedDataProvider : ISoundDataProvider, IDisposable
{
    public ChunkedDataProvider(Stream stream, int? sampleRate = null, int chunkSize = DefaultChunkSize);
    public ChunkedDataProvider(string filePath, int? sampleRate = null, int chunkSize = DefaultChunkSize);

    public int Position { get; }
    public int Length { get; }
    public bool CanSeek { get; }
    public SampleFormat SampleFormat { get; }
    public int? SampleRate { get; set; }

    public event EventHandler<EventArgs>? EndOfStreamReached;
    public event EventHandler<PositionChangedEventArgs>? PositionChanged;

    public int ReadBytes(Span<float> buffer);
    public void Seek(int sampleOffset);
    public void Dispose();
}
```

**Properties:**

*   `Position`: The current read position within the audio data (in samples).
*   `Length`: The total length of the audio data in samples.
*   `CanSeek`: Indicates whether seeking is supported (depends on the underlying stream).
*   `SampleFormat`: The format of the audio samples.
*   `SampleRate`: The sample rate of the audio data.

**Events:**

*   `EndOfStreamReached`: Raised when the end of the audio stream is reached.
*   `PositionChanged`: Raised when the read position changes.

**Methods:**

*   `ChunkedDataProvider(Stream stream, int? sampleRate = null, int chunkSize = DefaultChunkSize)`: Constructor that initializes the `ChunkedDataProvider` with a `Stream`. It creates an `ISoundDecoder` to decode the stream, sets the default chunk size (220500 samples per channel, which is 10 seconds at 44.1 kHz), and starts prefetching data.
*   `ChunkedDataProvider(string filePath, int? sampleRate = null, int chunkSize = DefaultChunkSize)`: Constructor that initializes the `ChunkedDataProvider` with a file path. It opens a `FileStream` and calls the other constructor.
*   `ReadBytes(Span<float> buffer)`: Reads audio samples into the provided buffer. It reads data from an internal buffer that is prefilled with decoded audio. If the buffer runs out, it decodes another chunk from the stream.
*   `Seek(int sampleOffset)`: Seeks to the specified sample offset within the audio data (if supported by the stream and decoder). It disposes of the current decoder, creates a new one, and seeks within the stream. Then, it clears the internal buffer and refills it from the new position.
*   `Dispose()`: Releases the resources used by the `ChunkedDataProvider`, including the decoder and the stream.

**Remarks:**

The `ChunkedDataProvider` is designed to handle large audio files efficiently by reading and decoding them in chunks. This prevents the entire file from being loaded into memory at once. The default chunk size is set to 10 seconds of audio at 44.1 kHz, but you can adjust this value in the constructor. The class uses an internal buffer (`Queue<float>`) to store decoded audio samples and prefetches data in the background.


### Providers `NetworkDataProvider`

```csharp
public sealed class NetworkDataProvider : ISoundDataProvider, IDisposable
{
    public NetworkDataProvider(string url, int? sampleRate = null);

    public int Position { get; }
    public int Length { get; private set; }
    public bool CanSeek { get; private set; }
    public SampleFormat SampleFormat { get; private set; }
    public int? SampleRate { get; set; }

    public event EventHandler<EventArgs>? EndOfStreamReached;
    public event EventHandler<PositionChangedEventArgs>? PositionChanged;

    public int ReadBytes(Span<float> buffer);
    public void Seek(int sampleOffset);
    public void Dispose();
}
```

**Properties:**

*   `Position`: The current read position within the audio data (in samples).
*   `Length`: The total length of the audio data (in samples). Returns -1 for HLS streams without an `#EXT-X-ENDLIST` tag, indicating an unknown or continuously growing length.
*   `CanSeek`: Indicates whether seeking is supported. It's `true` for direct audio URLs if the server supports range requests and for HLS streams with an `#EXT-X-ENDLIST` tag; otherwise, it's `false`.
*   `SampleFormat`: The format of the audio samples. Determined after the initial connection to the stream.
*   `SampleRate`: The sample rate of the audio data.

**Events:**

*   `EndOfStreamReached`: Raised when the end of the audio stream is reached.
*   `PositionChanged`: Raised when the read position changes.

**Methods:**

*   `NetworkDataProvider(string url, int? sampleRate = null)`: Constructor that initializes the `NetworkDataProvider` with a network URL. It determines whether the URL points to a direct audio file or an HLS playlist.
*   `ReadBytes(Span<float> buffer)`: Reads audio samples into the provided buffer. It reads data from an internal buffer that is filled asynchronously.
*   `Seek(int sampleOffset)`: Seeks to the specified sample offset within the audio data (if supported). The behavior differs for direct URLs and HLS streams:
    *   **Direct URLs:** Performs an HTTP range request to fetch data starting from the desired offset.
    *   **HLS Streams:** Locates the HLS segment containing the desired time offset and starts downloading from that segment.
*   `Dispose()`: Releases the resources used by the `NetworkDataProvider`, including the `HttpClient`, decoder, and stream.

**Remarks:**

The `NetworkDataProvider` can handle both direct audio URLs and HLS (HTTP Live Streaming) playlists. It automatically detects the stream type and behaves accordingly.

**Direct Audio URLs:**

*   It uses `HttpClient` to make requests to the URL.
*   It supports seeking if the server responds with an "Accept-Ranges: bytes" header.
*   It creates an `ISoundDecoder` to decode the audio stream.
*   It buffers audio data asynchronously in a background thread.

**HLS Playlists:**

*   It downloads and parses the M3U(8) playlist file.
*   It identifies the individual media segments (e.g., `.ts` files).
*   It downloads and decodes segments sequentially.
*   It refreshes the playlist periodically for live streams.
*   It supports seeking by selecting the appropriate segment based on the desired time offset.
*   It determines whether the playlist has a defined end by checking for the `#EXT-X-ENDLIST` tag, which affects whether `Length` is known and `CanSeek` is true.

The class uses an internal `Queue<float>` to buffer audio samples. The `ReadBytes` method waits for data to become available in the buffer if it's empty.

### Providers `RawDataProvider`

```csharp
public sealed class RawDataProvider : ISoundDataProvider, IDisposable
{
    public RawDataProvider(Stream stream, SampleFormat sampleFormat, int channels, int sampleRate);

    public int Position { get; }
    public int Length { get; }
    public bool CanSeek { get; }
    public SampleFormat SampleFormat { get; }
    public int? SampleRate { get; set; }

    public event EventHandler<EventArgs>? EndOfStreamReached;
    public event EventHandler<PositionChangedEventArgs>? PositionChanged;

    public int ReadBytes(Span<float> buffer);
    public void Seek(int offset);
    public void Dispose();
}
```
**Description:** Provides audio data from a stream containing raw PCM audio data.
**Properties:**
*   `Position`: The current read position in samples.
*   `Length`: The total length of the stream in samples.
*   `CanSeek`: Indicates if the underlying stream is seekable.
*   `SampleFormat`: The sample format of the raw audio data.
*   `SampleRate`: The sample rate of the raw audio data.
    **Events:**
*   `EndOfStreamReached`: Raised when the end of the stream is reached.
*   `PositionChanged`: Raised when the read position changes.
    **Methods:**
*   `ReadBytes(Span<float> buffer)`: Reads raw PCM data from the stream and converts it to `float` if necessary.
*   `Seek(int offset)`: Seeks to the specified offset in the underlying stream if `CanSeek` is true.
*   `Dispose()`: Disposes the underlying stream.


### Structs

#### `DeviceInfo`
```csharp
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
public struct DeviceInfo
{
    public IntPtr Id;
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 256)]
    public string Name;
    [MarshalAs(UnmanagedType.U1)]
    public bool IsDefault;
    public uint NativeDataFormatCount;
    public IntPtr NativeDataFormats; // Pointer to an array of NativeDataFormat
}
```
**Description:** Represents information about an audio device, including its native ID, name, whether it's the default system device, and a count/pointer to its supported native data formats.

#### `NativeDataFormat`
```csharp
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
public struct NativeDataFormat
{
    public SampleFormat Format;
    public uint Channels;
    public uint SampleRate;
    public uint Flags;
}
```
**Description:** Represents a specific native data format (sample format, channels, sample rate) supported by an audio device. Accessed via the `NativeDataFormats` pointer in `DeviceInfo`.

### Utils `Extensions`

```csharp
public static class Extensions
{
    public static int GetBytesPerSample(this SampleFormat sampleFormat);
    public static unsafe Span<T> GetSpan<T>(nint ptr, int length) where T : unmanaged;
    public static T[] ReadArray<T>(this nint pointer, int count) where T : struct; // New method
}
```
**New Methods:**
*   `ReadArray<T>(this nint pointer, int count) where T : struct`: Reads an array of structures of type `T` from a native memory pointer.

### Utils `MathHelper`
```csharp
public static class MathHelper
{
    public static void Fft(Complex[] data);
    public static float[] HammingWindow(int size);
    public static void InverseFft(Complex[] data);
    public static double Mod(this double x, double y); // New method
    public static float PrincipalAngle(float angle);   // New method
    // ... other existing methods ...
}
```
**New Methods:**
*   `Mod(this double x, double y)`: Returns the remainder after division, in the range [-0.5, 0.5).
*   `PrincipalAngle(float angle)`: Returns the principal angle of a number in the range [-PI, PI).

### Visualization `LevelMeterAnalyzer`

```csharp
public class LevelMeterAnalyzer : AudioAnalyzer
{
    public LevelMeterAnalyzer(IVisualizer? visualizer = null);

    public override string Name { get; set; }
    public float Peak { get; }
    public float Rms { get; }

    protected override void Analyze(Span<float> buffer);
}
```

**Properties:**

*   `Name`: The name of the analyzer.
*   `Peak`: The peak level of the audio signal.
*   `Rms`: The RMS (root mean square) level of the audio signal.

**Methods:**

*   `Analyze(Span<float> buffer)`: Analyzes the audio buffer to calculate the RMS and peak levels.

### Visualization `LevelMeterVisualizer`

```csharp
public class LevelMeterVisualizer : IVisualizer
{
    public LevelMeterVisualizer(LevelMeterAnalyzer levelMeterAnalyzer);

    public Color BarColor { get; set; }
    public string Name { get; }
    public Color PeakHoldColor { get; set; }
    public static Vector2 Size { get; }

    public event EventHandler? VisualizationUpdated;

    public void Dispose();
    public void ProcessOnAudioData(Span<float> audioData);
    public void Render(IVisualizationContext context);
}
```

**Properties:**

*   `BarColor`: The color of the level meter bar.
*   `Name`: The name of the visualizer.
*   `PeakHoldColor`: The color of the peak hold indicator.
*   `Size`: The size of the level meter.

**Events:**

*   `VisualizationUpdated`: Raised when the visualization needs to be updated.

**Methods:**

*   `Dispose()`: Releases resources used by the visualizer.
*   `ProcessOnAudioData(Span<float> audioData)`: Processes audio data to update the level meter.
*   `Render(IVisualizationContext context)`: Renders the level meter visualization.

### Visualization `SpectrumAnalyzer`

```csharp
public class SpectrumAnalyzer : AudioAnalyzer
{
    public SpectrumAnalyzer(int fftSize, IVisualizer? visualizer = null);

    public override string Name { get; set; }
    public ReadOnlySpan<float> SpectrumData { get; }

    protected override void Analyze(Span<float> buffer);
}
```

**Properties:**

*   `Name`: The name of the analyzer.
*   `SpectrumData`: The calculated frequency spectrum data.

**Methods:**

*   `Analyze(Span<float> buffer)`: Analyzes the audio buffer to compute the frequency spectrum using an FFT.

### Visualization `SpectrumVisualizer`

```csharp
public class SpectrumVisualizer : IVisualizer
{
    public SpectrumVisualizer(SpectrumAnalyzer spectrumAnalyzer);

    public Color BarColor { get; set; }
    public string Name { get; }
    public static Vector2 Size { get; }

    public event EventHandler? VisualizationUpdated;

    public void Dispose();
    public void ProcessOnAudioData(Span<float> audioData);
    public void Render(IVisualizationContext context);
}
```

**Properties:**

*   `BarColor`: The color of the spectrum bars.
*   `Name`: The name of the visualizer.
*   `Size`: The size of the spectrum visualizer.

**Events:**

*   `VisualizationUpdated`: Raised when the visualization needs to be updated.

**Methods:**

*   `Dispose()`: Releases resources used by the visualizer.
*   `ProcessOnAudioData(Span<float> audioData)`: Processes audio data to update the spectrum.
*   `Render(IVisualizationContext context)`: Renders the spectrum visualization.

### Visualization `WaveformVisualizer`

```csharp
public class WaveformVisualizer : IVisualizer
{
    public WaveformVisualizer();

    public string Name { get; }
    public List<float> Waveform { get; }
    public Color WaveformColor { get; set; }
    public Vector2 Size { get; }

    public event EventHandler? VisualizationUpdated;

    public void Dispose();
    public void ProcessOnAudioData(Span<float> audioData);
    public void Render(IVisualizationContext context);
}
```

**Properties:**

*   `Name`: The name of the visualizer.
*   `Waveform`: The waveform data.
*   `WaveformColor`: The color of the waveform.
*   `Size`: The size of the waveform visualizer.

**Events:**

*   `VisualizationUpdated`: Raised when the visualization needs to be updated.

**Methods:**

*   `Dispose()`: Releases resources used by the visualizer.
*   `ProcessOnAudioData(Span<float> audioData)`: Processes audio data to update the waveform.
*   `Render(IVisualizationContext context)`: Renders the waveform visualization.