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

// --- NEW VISUALS START HERE ---

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
        </div>
    );
};