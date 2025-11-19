import React from "react";
import {CopyCommandButton} from "../Shared/CopyCommandButton.tsx";
import CodeBlock from "../Shared/CodeBlock.tsx";


const csharpPlaybackCode = `
using SoundFlow.Backends.MiniAudio;
using SoundFlow.Components;
using SoundFlow.Providers;
using SoundFlow.Structs;

// 1. Initialize the Audio Engine
using var engine = new MiniAudioEngine();

// 2. Initialize the default Playback Device (null = system default)
using var outputDevice = engine.InitializePlaybackDevice(engine.PlaybackDevices.FirstOrDefault(x => x.IsDefault), AudioFormat.Dvd);
outputDevice.Start();

// 3. Load audio data (supports wav, mp3, flac, ogg, etc.)
using var fileStream = File.OpenRead("path/to/your/audio/file.wav");
using var provider = new StreamDataProvider(engine, fileStream);

// 4. Create the Player and connect it to the Device's Master Mixer
using var player = new SoundPlayer(engine, outputDevice.Format, provider);
outputDevice.MasterMixer.AddComponent(player);

// 5. Control Playback
player.Play();

Console.WriteLine("Playing... Press any key to stop.");
Console.ReadKey();

// 6. Stop playback and clean up
player.Stop();
outputDevice.MasterMixer.RemoveComponent(player);
outputDevice.Stop();
`;

const csharpSequencingCode = `
using SoundFlow.Backends.MiniAudio;
using SoundFlow.Providers;
using SoundFlow.Structs;
using SoundFlow.Synthesis;
using SoundFlow.Synthesis.Banks;

// 1. Initialize the audio engine and output device.
using var engine = new MiniAudioEngine();
using var device = engine.InitializePlaybackDevice(engine.PlaybackDevices.FirstOrDefault(x => x.IsDefault), AudioFormat.DvdHq);

// 2. Load the music data and instruments.
var midi = new MidiDataProvider(File.OpenRead("path/to/your/song.mid"));
using var soundFont = new SoundFontBank("path/to/your/instrument.sf2", device.Format);

// 3. Create the synthesizer and the sequencer to play it.
var synthesizer = new Synthesizer(engine, device.Format, soundFont);
var sequencer = new Sequencer(engine, device.Format, midi, synthesizer);

// 4. Connect the components to the device's output.
device.MasterMixer.AddComponent(synthesizer); // Produces the audio
device.MasterMixer.AddComponent(sequencer);   // Drives the timing

// 5. Start playback and wait for a key press to exit.
device.Start();
sequencer.Play();

Console.WriteLine("Playback started. Press any key to stop...");
Console.ReadKey();

// 6. Stop playback and clean up
sequencer.Stop();
device.MasterMixer.RemoveComponent(synthesizer);
device.MasterMixer.RemoveComponent(sequencer);
device.Stop();
synthesizer.Dispose();
`;

const csharpSynthesisCode = `
using SoundFlow.Backends.MiniAudio;
using SoundFlow.Midi.PortMidi;
using SoundFlow.Structs;
using SoundFlow.Synthesis;
using SoundFlow.Synthesis.Banks;

// 1. Initialize the audio and MIDI engines.
using var engine = new MiniAudioEngine();
engine.UsePortMidi();
engine.UpdateAudioDevicesInfo();
engine.UpdateMidiDevicesInfo();

// 2. Set up the audio output and synthesizer.
using var device = engine.InitializePlaybackDevice(engine.PlaybackDevices.FirstOrDefault(x => x.IsDefault), AudioFormat.DvdHq);
using var soundFont = new SoundFontBank("path/to/your/soundfont/file.sf2", device.Format);
var synthesizer = new Synthesizer(engine, device.Format, soundFont);

// 3. Connect the synthesizer to the speakers.
device.MasterMixer.AddComponent(synthesizer);
device.Start();

// 4. Find and connect the first MIDI input device.
var midiInput = engine.MidiManager.AvailableInputs.FirstOrDefault();

// 5. Create a route from the MIDI device directly to the synthesizer.
var route = engine.MidiManager.CreateRoute(midiInput, synthesizer);

Console.WriteLine($"Synthesizer is live on: '{midiInput.Name}'. Press any key to stop.");
Console.ReadKey();

// 6. Clean up.
device.Stop();
synthesizer.Dispose();
`;

const GettingStarted: React.FC = () => {
    return (
        <section className="relative my-24 sm:my-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                        Get Started in Minutes
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        Install the package and start building your first audio application.
                        It's that simple.
                    </p>
                </div>
                <div>
                    <CopyCommandButton command="dotnet add package SoundFlow" />
                </div>
                <div className="mt-12 justify-center">
                    <CodeBlock
                        codeSnippets={[
                            { title: "Audio Playback", language: "csharp", code: csharpPlaybackCode },
                            { title: "MIDI Sequencing", language: "csharp", code: csharpSequencingCode },
                            { title: "MIDI Synthesis", language: "csharp", code: csharpSynthesisCode }
                        ]}
                        typewriter={true}
                    />
                </div>
            </div>
        </section>
    );
};

export default GettingStarted;