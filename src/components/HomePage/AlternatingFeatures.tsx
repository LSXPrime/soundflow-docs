import React from "react";
import {m, Variants} from "framer-motion";
import { Icon } from "@iconify/react";

interface AlternatingFeaturesProps {
  title: string;
  description: string;
  points: string[];
  visual: React.ReactNode;
  isReversed?: boolean;
}

const AlternatingFeatures: React.FC<AlternatingFeaturesProps> = ({
                                                                   title,
                                                                   description,
                                                                   points,
                                                                   visual,
                                                                   isReversed = false,
                                                                 }) => {
  const variants : Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
      <div className="relative overflow-hidden pt-16 sm:pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <m.div
              className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2"
              initial="hidden"
              variants={variants}
              viewport={{ once: true, amount: 0.3 }}
              whileInView="visible"
          >
            {/* Text Content: We use the 'order' utility to control its position */}
            <div className={isReversed ? "lg:order-last" : ""}>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
              <ul className="mt-8 space-y-4 text-zinc-600 dark:text-zinc-300">
                {points.map((point) => (
                    <li key={point} className="flex items-start gap-x-3">
                      <Icon
                          className="mt-1 h-5 w-5 flex-none text-lime-400"
                          icon="solar:check-circle-bold"
                      />
                      <span>{point}</span>
                    </li>
                ))}
              </ul>
            </div>

            {/* Visual Content */}
            <div className="relative -mx-6 mt-12 sm:mx-0 lg:mt-0">
              {/* Neon Glow Effect for Light Mode */}
              <div
                  className="absolute inset-0 z-0 scale-125 [filter:blur(90px)] dark:hidden"
                  style={{
                    background:
                        "radial-gradient(circle at 50% 50%, rgba(163, 230, 53, 0.25), transparent 80%)",
                  }}
              />
              {/* Neon Glow Effect for Dark Mode */}
              <div
                  className="absolute inset-0 z-0 scale-125 [filter:blur(90px)] hidden dark:block"
                  style={{
                    background:
                        "radial-gradient(circle at 50% 50%, rgba(163, 230, 53, 0.15), transparent 70%)",
                  }}
              />
              <div className="relative z-10">{visual}</div>
            </div>
          </m.div>
        </div>
      </div>
  );
};

export default AlternatingFeatures;