import React from "react";
import { Icon } from "@iconify/react";
import AlternatingFeatures from "./AlternatingFeatures.tsx";

// Helpers
const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`relative flex h-80 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-400 bg-white p-6 shadow-lg shadow-zinc-900/5 dark:border-zinc-700/50 dark:bg-zinc-900 dark:shadow-2xl dark:shadow-zinc-950/50 ${className}`}>
        {/* Subtle background grid for all visuals */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
             style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '24px 24px' }}
        />
        {children}
    </div>
);

// Visuals

export const ModularVisual: React.FC = () => {
    return (
        <Container>
            <div className="relative flex items-center gap-8 z-10">
                {/* Connection Lines */}
                <svg className="absolute inset-0 -z-10 w-full h-full overflow-visible">
                    <path d="M-40,40 L280,40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-zinc-300 dark:text-zinc-700 animate-[dash_20s_linear_infinite]" />
                </svg>

                {[
                    { label: "Source", icon: "solar:music-notes-bold-duotone", color: "text-lime-400", bg: "bg-lime-400/10" },
                    { label: "Modifier", icon: "solar:tuning-square-bold-duotone", color: "text-purple-400", bg: "bg-purple-400/10" },
                    { label: "Mixer", icon: "solar:widget-add-bold-duotone", color: "text-lime-400", bg: "bg-lime-400/10" }
                ].map((node, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800`}>
                            <Icon icon={node.icon} className={`h-8 w-8 ${node.color}`} />
                        </div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">{node.label}</span>
                    </div>
                ))}
            </div>

            {/* Signal Pulse Animation */}
            <div className="absolute left-0 h-[1px] w-20 bg-gradient-to-r from-transparent via-lime-400 to-transparent animate-signal-flow" />
        </Container>
    );
};

export const EditingVisual: React.FC = () => {
    return (
        <Container className="justify-start pt-12">
            <div className="w-full space-y-4 z-10">
                {[1, 2, 3].map((track) => (
                    <div key={track} className="flex items-center gap-4">
                        <span className="w-12 font-mono text-[10px] text-zinc-400">TRK 0{track}</span>
                        <div className="relative h-8 flex-1 overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black/40">
                            {/* Fake Waveform Blocks */}
                            <div className={`absolute inset-y-1 rounded bg-lime-400/20 border-l-2 border-lime-400`} style={{ left: track === 1 ? '10%' : '30%', width: track === 1 ? '40%' : '50%' }} />
                            {track === 1 && <div className="absolute inset-y-1 left-[55%] w-[20%] rounded bg-purple-400/20 border-l-2 border-purple-400" />}
                        </div>
                    </div>
                ))}
            </div>
            {/* Playhead */}
            <div className="absolute bottom-6 left-[45%] top-6 w-[2px] bg-red-500 shadow-[0_0_8px_red] z-20">
                <div className="absolute -top-1 -left-[3px] h-2 w-2 rounded-full bg-red-500" />
            </div>
            {/* Non-Destructive Indicators */}
            <div className="mt-8 flex gap-6 text-[10px] font-mono text-zinc-400">
                <div className="flex items-center gap-1"><Icon icon="solar:history-bold" className="text-purple-400" /> UNDO HISTORY ACTIVE</div>
                <div className="flex items-center gap-1"><Icon icon="solar:diskette-bold" className="text-lime-400" /> AUTO-SAVE</div>
            </div>
        </Container>
    );
};

export const SurroundVisual: React.FC = () => {
    return (
        <Container>
            {/* Propagation Waves */}
            <div className="absolute h-32 w-32 animate-[ping_3s_linear_infinite] rounded-full border border-lime-400/30" />
            <div className="absolute h-48 w-48 animate-[ping_3s_linear_infinite_1s] rounded-full border border-purple-400/20" />

            {/* Speakers Layout */}
            <div className="relative h-56 w-56 rounded-full border border-dashed border-zinc-300 dark:border-zinc-800">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <div
                        key={deg}
                        className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2"
                        style={{ top: `${50 + 50 * Math.sin(deg * Math.PI / 180)}%`, left: `${50 + 50 * Math.cos(deg * Math.PI / 180)}%` }}
                    >
                        <Icon icon="solar:speaker-bold-duotone" className={`h-full w-full ${deg % 90 === 0 ? 'text-lime-400' : 'text-zinc-400 dark:text-zinc-600'}`} />
                    </div>
                ))}

                {/* Center Listener */}
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                    <div className="rounded-full bg-zinc-900 p-3 shadow-2xl dark:bg-white">
                        <Icon icon="solar:headphones-round-sound-bold" className="h-8 w-8 text-lime-400 dark:text-zinc-900" />
                    </div>
                    <span className="mt-2 font-mono text-[9px] font-bold text-zinc-500 uppercase">3D_POS_HEAD</span>
                </div>
            </div>
        </Container>
    );
};

export const AnalyzerVisual: React.FC = () => {
    const bars = Array.from({ length: 24 });
    return (
        <Container className="justify-between pt-10 pb-6">
            <div className="flex items-end justify-center gap-1 h-32 w-full px-4">
                {bars.map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-purple-500 via-lime-400 to-lime-300 transition-all duration-300"
                        style={{ height: `${20 + Math.random() * 80}%` }}
                    />
                ))}
            </div>

            <div className="grid w-full grid-cols-2 gap-4">
                {/* Meter 1 */}
                <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[8px] text-zinc-400"><span>LUFS</span><span>-14.2</span></div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                        <div className="h-full w-[70%] bg-lime-400" />
                    </div>
                </div>
                {/* Meter 2 */}
                <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[8px] text-zinc-400"><span>PEAK</span><span>-0.1db</span></div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                        <div className="h-full w-[95%] bg-purple-400" />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 font-mono text-[9px] text-zinc-500">
                <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-lime-400" /> REAL-TIME</span>
                <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-purple-400" /> FFT_ANALYSIS</span>
            </div>
        </Container>
    );
};

export const CodecVisual: React.FC = () => {
    return (
        <Container>
            <div className="flex w-full max-w-sm items-center justify-between z-10">
                {/* Inputs */}
                <div className="flex flex-col gap-2">
                    {['WAV', 'MP3', 'FLAC'].map(f => (
                        <div key={f} className="flex items-center gap-2 rounded border border-zinc-200 bg-white px-2 py-1 dark:border-zinc-800 dark:bg-zinc-900">
                            <Icon icon="solar:file-audio-bold" className="h-3 w-3 text-purple-400" />
                            <span className="font-mono text-[10px] font-bold">{f}</span>
                        </div>
                    ))}
                </div>

                {/* Processing Bridge */}
                <div className="relative flex h-20 w-20 items-center justify-center">
                    <div className="absolute inset-0 animate-spin-slow rounded-xl border border-lime-400/40" />
                    <div className="z-10 flex flex-col items-center">
                        <Icon icon="solar:cpu-bolt-bold-duotone" className="h-10 w-10 text-lime-400" />
                        <span className="text-[8px] font-bold text-zinc-400 uppercase">FFmpeg</span>
                    </div>
                </div>

                {/* Raw PCM Output */}
                <div className="flex flex-col items-center gap-2">
                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-black/40">
                        <svg width="60" height="30" viewBox="0 0 60 30">
                            <path d="M0,15 L5,15 L8,5 L12,25 L15,15 L60,15" fill="none" stroke="#a3e635" strokeWidth="2" />
                        </svg>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-zinc-500">RAW_PCM</span>
                </div>
            </div>
        </Container>
    );
};

export const SynthVisual: React.FC = () => {
    return (
        <Container>
            {/* ADSR Envelope Graph */}
            <div className="absolute top-8 right-8 h-16 w-24 rounded border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-black/40">
                <svg viewBox="0 0 100 40" className="h-full w-full">
                    <path d="M0,40 L20,5 L50,15 L80,15 L100,40" fill="none" stroke="#c084fc" strokeWidth="2" />
                    <text x="0" y="35" fontSize="10" className="fill-zinc-400 font-mono">ADSR</text>
                </svg>
            </div>

            {/* MIDI Grid */}
            <div className="mt-4 grid w-full max-w-xs grid-cols-8 gap-1 p-2 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-inner">
                {Array.from({ length: 32 }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-4 rounded-sm transition-colors ${[2, 7, 12, 18, 25].includes(i) ? 'bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.6)]' : 'bg-zinc-100 dark:bg-zinc-800'}`}
                    />
                ))}
            </div>

            <div className="mt-6 flex items-center gap-8">
                <div className="flex flex-col items-center">
                    <Icon icon="solar:keyboard-bold-duotone" className="h-8 w-8 text-purple-400" />
                    <span className="mt-1 font-mono text-[9px] text-zinc-400">MIDI_IN</span>
                </div>
                <Icon icon="solar:arrow-right-linear" className="text-zinc-300" />
                <div className="flex flex-col items-center">
                    <Icon icon="solar:Soundwave-bold-duotone" className="h-8 w-8 text-lime-400" />
                    <span className="mt-1 font-mono text-[9px] text-zinc-400">POLY_SYNTH</span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes dash { to { stroke-dashoffset: -100; } }
                @keyframes signal-flow {
                    0% { left: 0%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
                .animate-signal-flow { animation: signal-flow 3s linear infinite; }
                .animate-spin-slow { animation: spin 6s linear infinite; }
            `}} />
        </Container>
    );
};

export const SecurityVisual: React.FC = () => {
    return (
        <Container>
            {/* Top Row: Encrypted Waveform Display */}
            <div className="z-10 mb-8 flex w-full max-w-xs flex-col gap-2">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    <span>Acoustic_Fingerprint</span>
                    <span className="text-lime-500">Verified</span>
                </div>
                <div className="relative h-12 w-full overflow-hidden rounded-lg border border-zinc-300 bg-zinc-50 dark:border-zinc-800 dark:bg-black/40">
                    <div className="absolute inset-0 flex items-center justify-center gap-1 px-4">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="w-1 bg-purple-500/40" style={{ height: `${20 + Math.random() * 60}%` }} />
                        ))}
                    </div>
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-lime-400/20 to-transparent animate-scan" />
                </div>
            </div>

            <div className="relative flex items-center justify-center">
                <div className="absolute h-32 w-32 animate-[spin_10s_linear_infinite] rounded-full border border-dashed border-zinc-300 dark:border-zinc-700" />
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-zinc-300 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
                    <Icon icon="solar:shield-check-bold-duotone" className="h-14 w-14 text-lime-400" />
                </div>
                {/* Satellites */}
                <div className="absolute -left-16 flex flex-col items-center gap-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                        <Icon icon="solar:key-bold-duotone" className="h-5 w-5 text-purple-400" />
                    </div>
                    <span className="text-[8px] font-bold text-zinc-400">AES-256</span>
                </div>
            </div>

            <div className="z-10 mt-10 flex w-64 items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50/50 px-4 py-1.5 dark:border-zinc-800 dark:bg-black/20">
                <div className="flex-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                    <div className="h-full w-2/3 bg-lime-400" />
                </div>
                <span className="font-mono text-[9px] text-zinc-500">AUTH_SECURE</span>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
                .animate-scan { animation: scan 3s linear infinite; }
            `}} />
        </Container>
    );
};

export const FeatureVisuals: React.FC = () => {
    return (
        <div className="mt-16 sm:mt-32">
            <AlternatingFeatures
                description="Build custom audio pipelines by connecting sources, modifiers, mixers, and analyzers. SoundFlow's flexibility allows you to craft the perfect audio processing chain for any application."
                points={["Plug & Play Integrations", "Infinite Extensibility", "Flexible Backend Architecture"]}
                title="Modular Component Architecture"
                visual={<ModularVisual />}
            />
            <AlternatingFeatures
                description="Go beyond simple playback. Programmatically build complex multi-track compositions, manipulate audio on a timeline, and persist entire projects to disk with robust media management."
                isReversed={true}
                points={["Compositions & Tracks", "Pitch-Preserved Time Stretching", "Full Project Save/Load"]}
                title="Non-Destructive Editing & Persistence"
                visual={<EditingVisual />}
            />
            <AlternatingFeatures
                description="Integrate enterprise-grade security. Safeguard content with AES-256 encryption, verify authenticity with ECDSA signatures, embed robust watermarks, and identify audio with acoustic fingerprinting."
                points={["End-to-End Encryption", "Digital Signatures", "Acoustic Fingerprinting & ID"]}
                title="Protect, Authenticate & Identify"
                visual={<SecurityVisual />}
            />
            <AlternatingFeatures
                description="Position audio in 2D or 3D space with an intuitive API. SoundFlow supports virtualized multi-channel layouts, from standard stereo to complex 7.1 surround, enabling an immersive experiences."
                isReversed={true}
                points={["Multi-channel Output (Stereo, Quad, 5.1, 7.1)", "3D Positional Audio", "Object-Based Audio Panning"]}
                title="Immersive Surround Sound"
                visual={<SurroundVisual />}
            />
            <AlternatingFeatures
                description="Understand your audio like never before. Access raw data for frequency spectrums, waveforms, and volume levels to build custom analyzers, VU meters, or responsive visual effects."
                points={["Spectrum & Waveform Data", "Real-time Metering (RMS, Peak)", "Headless or UI Integration"]}
                title="Real-time Visualization & Analysis"
                visual={<AnalyzerVisual />}
            />
            <AlternatingFeatures
                description="WAV, MP3, FLAC supported by default with Miniaudio. Seamlessly read/write many formats (MP3, AAC, OGG, Opus, FLAC, etc.) using the FFmpeg codec plugin, eliminating the need for external tools."
                isReversed={true}
                points={["Broad Format Support (MP3, AAC, FLAC, Opus)", "Hardware Acceleration where available", "Metadata & Tagging Support"]}
                title="Universal Format Support"
                visual={<CodecVisual />}
            />
            <AlternatingFeatures
                description="Create music programmatically. The new engine features a polyphonic synthesizer with SoundFont support, MPE capabilities, and a high-resolution sequencer for complex musical arrangements."
                points={["Subtractive Synthesis & SoundFonts (.sf2)", "Hardware MIDI I/O (PortMidi)", "Arpeggiators & MIDI Effects"]}
                title="Synthesis & MIDI Sequencing"
                visual={<SynthVisual />}
            />
        </div>
    );
};