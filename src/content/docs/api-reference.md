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
*   **`SoundFlow.Interfaces`:** Contains interfaces that define contracts for various functionalities, such as audio data providers, encoders, decoders, and visualizers.
*   **`SoundFlow.Modifiers`:** Contains concrete `SoundModifier` classes that implement various audio effects.
*   **`SoundFlow.Providers`:** Contains classes that implement the `ISoundDataProvider` interface, providing ways to load audio data from different sources.
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

### Backends.MiniAudio

| Class/Interface                                           | Description                                                                                                                                |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [`MiniAudioDecoder`](#backendsminiaudio-miniaudiodecoder) | `ISoundDecoder` implementation using the `miniaudio` library.                                                                              |
| [`MiniAudioEncoder`](#backendsminiaudio-miniaudioencoder) | `ISoundEncoder` implementation using the `miniaudio` library.                                                                              |
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
| [`SoundPlayer`](#components-soundplayer)                       | `SoundComponent` that plays audio from an `ISoundDataProvider`. Implements the `ISoundPlayer` interface for playback control.                          |
| [`SurroundPlayer`](#components-surroundplayer)                 | `SoundComponent` that extends `SoundPlayer` to support surround sound configurations with customizable speaker positions, delays, and panning methods. |
| [`VoiceActivityDetector`](#components-voiceactivitydetector)   | `SoundComponent` and `AudioAnalyzer` that detects the presence of human voice in an audio stream using spectral features and energy thresholds.        |

### Enums

| Enum                                             | Description                                                                                                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Capability`](#enums-capability)                | Specifies the capabilities of an `AudioEngine` instance (Playback, Recording, Mixed, Loopback).                                           |
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

### Exceptions

| Class                                           | Description                                                                                   |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`BackendException`](#exceptions-backendexception) | Thrown when an error occurs in a specific audio backend.                                     |

### Interfaces

| Interface                                           | Description                                                                                                                                  |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`ISoundDataProvider`](#interfaces-isounddataprovider) | Defines a standard way to access audio data from various sources.                                                                         |
| [`ISoundDecoder`](#interfaces-isounddecoder)         | Defines the contract for decoding audio data from a specific format into raw audio samples.                                                 |
| [`ISoundEncoder`](#interfaces-isoundencoder)         | Defines the contract for encoding raw audio samples into a specific format.                                                                 |
| [`ISoundPlayer`](#interfaces-isoundplayer)           | Defines the contract for controlling audio playback (Play, Pause, Stop, Seek).                                                             |
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

### Providers

| Class                                                         | Description                                                                                                                                  |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`AssetDataProvider`](#providers-assetdataprovider)           | `ISoundDataProvider` implementation that reads audio data from a byte array (useful for in-memory assets).                                   |
| [`StreamDataProvider`](#providers-streamdataprovider)         | `ISoundDataProvider` implementation that reads audio data from a generic `Stream` (supports seeking if the stream is seekable).              |
| [`MicrophoneDataProvider`](#providers-microphonedataprovider) | `ISoundDataProvider` implementation that captures and provides audio data from the microphone in real-time.                                  |
| [`ChunkedDataProvider`](#providers-chunkeddataprovider)       | `ISoundDataProvider` implementation that reads and decodes audio data from a file or stream in chunks, improving efficiency for large files. |
| [`NetworkDataProvider`](#providers-networkdataprovider)       | `ISoundDataProvider` implementation that provides audio data from a network source (direct URL or HLS playlist).                             |

### Utils

| Class                                       | Description                                                                                                                                                                                                 |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Extensions`](#utils-extensions)           | Provides extension methods for working with audio data and other utility functions.                                                                                                                             |
| [`MathHelper`](#utils-mathhelper)           | Provides mathematical functions and algorithms used in audio processing, including optimized FFT (Fast Fourier Transform) implementations using SIMD instructions (when available) and a Hamming window function. |

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

    public static event AudioProcessCallback? OnAudioProcessed;

    ~AudioEngine();

    protected abstract void CleanupAudioDevice();
    protected internal abstract ISoundDecoder CreateDecoder(Stream stream);
    protected internal abstract ISoundEncoder CreateEncoder(string filePath, EncodingFormat encodingFormat, SampleFormat sampleFormat, int encodingChannels, int sampleRate);
    protected virtual void Dispose(bool disposing);
    protected abstract void InitializeAudioDevice();
    protected abstract void ProcessAudioData();
    protected void ProcessAudioInput(nint input, int length);
    protected void ProcessGraph(nint output, int length);
    public void SoloComponent(SoundComponent component);
    public void UnsoloComponent(SoundComponent component);
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

**Events:**

*   `OnAudioProcessed`: Event that is raised after each audio processing cycle.

**Methods:**

*   `CleanupAudioDevice()`: Abstract method to be implemented by derived classes to clean up audio device resources.
*   `CreateDecoder(Stream stream)`: Abstract method to be implemented by derived classes to create an `ISoundDecoder` for the specific backend.
*   `CreateEncoder(string filePath, EncodingFormat encodingFormat, SampleFormat sampleFormat, int encodingChannels, int sampleRate)`: Abstract method to be implemented by derived classes to create an `ISoundEncoder` for the specific backend.
*   `Dispose(bool disposing)`: Releases resources used by the engine.
*   `InitializeAudioDevice()`: Abstract method to be implemented by derived classes to initialize the audio device.
*   `ProcessAudioData()`: Abstract method to be implemented by derived classes to perform the main audio processing loop.
*   `ProcessAudioInput(nint input, int length)`: Processes the audio input buffer.
*   `ProcessGraph(nint output, int length)`: Processes the audio graph and outputs to the specified buffer.
*   `SoloComponent(SoundComponent component)`: Solos a component in the audio graph.
*   `UnsoloComponent(SoundComponent component)`: Unsolos a component in the audio graph.
*   `Dispose()`: Public method to dispose of the engine and its resources.

### Abstracts `SoundComponent`

```csharp
public abstract class SoundComponent
{
    protected SoundComponent();

    public virtual float Pan { get; set; }
    public virtual string Name { get; set; }
    public Mixer? Parent { get; set; }
    public virtual bool Solo { get; set; }
    public virtual float Volume { get; set; }
    public virtual bool Enabled { get; set; }
    public virtual bool Mute { get; set; }

    public IReadOnlyList<SoundComponent> Inputs { get; }
    public IReadOnlyList<SoundModifier> Modifiers { get; }
    public IReadOnlyList<SoundComponent> Outputs { get; }

    public void AddModifier(SoundModifier modifier);
    public void ConnectInput(SoundComponent input);
    public void ConnectOutput(SoundComponent output);
    public void DisconnectInput(SoundComponent input);
    public void DisconnectOutput(SoundComponent output);
    protected abstract void GenerateAudio(Span<float> buffer);
    internal void Process(Span<float> outputBuffer);
    public void RemoveModifier(SoundModifier modifier);
}
```

**Properties:**

* `Pan`: The panning of the component's output (-1 to 1, where -1 is left, 0 is center, and 1 is right).
* `Name`: The name of the component.
* `Parent`: The parent mixer of this component.
* `Solo`: Whether the component is soloed.
* `Volume`: The volume of the component's output.
* `Enabled`: Whether the component is enabled.
* `Mute`: Whether the component is muted.
* `Inputs`: Read-only list of connected input components.
* `Modifiers`: Read-only list of applied modifiers.
* `Outputs`: Read-only list of connected output components.

**Methods:**

* `AddModifier(SoundModifier modifier)`: Adds a sound modifier to the component.
* `ConnectInput(SoundComponent input)`: Connects another component's output to this component's input.
* `ConnectOutput(SoundComponent output)`: Connects this component's output to another component's input.
* `DisconnectInput(SoundComponent input)`: Disconnects an input from this component.
* `DisconnectOutput(SoundComponent output)`: Disconnects an output from this component.
* `GenerateAudio(Span<float> buffer)`: Abstract method that derived classes must implement to generate or modify audio data.
* `Process(Span<float> outputBuffer)`: Processes the component's audio, including applying modifiers and handling input/output connections.
* `RemoveModifier(SoundModifier modifier)`: Removes a sound modifier from the component.

### Abstracts `SoundModifier`

```csharp
public abstract class SoundModifier
{
    public SoundModifier();

    public virtual string Name { get; set; }

    public abstract float ProcessSample(float sample, int channel);
    public virtual void Process(Span<float> buffer);
}
```

**Properties:**

*   `Name`: The name of the modifier.

**Methods:**

*   `ProcessSample(float sample, int channel)`: Abstract method to be implemented by derived classes to process a single audio sample.
*   `Process(Span<float> buffer)`: Processes a buffer of audio data.

### Backends.MiniAudio `MiniAudioDecoder`

```csharp
internal sealed unsafe class MiniAudioDecoder : ISoundDecoder
{
    internal MiniAudioDecoder(Stream stream);

    public event EventHandler<EventArgs>? EndOfStreamReached;

    public int Decode(Span<float> samples);
    public void Dispose();
    public bool Seek(int offset);
}
```

**Properties:**

* `IsDisposed`: Indicates whether the decoder has been disposed.
* `Length`: The total length of the decoded audio data in samples.
* `SampleFormat`: The sample format of the decoded audio data.

**Events:**

* `EndOfStreamReached`: Occurs when the end of the audio stream is reached during decoding.

**Methods:**

* `Decode(Span<float> samples)`: Decodes a portion of the audio stream into the provided buffer.
* `Dispose()`: Releases the resources used by the decoder.
* `Seek(int offset)`: Seeks to the specified offset within the audio stream (in samples).

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
    protected internal override ISoundDecoder CreateDecoder(Stream stream);
    protected internal override ISoundEncoder CreateEncoder(string filePath, EncodingFormat encodingFormat, SampleFormat sampleFormat, int encodingChannels, int sampleRate);
    protected override void InitializeAudioDevice();
    protected override void ProcessAudioData();
}
```

**Methods:**

*   `CleanupAudioDevice()`: Cleans up the audio device resources.
*   `CreateDecoder(Stream stream)`: Creates a `MiniAudioDecoder` instance.
*   `CreateEncoder(string filePath, EncodingFormat encodingFormat, SampleFormat sampleFormat, int encodingChannels, int sampleRate)`: Creates a `MiniAudioEncoder` instance.
*   `InitializeAudioDevice()`: Initializes the audio device using `miniaudio`.
*   `ProcessAudioData()`: Implements the main audio processing loop using `miniaudio`.

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

    public int Channels { get; }
    public EncodingFormat EncodingFormat { get; }
    public string FilePath { get; }
    public AudioProcessCallback? ProcessCallback { get; set; }
    public int SampleRate { get; }
    public PlaybackState State { get; }
    public SampleFormat SampleFormat {get;}

    public void Dispose();
    public void PauseRecording();
    public void ResumeRecording();
    public void StartRecording();
    public void StopRecording();
}
```

**Properties:**

*   `Channels`: The number of channels to record.
*   `EncodingFormat`: The encoding format for the recorded audio.
*   `FilePath`: The path to the output file (if recording to a file).
*   `ProcessCallback`: A callback for processing recorded audio in real time.
*   `SampleRate`: The sample rate for recording.
*   `State`: The current recording state (`Stopped`, `Playing`, `Paused`).
*   `SampleFormat`: The sample format for recording.

**Methods:**

*   `Dispose()`: Releases resources used by the recorder.
*   `PauseRecording()`: Pauses the recording.
*   `ResumeRecording()`: Resumes a paused recording.
*   `StartRecording()`: Starts the recording.
*   `StopRecording()`: Stops the recording.

### Components `SoundPlayer`

```csharp
public sealed class SoundPlayer : SoundComponent, ISoundPlayer
{
    public SoundPlayer(ISoundDataProvider dataProvider);

    public float Duration { get; }
    public bool IsLooping { get; set; }
    public override string Name { get; set; }
    public PlaybackState State { get; }
    public float Time { get; }

    public event EventHandler<EventArgs>? PlaybackEnded;

    protected override void GenerateAudio(Span<float> output);
    public void Pause();
    public void Play();
    public void Seek(float time);
    public void Seek(int sampleOffset);
    public void Stop();
}
```

**Properties:**

*   `Duration`: The total duration of the audio.
*   `IsLooping`: Whether looping is enabled.
*   `Name`: The name of the sound player.
*   `State`: The current playback state (`Stopped`, `Playing`, `Paused`).
*   `Time`: The current playback position.

**Events:**

*   `PlaybackEnded`: Occurs when playback reaches the end of the audio.

**Methods:**

*   `GenerateAudio(Span<float> output)`: Reads audio data from the `ISoundDataProvider` and outputs it.
*   `Pause()`: Pauses playback.
*   `Play()`: Starts or resumes playback.
*   `Seek(float time)`: Seeks to the specified time (in seconds).
*   `Seek(int sampleOffset)`: Seeks to the specified sample offset.
*   `Stop()`: Stops playback and resets the position to the beginning.

### Components `SurroundPlayer`

```csharp
public class SurroundPlayer : SoundComponent, ISoundPlayer
{
    public SurroundPlayer(ISoundDataProvider dataProvider);

    public float Duration { get; }
    public bool IsLooping { get; set; }
    public Vector2 ListenerPosition { get; set; }
    public override string Name { get; set; }
    public PanningMethod Panning { get; set; }
    public SpeakerConfiguration SpeakerConfig { get; set; }
    public PlaybackState State { get; }
    public float Time { get; }
    public VbapParameters VbapParameters { get; set; }
    public SurroundConfiguration SurroundConfig { get; set; }

    public event EventHandler<EventArgs>? PlaybackEnded;

    protected override void GenerateAudio(Span<float> output);
    public void Pause();
    public void Play();
    public void Seek(float time);
    public void Seek(int sampleOffset);
    public void SetSpeakerConfiguration(SpeakerConfiguration config);
    public void Stop();
}
```

**Properties:**

*   `Duration`: The total duration of the audio.
*   `IsLooping`: Whether looping is enabled.
*   `ListenerPosition`: The position of the listener in the surround field.
*   `Name`: The name of the surround player.
*   `Panning`: The panning method to use (`Linear`, `EqualPower`, `VBAP`).
*   `SpeakerConfig`: The speaker configuration (`Stereo`, `Quad`, `Surround51`, `Surround71`, `Custom`).
*   `State`: The current playback state.
*   `Time`: The current playback position.
*   `VbapParameters`: Parameters for VBAP panning.
*   `SurroundConfig`: The custom surround configuration (if `SpeakerConfig` is set to `Custom`).

**Events:**

*   `PlaybackEnded`: Occurs when playback reaches the end of the audio.

**Methods:**

*   `GenerateAudio(Span<float> output)`: Processes audio for surround sound output.
*   `Pause()`: Pauses playback.
*   `Play()`: Starts or resumes playback.
*   `Seek(float time)`: Seeks to the specified time.
*   `Seek(int sampleOffset)`: Seeks to the specified sample offset.
*   `SetSpeakerConfiguration(SpeakerConfiguration config)`: Sets the speaker configuration.
*   `Stop()`: Stops playback.

### Components `VoiceActivityDetector`

```csharp
public class VoiceActivityDetector : SoundComponent
{
    public VoiceActivityDetector(int fftSize = 1024, int minHangoverFrames = 60, int maxHangoverFrames = 100, int minAttackFrames = 1, int maxAttackFrames = 8, float alpha = 0.95f, float spectralCentroidThreshold = 0.45f, float spectralFlatnessThreshold = 0.5f, float spectralFluxThreshold = 0.12f, float energyThreshold = 0.0002f);

    public bool IsSpeech { get; }
	
	public override string Name { get; set; }

    public event Action<bool>? SpeechDetected;

    protected override void GenerateAudio(Span<float> buffer);
}
```

**Properties:**

*   `IsSpeech`: Indicates whether speech is currently detected.
*   `Name`: The name of the voice activity detector.

**Events:**

*   `SpeechDetected`: Occurs when speech is detected or not detected.

**Methods:**

*   `GenerateAudio(Span<float> buffer)`: Processes the audio buffer and updates the `IsSpeech` property based on the detection algorithm.

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

### Exceptions `BackendException`

```csharp
public class BackendException : Exception
{
    public BackendException(string backendName, Result result, string message);

    public string Backend { get; }
    public Result Result { get; }
}
```

**Properties:**

*   `Backend`: The name of the audio backend where the exception occurred.
*   `Result`: The result code associated with the exception.

### Interfaces `ISoundDataProvider`

```csharp
public interface ISoundDataProvider
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
    bool IsLooping { get; }
    float Time { get; }
    float Duration { get; }

    void Play();
    void Pause();
    void Stop();
    void Seek(float time);
    void Seek(int sampleOffset);
}
```

**Properties:**

*   `State`: The current playback state (`Stopped`, `Playing`, `Paused`).
*   `IsLooping`: Whether looping is enabled.
*   `Time`: The current playback position (in seconds).
*   `Duration`: The total duration of the audio (in seconds).

**Methods:**

*   `Play()`: Starts or resumes playback.
*   `Pause()`: Pauses playback.
*   `Stop()`: Stops playback and resets the position to the beginning.
*   `Seek(float time)`: Seeks to the specified time (in seconds).
*   `Seek(int sampleOffset)`: Seeks to the specified sample offset.

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

### Utils `Extensions`

```csharp
public static class Extensions
{
    public static int GetBytesPerSample(this SampleFormat sampleFormat);
    public static unsafe Span<T> GetSpan<T>(nint ptr, int length) where T : unmanaged;
}
```

**Methods:**

*   `GetBytesPerSample(this SampleFormat sampleFormat)`: Gets the number of bytes per sample for the specified `SampleFormat`.
*   `GetSpan<T>(nint ptr, int length)`: Creates a `Span<T>` from a pointer and length.

### Utils `MathHelper`

```csharp
public static class MathHelper
{
    public static void Fft(Complex[] data);
    public static float[] HammingWindow(int size);
    public static void InverseFft(Complex[] data);
}
```

**Methods:**

*   `Fft(Complex[] data)`: Performs an in-place Fast Fourier Transform (FFT) on the provided complex data.
*   `HammingWindow(int size)`: Generates a Hamming window of the specified size.
*   `InverseFft(Complex[] data)`: Performs an in-place inverse FFT on the provided complex data.

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