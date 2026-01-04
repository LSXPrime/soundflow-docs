import React from "react";

import HeroSection from "./HeroSection.tsx";
import GettingStarted from "./GettingStarted.tsx";
import KeyStrengthsGrid from "./KeyStrengthsGrid.tsx";
import CommunitySection from "./CommunitySection.tsx";
import { keyStrengths, communityFeatures } from "./features-data.ts";
import { FeatureVisuals } from "./FeatureVisuals.tsx";

const LandingPage: React.FC = () => {
    return (
        <div className="flex w-full flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
            <main className="flex w-full flex-col">
                <HeroSection />

                <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-32 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            A Robust .NET Toolkit for Sonic Innovation
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                            SoundFlow is a versatile audio engine designed for seamless
                            cross-platform audio processing. It empowers developers to build
                            sophisticated audio applications, from secure real-time communication systems
                            and content identification services to advanced non-linear audio editors.
                        </p>
                    </div>
                </div>

                <FeatureVisuals />

                <GettingStarted />

                <KeyStrengthsGrid features={keyStrengths} />

                <CommunitySection features={communityFeatures} />
            </main>
        </div>
    );
};

export default LandingPage;