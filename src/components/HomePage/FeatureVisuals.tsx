import React from "react";
import { Icon } from "@iconify/react";
import AlternatingFeatures from "./AlternatingFeatures.tsx";

// Visual for "Modular Component Architecture"
export const ModularVisual: React.FC = () => {
    return (
        // Added light mode styles with dark mode overrides
        <div className="flex h-80 items-center justify-center rounded-2xl border border-zinc-400 bg-white p-4 shadow-lg shadow-zinc-900/5 dark:border-zinc-700/50 dark:bg-zinc-900 dark:shadow-2xl dark:shadow-zinc-950/50">
            <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex flex-col items-center gap-2">
                    <Icon
                        className="h-8 w-8 text-lime-400"
                        icon="solar:music-notes-outline"
                    />
                    <span>Source</span>
                </div>
                <Icon className="h-6 w-6" icon="solar:arrow-right-linear" />
                <div className="flex flex-col items-center gap-2">
                    <Icon
                        className="h-8 w-8 text-purple-400"
                        icon="solar:tuning-square-outline"
                    />
                    <span>Modifier</span>
                </div>
                <Icon className="h-6 w-6" icon="solar:arrow-right-linear" />
                <div className="flex flex-col items-center gap-2">
                    <Icon
                        className="h-8 w-8 text-lime-400"
                        icon="solar:volume-loud-outline"
                    />
                    <span>Output</span>
                </div>
            </div>
        </div>
    );
};

// Visual for "Non-Destructive Editing"
export const EditingVisual: React.FC = () => {
    return (
        // Added light mode styles with dark mode overrides
        <div className="flex flex-col gap-4 rounded-2xl border border-zinc-400 bg-white p-6 shadow-lg shadow-zinc-900/5 dark:border-zinc-700/50 dark:bg-zinc-900 dark:shadow-2xl dark:shadow-zinc-950/50">
            <div className="flex items-center text-sm">
                <span className="w-16 font-mono text-zinc-400 dark:text-zinc-500">Track 1</span>
                <div className="relative h-6 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div className="absolute left-[10%] top-0 h-6 w-1/4 rounded-full bg-lime-400/80" />
                    <div className="absolute left-[45%] top-0 h-6 w-1/3 rounded-full bg-purple-400/80" />
                </div>
            </div>
            <div className="flex items-center text-sm">
                <span className="w-16 font-mono text-zinc-400 dark:text-zinc-500">Track 2</span>
                <div className="relative h-6 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div className="absolute left-[30%] top-0 h-6 w-1/2 rounded-full bg-lime-400/80" />
                </div>
            </div>
            <div className="mt-2 h-1 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>
    );
};

// Visual for "Immersive Surround Sound"
export const SurroundVisual: React.FC = () => {
    const speakerPositions = [
        "top-8 left-1/2 -translate-x-1/2",
        "bottom-8 left-1/2 -translate-x-1/2",
        "left-8 top-1/2 -translate-y-1/2",
        "right-8 top-1/2 -translate-y-1/2",
        "top-16 left-16",
        "top-16 right-16",
        "bottom-16 left-16",
        "bottom-16 right-16",
    ];

    return (
        // Added light mode styles with dark mode overrides
        <div className="relative flex h-80 w-full items-center justify-center rounded-2xl border border-zinc-400 bg-white p-4 shadow-lg shadow-zinc-900/5 dark:border-zinc-700/50 dark:bg-zinc-900 dark:shadow-2xl dark:shadow-zinc-950/50">
            {/* Concentric circles with light/dark colors */}
            <div className="absolute h-40 w-40 rounded-full border-2 border-dashed border-zinc-300/60 dark:border-zinc-700/60" />
            <div className="absolute h-64 w-64 rounded-full border border-dashed border-zinc-400 dark:border-zinc-800" />

            {/* Central Listener Icon - Accent color remains the same */}
            <Icon
                icon="solar:headphones-round-sound-bold-duotone"
                className="z-10 h-16 w-16 text-lime-400"
            />

            {/* Speaker Icons - Accent color remains the same */}
            {speakerPositions.map((pos, i) => (
                <Icon
                    key={i}
                    icon="solar:speaker-bold-duotone"
                    className={`absolute h-8 w-8 text-purple-400 ${pos}`}
                />
            ))}
        </div>
    );
};

// Visual for "Real-time Visualization & Analysis"
export const AnalyzerVisual: React.FC = () => {
    const barHeights = [40, 60, 85, 75, 95, 110, 130, 115, 90, 80, 65, 50, 40];
    return (
        // Added light mode styles with dark mode overrides
        <div className="flex h-80 flex-col justify-between gap-4 rounded-2xl border border-zinc-400 bg-white p-6 shadow-lg shadow-zinc-900/5 dark:border-zinc-700/50 dark:bg-zinc-900 dark:shadow-2xl dark:shadow-zinc-950/50">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <Icon
                    icon="solar:chart-square-line-duotone"
                    className="h-6 w-6 text-purple-400"
                />
                <span className="font-mono text-sm">Frequency Spectrum</span>
            </div>

            <div className="flex h-32 w-full items-end justify-center gap-1.5">
                {barHeights.map((height, index) => (
                    <div
                        key={index}
                        className="w-4 flex-1 rounded-t-md bg-gradient-to-t from-purple-500 to-lime-400"
                        style={{ height: `${height}px` }}
                    />
                ))}
            </div>

            <div className="h-16 w-full rounded-lg border border-zinc-400 bg-zinc-100 p-2 dark:border-zinc-800 dark:bg-black/20">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 250 50"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,25 C20,10 40,40 60,25 S100,10 120,25 S160,40 180,25 S220,10 250,25"
                        fill="none"
                        stroke="#a3e635" // lime-400
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    );
};

// Visual for "Universal Codec Support"
export const CodecVisual: React.FC = () => {
    return (
        <div className="flex h-80 items-center justify-center rounded-2xl border border-zinc-400 bg-white p-4 shadow-lg shadow-zinc-900/5 dark:border-zinc-700/50 dark:bg-zinc-900 dark:shadow-2xl dark:shadow-zinc-950/50">
            <div className="flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
                {/* Input Files */}
                <div className="flex flex-col gap-3">
                    {['MP3', 'FLAC', 'AAC'].map((fmt) => (
                        <div key={fmt} className="flex items-center gap-2 rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
                            <Icon icon="solar:file-audio-bold-duotone" className="h-5 w-5 text-purple-400" />
                            <span className="font-mono font-bold">{fmt}</span>
                        </div>
                    ))}
                </div>

                {/* Processing Core */}
                <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-lime-400 to-lime-600 shadow-lg shadow-lime-500/20">
                    <Icon icon="solar:cpu-bolt-bold-duotone" className="h-10 w-10 text-white" />
                    <span className="mt-1 text-[10px] font-bold text-white">Pluggable Codec</span>
                </div>

                {/* Output Stream */}
                <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-32 items-center justify-center rounded-md border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
                        <svg width="100" height="24" viewBox="0 0 100 24">
                            <path d="M0,12 Q12,0 25,12 T50,12 T75,12 T100,12" fill="none" stroke="#a3e635" strokeWidth="2" />
                        </svg>
                    </div>
                    <span className="font-mono font-bold">PCM Data</span>
                </div>
            </div>
        </div>
    );
};

// Visual for "Synthesis & MIDI Sequencing"
export const SynthVisual: React.FC = () => {
    return (
        <div className="flex h-80 flex-col items-center justify-center gap-6 rounded-2xl border border-zinc-400 bg-white p-4 shadow-lg shadow-zinc-900/5 dark:border-zinc-700/50 dark:bg-zinc-900 dark:shadow-2xl dark:shadow-zinc-950/50">

            {/* Signal Flow */}
            <div className="flex w-full max-w-sm items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                        <Icon icon="solar:keyboard-bold-duotone" className="h-5 w-5 text-purple-400" />
                    </div>
                    <span>MIDI</span>
                </div>

                <Icon icon="solar:arrow-right-linear" className="h-4 w-4 text-zinc-300 dark:text-zinc-600" />

                <div className="flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                        <Icon icon="solar:soundwave-square-bold-duotone" className="h-5 w-5 text-lime-400" />
                    </div>
                    <span>Synthesizer</span>
                </div>

                <Icon icon="solar:arrow-right-linear" className="h-4 w-4 text-zinc-300 dark:text-zinc-600" />

                <div className="flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                        <Icon icon="solar:slider-vertical-minimalistic-bold-duotone" className="h-5 w-5 text-purple-400" />
                    </div>
                    <span>Instrument</span>
                </div>

                <Icon icon="solar:arrow-right-linear" className="h-4 w-4 text-zinc-300 dark:text-zinc-600" />

                <div className="flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                        <Icon icon="solar:speaker-bold-duotone" className="h-5 w-5 text-lime-400" />
                    </div>
                    <span>Audio</span>
                </div>
            </div>

            {/* Piano Roll Decoration */}
            <div className="flex h-16 w-full max-w-sm gap-0.5 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black/20">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className={`flex-1 rounded-sm ${i % 2 === 0 ? 'bg-purple-500/20' : 'bg-transparent'} relative`}>
                        {i === 3 && <div className="absolute bottom-1 left-1 right-1 top-4 rounded bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.5)]" />}
                        {i === 7 && <div className="absolute bottom-1 left-1 right-1 top-2 rounded bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const FeatureVisuals: React.FC = () => {
    return (
        <div className="mt-16 sm:mt-32">
            <AlternatingFeatures
                description="Build custom audio pipelines by connecting sources, modifiers, mixers, and analyzers. SoundFlow's flexibility allows you to craft the perfect audio processing chain for any application."
                points={[
                    "Plug & Play Integrations",
                    "Infinite Extensibility",
                    "Flexible Backend Architecture",
                ]}
                title="Modular Component Architecture"
                visual={<ModularVisual />}
            />
            <AlternatingFeatures
                description="Go beyond simple playback. Programmatically build complex multi-track compositions, manipulate audio on a timeline, and persist entire projects to disk with robust media management."
                isReversed={true}
                points={[
                    "Compositions & Tracks",
                    "Pitch-Preserved Time Stretching",
                    "Full Project Save/Load",
                ]}
                title="Non-Destructive Editing & Persistence"
                visual={<EditingVisual />}
            />
            <AlternatingFeatures
                description="Position audio in 2D or 3D space with an intuitive API. SoundFlow supports virtualized multi-channel layouts, from standard stereo to complex 7.1 surround, enabling an immersive experiences."
                points={[
                    "Multi-channel Output (Stereo, Quad, 5.1, 7.1)",
                    "3D Positional Audio",
                    "Object-Based Audio Panning",
                ]}
                title="Immersive Surround Sound"
                visual={<SurroundVisual />}
            />
            <AlternatingFeatures
                description="Understand your audio like never before. Access raw data for frequency spectrums, waveforms, and volume levels to build custom analyzers, VU meters, or responsive visual effects."
                isReversed={true}
                points={[
                    "Spectrum & Waveform Data",
                    "Real-time Metering (RMS, Peak)",
                    "Headless or UI Integration",
                ]}
                title="Real-time Visualization & Analysis"
                visual={<AnalyzerVisual />}
            />
            <AlternatingFeatures
                description="WAV, MP3, FLAC supported by default with Miniaudio. Seamlessly read/write many formats (MP3, AAC, OGG, Opus, FLAC, etc.) using the FFmpeg codec plugin, eliminating the need for external tools."
                points={[
                    "Broad Format Support (MP3, AAC, FLAC, Opus)",
                    "Hardware Acceleration where available",
                    "Metadata & Tagging Support",
                ]}
                title="Universal Format Support"
                visual={<CodecVisual />}
            />
            <AlternatingFeatures
                description="Create music programmatically. The new engine features a polyphonic synthesizer with SoundFont support, MPE capabilities, and a high-resolution sequencer for complex musical arrangements."
                isReversed={true}
                points={[
                    "Subtractive Synthesis & SoundFonts (.sf2)",
                    "Hardware MIDI I/O (PortMidi)",
                    "Arpeggiators & MIDI Effects",
                ]}
                title="Synthesis & MIDI Sequencing"
                visual={<SynthVisual />}
            />
        </div>
    );
};