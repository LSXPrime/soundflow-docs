import React from "react";
import { Icon } from "@iconify/react";
import { m } from "framer-motion";

interface CommunityFeature {
    icon: string;
    title: string;
    description: string;
    href: string;
}

interface CommunitySectionProps {
    features: CommunityFeature[];
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ features }) => {
    return (
        <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                {/* Light/Dark Mode: Heading color */}
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                    Get Involved
                </h2>
                {/* Light/Dark Mode: Paragraph color */}
                <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                    SoundFlow is a community-driven project. Your contributions and
                    feedback are invaluable to its growth and success. Here’s how you can
                    help.
                </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                {features.map((feature, index) => (
                    <m.a
                        key={feature.title}
                        // Light/Dark Mode: Card background, border, and hover states
                        className="group flex flex-col gap-4 rounded-xl border border-zinc-400 bg-white p-6 transition-colors hover:border-lime-500/50 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-lime-400/50 dark:hover:bg-zinc-800/50"
                        href={feature.href}
                        rel="noopener noreferrer"
                        target="_blank"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <div className="flex items-center justify-between">
                            {/* Light/Dark Mode: Main icon color */}
                            <Icon
                                className="h-8 w-8 text-lime-500 dark:text-lime-400"
                                icon={feature.icon}
                            />
                            {/* Light/Dark Mode: Arrow icon color and hover state */}
                            <Icon
                                className="h-6 w-6 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-lime-500 dark:text-zinc-500 dark:group-hover:text-lime-400"
                                icon="solar:arrow-right-up-linear"
                            />
                        </div>
                        {/* Light/Dark Mode: Title color */}
                        <h3 className="text-lg font-semibold leading-7 text-zinc-900 dark:text-white">
                            {feature.title}
                        </h3>
                        {/* Light/Dark Mode: Description color */}
                        <p className="flex-1 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                            {feature.description}
                        </p>
                    </m.a>
                ))}
            </div>
        </section>
    );
};

export default CommunitySection;