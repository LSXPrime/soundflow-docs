import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion as m, useScroll, useTransform, AnimatePresence } from "framer-motion";

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface KeyStrengthsGridProps {
    features: Feature[];
}

// Display for the active feature on desktop (right sticky column)
const ActiveFeatureDisplay = ({ feature }: { feature: Feature }) => {
    return (
        <AnimatePresence mode="wait">
            <m.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="mb-4">
                    <Icon className="h-10 w-10 text-lime-500 dark:text-lime-400" icon={feature.icon} />
                </div>
                <h3 className="text-2xl font-semibold leading-8 text-zinc-900 dark:text-white">
                    {feature.title}
                </h3>
                <p className="mt-4 text-lg leading-7 text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                </p>
            </m.div>
        </AnimatePresence>
    );
};

// Interactive card for the timeline, expands on mobile
const FeatureCard = ({
                         feature,
                         index,
                         activeIndex,
                     }: {
    feature: Feature;
    index: number;
    activeIndex: number;
}) => {
    const isActive = index === activeIndex;

    return (
        <div className="relative flex w-full items-start justify-center gap-6">
            {/* Timeline Dot */}
            <div className="relative mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-transparent dark:bg-zinc-950">
                <div
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        isActive
                            ? "scale-150 bg-lime-500 dark:bg-lime-400"
                            : "bg-zinc-300 dark:bg-zinc-700"
                    }`}
                />
            </div>

            {/* Content Container */}
            <div className={`w-48 text-left ${index % 2 === 0 ? "lg:order-first lg:text-right" : ""}`}>
                {/* Mobile-only Icon (animates in above title) */}
                <div className="lg:hidden">
                    <AnimatePresence>
                        {isActive && (
                            <m.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: "auto", marginBottom: "0.75rem" }} // mb-3
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <Icon className="h-8 w-8 text-lime-500 dark:text-lime-400" icon={feature.icon} />
                            </m.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Title (always visible) */}
                <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                    isActive ? "text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-500"
                }`}>
                    {feature.title}
                </h3>

                {/* Mobile-only Description (animates in below title) */}
                <div className="lg:hidden">
                    <AnimatePresence>
                        {isActive && (
                            <m.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: "auto", marginTop: "0.5rem" }} // mt-2
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                                    {feature.description}
                                </p>
                            </m.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};


const KeyStrengthsGrid: React.FC<KeyStrengthsGridProps> = ({ features }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start center", "end center"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latestValue) => {
            const numFeatures = features.length;
            const newIndex = Math.min(Math.floor(latestValue * numFeatures), numFeatures - 1);
            setActiveIndex(newIndex);
        });
        return () => unsubscribe();
    }, [scrollYProgress, features.length]);

    return (
        <section className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">

            {/* MOBILE-ONLY HEADER */}
            <div className="mx-auto max-w-2xl text-center lg:hidden">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                    Key Strengths
                </h2>
                <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                    SoundFlow is a versatile audio engine that offers a wide range of
                    features, including plug-and-play integrations, infinite
                    extensibility, and a flexible backend architecture.
                </p>
            </div>

            <div className="mt-16 grid lg:mt-0 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">

                {/* DESKTOP-ONLY (Left Sticky) HEADER */}
                <div className="hidden lg:flex lg:flex-col lg:sticky lg:top-[50vh] lg:-translate-y-1/2 h-fit">
                    <m.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl"
                    >
                        Key Strengths
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400"
                    >
                        SoundFlow is a versatile audio engine that offers a wide range of
                        features, including plug-and-play integrations, infinite
                        extensibility, and a flexible backend architecture.
                    </m.p>
                </div>

                {/* CENTER (Scrolling Timeline) COLUMN */}
                <div ref={targetRef} className="relative flex flex-col items-center justify-start gap-12 lg:gap-24 py-12">
                    {/* Background line */}
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-zinc-200 dark:bg-zinc-800" />
                    {/* Progress bar */}
                    <m.div
                        style={{ height: lineHeight }}
                        className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-lime-600 shadow-[0_0_12px_theme(colors.lime.500/0.5)] dark:bg-lime-400 dark:shadow-[0_0_12px_theme(colors.lime.400)]"
                    />

                    {/* Features */}
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.title}
                            feature={feature}
                            index={index}
                            activeIndex={activeIndex}
                        />
                    ))}
                </div>

                {/* DESKTOP-ONLY (Right Sticky) Display */}
                <div className="hidden lg:sticky lg:top-[50vh] lg:-translate-y-1/2 lg:flex h-fit">
                    <ActiveFeatureDisplay feature={features[activeIndex]} />
                </div>
            </div>
        </section>
    );
};

export default KeyStrengthsGrid;