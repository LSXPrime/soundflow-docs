import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import React from "react";
import { Icon } from "@iconify/react";
import { HeroAppUI } from './HeroAppUI.tsx';

const backgroundContainerStyle: React.CSSProperties = {
    width: '1500px',
    height: '1000px',
    bottom: '100px',
    right: '-200px',
    transform: 'perspective(3600px) rotateX(58deg) rotateY(-10deg) rotateZ(-12deg) scale(1.4)',
    transformOrigin: 'bottom right'
};

const HeroSection: React.FC = () => {
    const latestVersion = 'v1.2.0'; // Fallback

    return (
        // Set base colors for light mode and override them for dark mode
        <div className="min-h-screen overflow-hidden relative bg-white text-zinc-900 dark:bg-black dark:text-white">
            {/* Background UI Container */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute"
                    style={backgroundContainerStyle}
                >
                    <HeroAppUI />
                </div>
            </div>

            {/* Hero Content */}
            <section className="relative z-10 pt-24 pb-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col gap-8 pt-24 md:pt-36">
                    {/* Top "pill" button with light/dark styles */}
                    <Button
                        as="a"
                        className="h-auto self-start border-zinc-200 bg-zinc-100/50 px-3 py-1 text-sm font-normal text-zinc-700 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300"
                        endContent={
                            <Icon
                                className="text-zinc-500 dark:text-zinc-400"
                                icon="lucide:arrow-right"
                                fontSize={20}
                            />
                        }
                        href="#"
                        radius="full"
                        variant="bordered"
                    >
                        Release Notes
                    </Button>

                    <div className="flex flex-col gap-4">
                        {/* Header and description with light/dark text colors */}
                        <h1 className="text-[clamp(2.5rem,10vw,4.5rem)] font-bold leading-tight tracking-tighter text-zinc-900 dark:text-white">
                            SoundFlow
                        </h1>
                        <p className="mx-0 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
                            A comprehensive .NET toolkit for sonic innovation. <br /> Build
                            interactive music, cutting-edge pipelines, and professional audio
                            tools.
                        </p>
                    </div>

                    <div className="mt-4 flex flex-col items-start justify-start gap-4 sm:flex-row sm:items-center">
                        {/* Primary "Dive in" button */}
                        <Button
                            as={Link}
                            to={`/docs/${latestVersion}/`}
                            className="h-12 w-full bg-zinc-900 px-6 text-sm font-medium text-white sm:w-auto dark:bg-white dark:text-black"
                            radius="full"
                        >
                            Dive into Getting Started
                        </Button>
                        {/* Secondary "GitHub" button */}
                        <Button
                            as={Link}
                            to="https://github.com/LSXPrime/SoundFlow"
                            className="h-12 w-full border-zinc-200 bg-transparent px-5 text-sm font-medium text-zinc-700 sm:w-auto dark:border-zinc-700 dark:text-zinc-300"
                            radius="full"
                            startContent={
                                <Icon
                                    className="text-yellow-400"
                                    icon="lucide:sparkles"
                                    fontSize={20}
                                />
                            }
                            variant="bordered"
                        >
                            Star on GitHub
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;