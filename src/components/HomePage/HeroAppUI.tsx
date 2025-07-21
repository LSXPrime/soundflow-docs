import React from 'react';
import {Icon} from '@iconify/react';
import {m} from 'framer-motion';

// Animated Primitives

const Knob = ({label, value, isAnimated = false}: { label: string, value: string, isAnimated?: boolean }) => (
    <div className="flex flex-col items-center gap-1">
        <m.div
            className="relative w-10 h-10 rounded-full bg-zinc-700 border border-zinc-600 flex items-center justify-center shadow-inner"
            animate={isAnimated ? {rotate: 360} : {}}
            transition={isAnimated ? {duration: 4, ease: 'linear', repeat: Infinity} : {}}
        >
            <div className="w-full h-0.5 bg-zinc-400 transform -rotate-45"/>
            <div className="absolute w-1 h-1 rounded-full bg-lime-400 top-1"/>
        </m.div>
        <p className="text-xs font-mono text-zinc-400">{value}</p>
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{label}</p>
    </div>
);

const Fader = ({label, value}: { label: string, value: string }) => (
    <div className="flex flex-col items-center gap-2">
        <div className="relative w-8 h-24 bg-zinc-800/50 rounded-full flex justify-center py-2 shadow-inner">
            <div className="w-1 h-full bg-zinc-700 rounded-full"/>
            <m.div
                className="absolute w-6 h-2 bg-lime-400 border border-lime-600 rounded-sm"
                initial={{top: '60%'}}
                animate={{top: ['30%', '45%', '35%']}}
                transition={{duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut'}}
            />
        </div>
        <p className="text-xs font-mono text-zinc-400">{value}</p>
        <p className="text-[10px] text-zinc-500 uppercase">{label}</p>
    </div>
);

const Meter = ({level}: { level: number }) => (
    <div className="w-2 h-full bg-zinc-700/50 rounded-full overflow-hidden flex flex-col-reverse shadow-inner">
        {/* Simulates a LevelMeterAnalyzer with dynamic values */}
        <m.div
            className="bg-gradient-to-t from-green-500 via-yellow-400 to-red-500"
            initial={{height: 0}}
            animate={{height: [`${level * 0.8}%`, `${level * 1.1}%`, `${level}%`]}}
            transition={{duration: 0.7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut'}}
        />
    </div>
);

const AnimatedWaveform = () => (
    <m.svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
        {/* Animates the waveform path to simulate active audio */}
        <m.path
            initial={{d: "M0,10 L5,12 L10,8 L15,15 L20,5 L25,10 L30,13 L35,7 L40,10 L45,11 L50,9 L55,14 L60,6 L65,10 L70,12 L75,8 L80,11 L85,9 L90,13 L95,7 L100,10"}}
            animate={{d: "M0,10 L5,8 L10,12 L15,5 L20,15 L25,7 L30,13 L35,10 L40,12 L45,9 L50,11 L55,6 L60,14 L65,11 L70,9 L75,12 L80,8 L85,11 L90,7 L95,13 L100,10"}}
            transition={{duration: 0.5, repeat: Infinity, repeatType: 'mirror'}}
            fill="none" stroke="#a3e635" strokeWidth="1" className="opacity-75"
        />
    </m.svg>
);


// Main UI Components

const AudioClip = ({name, startTime, duration, color, delay}: {
    name: string,
    startTime: string,
    duration: string,
    color: string,
    delay: number
}) => (
    <m.div
        className={`absolute top-0 h-20 rounded-lg shadow-lg flex flex-col justify-between p-2 cursor-pointer ${color}`}
        style={{left: startTime, width: duration}}
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{delay}}
        whileHover={{scale: 1.02, filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))'}}
    >
        <p className="text-white font-bold text-xs truncate">{name}</p>
        <div className="h-8 w-full">
            <AnimatedWaveform/> {/* Represents WaveformVisualizer */}
        </div>
        <div
            className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/50 opacity-50 group-hover:opacity-100"/>
        {/* FadeInDuration */}
        <div
            className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/50 opacity-50 group-hover:opacity-100"/>
        {/* FadeOutDuration */}
    </m.div>
);

const TrackControls = ({name, color, volume, pan, isMuted, isSoloed, meterLevel, delay}: {
    name: string,
    color: string,
    volume: string,
    pan: string,
    isMuted: boolean,
    isSoloed: boolean,
    meterLevel: number,
    delay: number
}) => (
    <m.div
        className="flex gap-3 h-24 bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-2 transition-colors hover:bg-zinc-800"
        initial={{opacity: 0, x: -20}}
        animate={{opacity: 1, x: 0}}
        transition={{delay}}
    >
        <div className="w-1.5 h-full rounded-full" style={{backgroundColor: color}}/>
        <div className="flex-1 flex flex-col justify-between">
            <p className="font-semibold text-white text-sm">{name}</p> {/* Track.Name */}
            <div className="flex items-center gap-2">
                <button
                    className={`w-6 h-6 rounded text-xs font-bold transition-colors ${isMuted ? 'bg-red-500 text-white' : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'}`}>M
                </button>
                {/* TrackSettings.IsMuted */}
                <button
                    className={`w-6 h-6 rounded text-xs font-bold transition-colors ${isSoloed ? 'bg-yellow-500 text-black' : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'}`}>S
                </button>
                {/* TrackSettings.IsSoloed */}
            </div>
        </div>
        <div className="flex items-center gap-2">
            <Knob label="PAN" value={pan}/> {/* TrackSettings.Pan */}
            <Fader label="VOL" value={volume}/> {/* TrackSettings.Volume */}
        </div>
        <div className="w-4 h-full py-1">
            <Meter level={meterLevel}/> {/* TrackSettings.Analyzers (LevelMeterAnalyzer) */}
        </div>
    </m.div>
);

const EffectWindow = () => (
    <m.div
        className="absolute top-[20%] left-[55%] w-[400px] h-[250px] bg-zinc-900/80 backdrop-blur-md border border-zinc-700 rounded-lg shadow-2xl z-20 flex flex-col"
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        transition={{delay: 1.2, type: 'spring', stiffness: 200, damping: 20}}
    >
        <header
            className="h-8 bg-zinc-800 rounded-t-lg flex items-center justify-between px-2 text-xs text-zinc-300 cursor-move">
            <p>Compressor</p> {/* e.g., CompressorModifier */}
            <div className="w-3 h-3 rounded-full bg-red-500"/>
        </header>
        <div className="flex-1 p-4 grid grid-cols-3 gap-4">
            <Knob label="THRESHOLD" value="-18db"/>
            <Knob label="RATIO" value="4:1"/>
            <Knob label="ATTACK" value="5ms"/>
            <Knob label="RELEASE" value="150ms" isAnimated/> {/* Animate one knob to show activity */}
            <Knob label="MAKEUP" value="+6db"/>
            <div className="flex flex-col items-center gap-1">
                <p className="text-[10px] text-zinc-500 uppercase">GAIN REDUCTION</p>
                <div className="w-full h-10 py-1">
                    <Meter level={75}/>
                </div>
            </div>
        </div>
    </m.div>
);

// The Main App
export const HeroAppUI: React.FC = () => {
    return (
        <div
            className="w-full h-full flex flex-col bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden text-white">
            <header
                className="flex-shrink-0 h-14 bg-zinc-800/50 border-b border-zinc-700/50 flex items-center px-4 justify-between">
                <div className="text-sm font-mono text-zinc-500">
                    Composition: Neon Cityscape.sfproj {/* Composition.Name */}
                </div>
                <div className="flex items-center gap-4 text-zinc-400">
                    <Icon icon="solar:stop-bold" className="w-6 h-6"/> {/* Stop() */}
                    <Icon icon="solar:play-bold" className="w-8 h-8 text-lime-400"/> {/* Play() */}
                    <m.div animate={{opacity: [1, 0.5, 1]}} transition={{duration: 1, repeat: Infinity}}>
                        <Icon icon="solar:record-bold-duotone" className="w-7 h-7 text-red-500"/>
                    </m.div>
                    {/* Recorder.StartRecording() */}
                    <Icon icon="solar:loop-bold" className="w-6 h-6 text-lime-400"/> {/* IsLooping */}
                </div>
                <div></div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                <aside
                    className="w-[450px] bg-zinc-800/30 border-r border-zinc-700/50 p-3 space-y-3 overflow-y-auto">
                    <TrackControls name="Synth Arp" color="#8b5cf6" volume="-3.5db" pan="L15" isMuted={false}
                                   isSoloed={true} meterLevel={85} delay={0.2}/>
                    <TrackControls name="Reese Bass" color="#0ea5e9" volume="-6.0db" pan="R20" isMuted={false}
                                   isSoloed={false} meterLevel={60} delay={0.3}/>
                    <TrackControls name="Pad" color="#f59e0b" volume="-1.0db" pan="C" isMuted={true}
                                   isSoloed={false} meterLevel={0} delay={0.4}/>
                    <TrackControls name="Drums" color="#84cc16" volume="-2.5db" pan="C" isMuted={false}
                                   isSoloed={false} meterLevel={92} delay={0.5}/>
                </aside>

                <div className="flex-1 relative p-4"
                     style={{background: 'linear-gradient(to right, #404040 1px, transparent 1px) 0 0 / 4rem 100%, linear-gradient(to bottom, #404040 1px, transparent 1px) 0 0 / 100% 5.5rem'}}>
                    <div className="relative h-full w-full">
                        {/* The sweeping Playhead, representing Composition.Position */}
                        <m.div
                            className="absolute top-0 w-0.5 h-full bg-red-500/90 shadow-[0_0_10px_theme(colors.red.500)] z-10"
                            initial={{left: '0%'}}
                            animate={{left: '100%'}}
                            transition={{duration: 8, ease: 'linear', repeat: Infinity}}
                        />

                        {/* AudioSegments on their Tracks */}
                        <div className="relative w-full h-24 mb-1">
                            <AudioClip name="arp_sequence.wav" startTime="10%" duration="80%" color="bg-purple-600"
                                       delay={0.6}/>
                        </div>
                        <div className="relative w-full h-24 mb-1">
                            <AudioClip name="sub_bass_long.flac" startTime="0%" duration="50%" color="bg-sky-600"
                                       delay={0.7}/>
                        </div>
                        <div className="relative w-full h-24 mb-1"/>
                        <div className="relative w-full h-24 mb-1">
                            <AudioClip name="amen_break_170.aif" startTime="20%" duration="60%"
                                       color="bg-lime-600" delay={0.8}/>
                        </div>
                    </div>

                    {/* Master Channel (Composition master controls) */}
                    <m.div
                        className="absolute bottom-4 right-4 w-64 p-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg z-20 space-y-4"
                        initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.5}}
                    >
                        <h3 className="font-bold text-center border-b border-zinc-700 pb-2">Master</h3>
                        <div className="flex items-start justify-center gap-4">
                            <Fader label="VOL" value="-0.5db"/> {/* Composition.MasterVolume */}
                            <div className="flex gap-1 h-24 py-1">
                                <Meter level={90}/> {/* Master L Meter */}
                                <Meter level={88}/> {/* Master R Meter */}
                            </div>
                        </div>
                    </m.div>

                    <EffectWindow/>
                </div>
            </main>
        </div>
    );
};