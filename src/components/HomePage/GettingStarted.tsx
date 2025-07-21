import React from "react";
import {CopyCommandButton} from "../Shared/CopyCommandButton.tsx";
import CodeBlock from "../Shared/CodeBlock.tsx";


const csharpCode = `
using SoundFlow.Abstracts;
using SoundFlow.Backends.MiniAudio;
using SoundFlow.Components;
using SoundFlow.Providers;

// Initialize the audio engine with the MiniAudio backend
using var audioEngine = new MiniAudioEngine(48000, Capability.Playback);

// Create a SoundPlayer and load an audio file
var player = new SoundPlayer(new StreamDataProvider(File.OpenRead("audio.wav")));

// Add the player to the master mixer
Mixer.Master.AddComponent(player);

// Start playback
player.Play();

Console.WriteLine("Playing... Press any key to stop.");
Console.ReadKey();

// Stop playback and clean up
player.Stop();
Mixer.Master.RemoveComponent(player);
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
            <CodeBlock code={csharpCode} language="csharp" typewriter={true} />
          </div>
        </div>
      </section>
  );
};

export default GettingStarted;