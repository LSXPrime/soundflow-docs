import {
    useState,
    Children,
    isValidElement,
    type FC,
    type ReactNode,
    type ReactElement,
    useMemo,
} from 'react';
import {motion, AnimatePresence, MotionProps} from 'framer-motion';
import {Icon} from '@iconify/react';
import clsx from 'clsx';
import {Button} from "@heroui/react";
import {useSettings} from "../../contexts/SettingsContext.tsx";

export type StepVariant = 'modern' | 'glow' | 'mono' | 'brutalist' | 'neumorphic';


// Prop Types for Authoring

interface StepProps {
    title: string;
    description?: string;
    children: ReactNode;
    icon?: string;
    status?: 'complete' | 'current' | 'upcoming' | 'error';
}

interface StepsProps {
    children: ReactNode;
    layout?: 'horizontal' | 'vertical' | 'simple' | 'progress-bar' | 'tabs' | 'split';
    variant?: StepVariant;
    nextLabel?: string;
    finishLabel?: string;
    resetLabel?: string;
    summaryMessage?: string;
}

export const Step: FC<StepProps> = ({children}) => <>{children}</>;

// Internal Types and Definitions

type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

interface StepIndicatorData {
    id: number;
    name: string;
    description: string;
    icon?: string;
    status: StepStatus;
}

// The Variant Matrix
// Central hub for all visual styling.
const variantClasses = {
    modern: {
        shape: 'rounded-full',
        complete: {
            container: 'bg-gradient-to-br from-sky-500 to-indigo-500 shadow-lg shadow-indigo-500/30',
            icon: 'text-white',
            connector: 'bg-gradient-to-r from-sky-500 to-indigo-500',
        },
        current: {
            container: 'border-2 border-indigo-500 bg-white dark:bg-gray-900 scale-110 shadow-lg shadow-indigo-500/50',
            text: 'text-indigo-600 dark:text-indigo-400',
        },
        upcoming: {
            container: 'border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800',
            text: 'text-gray-500 dark:text-gray-400',
        },
    },
    glow: {
        shape: 'rounded-full',
        complete: {
            container: 'bg-lime-500 shadow-[0_0_15px_rgba(5,150,105,0.6)]',
            icon: 'text-white',
            connector: 'bg-lime-500 shadow-[0_0_15px_rgba(5,150,105,0.6)]',
        },
        current: {
            container: 'border-2 border-purple-400 bg-purple-100 dark:bg-purple-900/50 scale-110 shadow-[0_0_20px_rgba(56,189,248,0.7)]',
            text: 'text-purple-600 dark:text-purple-300',
        },
        upcoming: {
            container: 'border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800',
            text: 'text-gray-500 dark:text-gray-400',
        },
    },
    mono: {
        shape: 'rounded-none',
        complete: {
            container: 'bg-gray-800 dark:bg-gray-200',
            icon: 'text-white dark:text-black',
            connector: 'bg-gray-800 dark:bg-gray-200',
        },
        current: {
            container: 'border-2 border-gray-800 dark:border-gray-200 bg-white dark:bg-gray-900 scale-110',
            text: 'text-gray-800 dark:text-gray-200 font-mono font-bold',
        },
        upcoming: {
            container: 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800',
            text: 'text-gray-400 dark:text-gray-500 font-mono',
        },
    },
    brutalist: {
        shape: 'rounded-none',
        complete: {
            container: 'bg-yellow-400 border-2 border-black text-black',
            icon: 'text-black',
            connector: 'bg-black',
        },
        current: {
            container: 'bg-white border-2 border-black scale-110 ring-4 ring-yellow-400',
            text: 'text-black font-bold',
        },
        upcoming: {
            container: 'bg-white border-2 border-black',
            text: 'text-gray-400',
        },
    },
    neumorphic: {
        shape: 'rounded-xl',
        complete: {
            container: 'bg-gray-100 dark:bg-gray-800 text-indigo-500 shadow-[5px_5px_10px_#d0d0d0,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#2c2c2c,-5px_-5px_10px_#4a4a4a]',
            icon: 'text-indigo-500',
            connector: 'bg-gray-300 dark:bg-gray-600',
        },
        current: {
            container: 'bg-gray-100 dark:bg-gray-800 scale-110 shadow-[5px_5px_10px_#d0d0d0,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#2c2c2c,-5px_-5px_10px_#4a4a4a]',
            text: 'text-indigo-600 dark:text-indigo-400',
        },
        upcoming: {
            container: 'bg-gray-100 dark:bg-gray-800 shadow-[inset_5px_5px_10px_#d0d0d0,inset_-5px_-5px_10px_#ffffff] dark:shadow-[inset_5px_5px_10px_#2c2c2c,inset_-5px_-5px_10px_#4a4a4a]',
            text: 'text-gray-400 dark:text-gray-500',
        },
    },
};

// The Main Steps Component

export const Steps: FC<StepsProps> = ({
                                          children,
                                          layout = 'horizontal',
                                          variant,
                                          nextLabel = "Next",
                                          finishLabel = "Finish",
                                          resetLabel = "Start Over",
                                          summaryMessage = "You've finished all the steps. You can review them or start over."
                                      }) => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [isFinished, setIsFinished] = useState(false);
    const { settings } = useSettings();

    const finalVariant : StepVariant = variant ?? settings.stepsVariant ?? 'modern';
    const styles = variantClasses[finalVariant];

    const {allChildren, totalSteps, stepsData} = useMemo(() => {
        const isStepElement = (child: ReactNode): child is ReactElement<StepProps> => isValidElement(child) && child.type === Step;
        const filteredChildren = Children.toArray(children).filter(isStepElement);
        return {
            allChildren: filteredChildren,
            totalSteps: filteredChildren.length,
            stepsData: filteredChildren.map((child, index) => {
                const stepNumber = index + 1;
                const explicitStatus = child.props.status;
                const calculatedStatus: StepStatus = isFinished ? 'complete' : stepNumber < currentStep ? 'complete' : stepNumber === currentStep ? 'current' : 'upcoming';
                return {
                    id: stepNumber,
                    name: child.props.title,
                    description: child.props.description || '',
                    icon: child.props.icon,
                    status: explicitStatus || calculatedStatus,
                };
            }),
        };
    }, [children, currentStep, isFinished]);

    const activeStepContent = allChildren[currentStep - 1];

    // Navigation & State Management
    const handleNextOrFinish = (): void => {
        if (stepsData[currentStep - 1].status === 'error') return;

        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        } else {
            setIsFinished(true);
        }
    };
    const handlePrev = (): void => setCurrentStep((prev) => Math.max(prev - 1, 1));
    const handleStepClick = (step: number): void => {
        if (step < currentStep && stepsData[step - 1].status !== 'error') {
            setCurrentStep(step);
        }
    };
    const handleTabClick = (step: number): void => {
        if (stepsData[step - 1].status !== 'error') {
            setCurrentStep(step);
        }
    };
    const handleJumpToStep = (stepNumber: number) => {
        setCurrentStep(stepNumber);
        setIsFinished(false);
    };
    const handleReset = () => {
        setCurrentStep(1);
        setIsFinished(false);
    };

    const animationVariants = {hidden: {opacity: 0, x: -20}, visible: {opacity: 1, x: 0}, exit: {opacity: 0, x: 20},};

    // Reusable Render Functions
    const renderContent = () => (<AnimatePresence mode="wait">
        <motion.div key={currentStep} className="prose prose-indigo dark:prose-invert max-w-none prose-code:before:content-none prose-code:after:content-none"
                    variants={animationVariants} initial="hidden" animate="visible" exit="exit"
                    transition={{duration: 0.3, ease: "easeInOut"}}>{activeStepContent}</motion.div>
    </AnimatePresence>);

    const renderNavigation = () => (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button onClick={handlePrev} disabled={currentStep === 1}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <Icon icon="lucide:arrow-left" className="h-4 w-4"/> Previous
            </button>
            <button onClick={handleNextOrFinish}
                    disabled={stepsData[currentStep - 1].status === 'error'}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all">
                {currentStep === totalSteps ? finishLabel : nextLabel}
                {currentStep < totalSteps && <Icon icon="lucide:arrow-right" className="h-4 w-4"/>}
            </button>
        </div>);

    const renderStepIcon = (step: StepIndicatorData, forceOriginalIcon = false) => {
        const {status, icon: customIconName, id} = step;
        const iconClass = 'h-6 w-6';

        if (status === 'error') return <Icon icon="lucide:alert-triangle" className={clsx(iconClass, 'text-white')}/>;

        if (status === 'complete') {
            // If forcing the original icon (for summary view) and a custom icon exists, show it.
            if (forceOriginalIcon && customIconName) {
                return <Icon icon={customIconName} className={clsx(iconClass, styles.complete.icon)}/>;
            }
            // If forcing original but there's no custom icon, show the step number.
            if (forceOriginalIcon && !customIconName) {
                return <span className={clsx('font-semibold', styles.complete.icon)}>{id}</span>;
            }
            // Otherwise, show the default checkmark for completed steps in regular views.
            return <Icon icon="lucide:check" className={clsx(iconClass, styles.complete.icon)}/>;
        }

        const textClass = status === 'current' ? styles.current.text : styles.upcoming.text;
        if (customIconName) return <Icon icon={customIconName} className={clsx(iconClass, textClass)}/>;

        return <span className={clsx('font-semibold', textClass)}>{id}</span>;
    };

    // Layout Renderers
    const renderHorizontalLayout = () => (
        <>
            <nav aria-label="Progress">
                <ol role="list" className="flex items-start">
                    {stepsData.map((step, stepIdx) => {
                        const {status} = step;
                        const isClickable = status === 'complete';
                        const errorStyle = 'bg-red-500 shadow-lg shadow-red-500/40';
                        return (
                            <li key={step.id} className="relative flex-1">
                                {stepIdx < totalSteps - 1 && (
                                    <div className="absolute top-5 left-1/2 w-full h-0.5" aria-hidden="true">
                                        <div className="h-full w-full bg-gray-200 dark:bg-gray-700"/>
                                        <div
                                            className={clsx(
                                                "absolute h-full transition-all duration-500 ease-in-out",
                                                styles.shape,
                                                status === 'error' ? 'bg-red-500' : styles.complete.connector,
                                                (status === 'complete' || status === 'error') ? 'w-full' : 'w-0'
                                            )}
                                        />
                                    </div>
                                )}
                                <div
                                    className={clsx("relative flex flex-col items-center gap-y-3", isClickable && 'cursor-pointer group')}
                                    onClick={() => isClickable && handleStepClick(step.id)}>
                                    <div
                                        className={clsx('z-10 flex h-10 w-10 items-center justify-center transition-all duration-300 ease-in-out', styles.shape, status === 'complete' && styles.complete.container, status === 'current' && styles.current.container, status === 'upcoming' && styles.upcoming.container, status === 'error' && errorStyle)}>
                                        {renderStepIcon(step)}
                                    </div>
                                    <div className="text-center">
                                        <p className={clsx('text-sm font-medium transition-colors duration-300', status === 'current' ? styles.current.text : status === 'complete' ? 'text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200' : 'text-gray-500 dark:text-gray-400')}>{step.name}</p>
                                        <p className="hidden md:block text-xs text-gray-500 dark:text-gray-400">{step.description}</p>
                                    </div>
                                </div>
                            </li>);
                    })}
                </ol>
            </nav>
            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">{renderContent()}</div>
            {renderNavigation()}
        </>
    );

    const renderVerticalLayout = () => (
        <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-x-8 lg:gap-x-12">
            <nav aria-label="Progress" className="md:border-r md:pr-8 border-gray-200 dark:border-gray-700">
                <ol role="list" className="flex md:flex-col">
                    {stepsData.map((step, stepIdx) => {
                        const {status} = step;
                        const isClickable = status === 'complete';
                        const errorStyle = 'bg-red-500';
                        return (
                            <li key={step.id} className="relative flex-1 md:flex-initial md:pb-10 last:pb-0">
                                {stepIdx !== totalSteps - 1 &&
                                    <div
                                        className="absolute top-4 left-4 -ml-px mt-0.5 h-[calc(100%-2rem)] w-0.5 bg-gray-200 dark:bg-gray-700"
                                        aria-hidden="true">
                                        <div
                                            className={clsx("absolute w-full transition-all duration-500 ease-in-out", styles.shape, status === 'error' ? 'bg-red-500' : styles.complete.connector, (status === 'complete' || status === 'error') ? 'h-full' : 'h-0')}/>
                                    </div>}
                                <div
                                    className={clsx("relative flex items-start gap-x-3", isClickable && 'cursor-pointer group')}
                                    onClick={() => isClickable && handleStepClick(step.id)}>
                                    <div className="flex h-9 items-center">
                                        <div
                                            className={clsx('relative z-10 flex h-8 w-8 items-center justify-center transition-all duration-300 ease-in-out', styles.shape, status === 'complete' && styles.complete.container, status === 'current' && styles.current.container, status === 'upcoming' && styles.upcoming.container, status === 'error' && errorStyle)}>
                                            {renderStepIcon(step)}
                                        </div>
                                    </div>
                                    <div className="pt-0.5">
                                        <p className={clsx('font-medium transition-colors duration-300', status === 'current' ? styles.current.text : status === 'complete' ? 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white' : 'text-gray-500 dark:text-gray-400')}>{step.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
                                    </div>
                                </div>
                            </li>);
                    })}
                </ol>
            </nav>
            <div className="mt-8 md:mt-0">
                {renderContent()}
                {renderNavigation()}
            </div>
        </div>
    );

    const renderProgressBarLayout = () => {
        const progressPercentage = ((currentStep - 1) / Math.max(1, totalSteps - 1)) * 100;
        return (
            <>
                <div>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">{stepsData[currentStep - 1].name}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stepsData[currentStep - 1].description}</p>
                </div>
                <div className="mt-6" aria-hidden="true">
                    <div className="overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className={clsx("h-2 rounded-full", styles.complete.connector)}
                             style={{width: `${progressPercentage}%`, transition: 'width 0.5s ease-in-out'}}/>
                    </div>
                    <div
                        className="mt-4 hidden grid-cols-4 text-sm font-medium text-gray-600 dark:text-gray-400 sm:grid">
                        {stepsData.map(step => (
                            <div key={step.name}
                                 className={clsx(step.status === 'current' && styles.current.text, 'text-center')}>{step.name}</div>
                        ))}
                    </div>
                </div>
                <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">{renderContent()}</div>
                {renderNavigation()}
            </>
        )
    };

    const renderSimpleLayout = () => (
        <>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5 mb-8">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">{stepsData[currentStep - 1].name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Step {currentStep} of {totalSteps}</p>
            </div>
            {renderContent()}
            {renderNavigation()}
        </>
    );

    const renderTabsLayout = () => (
        <>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs" role="tablist">
                    {stepsData.map(step => (
                        <button key={step.id} role="tab" aria-selected={step.status === 'current'}
                                onClick={() => handleTabClick(step.id)}
                                className={clsx("whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                                    step.status === 'current' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600',
                                    step.status === 'error' && 'text-red-600 border-red-500'
                                )}>
                            {step.name}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="mt-8">{renderContent()}</div>
            {renderNavigation()}
        </>
    );

    const renderSplitLayout = () => (
        <div
            className="my-12 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[280px,1fr] lg:grid-cols-[320px,1fr] rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <aside className="bg-gray-50 dark:bg-gray-900/50 p-6 lg:p-8 border-r border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Steps</h2>
                <nav className="mt-6">
                    <ol>
                        {stepsData.map(step => {
                            const {status} = step;
                            const isClickable = status === 'complete';
                            const errorStyle = 'border-red-500 text-red-500 dark:text-red-400';

                            return (
                                <li key={step.id} className="relative py-3">
                                    <div
                                        className={clsx("flex items-center gap-x-3 text-left", isClickable && 'cursor-pointer group')}
                                        onClick={() => isClickable && handleStepClick(step.id)}>
                                        <div
                                            className={clsx('flex h-8 w-8 items-center justify-center text-sm font-semibold transition-all', styles.shape,
                                                status === 'complete' && `border ${styles.complete.container}`,
                                                status === 'current' && `border-2 ${styles.current.container}`,
                                                status === 'upcoming' && `border ${styles.upcoming.container}`,
                                                status === 'error' && errorStyle
                                            )}>
                                            {renderStepIcon({...step, icon: step.icon})}
                                        </div>
                                        <span className={clsx("font-medium",
                                            status === 'current' && styles.current.text,
                                            status === 'complete' && 'text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white',
                                            'text-gray-400'
                                        )}>
                                            {step.name}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </aside>
            <main className="bg-white dark:bg-gray-800/80 p-6 lg:p-10 backdrop-blur-sm">
                {renderContent()}
                {renderNavigation()}
            </main>
        </div>
    );

    const renderSummaryContent = () => (
        <>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Completed</h2>
                <p className="mt-2 text-md text-gray-600 dark:text-gray-300">
                    {summaryMessage}
                </p>
            </div>
            <div className="mt-10">
                <ol className="relative">
                    {/* The timeline connector line */}
                    <div className={clsx(
                        "absolute left-5 top-2 h-full w-0.5",
                        styles.complete.connector,
                        variant === 'brutalist' && styles.shape === 'rounded-none' ? 'rounded-none' : 'rounded-full'
                    )} aria-hidden="true"/>

                    {stepsData.map((step) => (
                        <li key={`summary-timeline-${step.id}`} className="relative pl-14 pb-8 last:pb-0">
                            {/* The timeline marker */}
                            <div className={clsx(
                                'absolute left-0 top-0 flex h-10 w-10 items-center justify-center',
                                styles.shape,
                                styles.complete.container
                            )} aria-hidden="true">
                                {/* Call renderStepIcon with forceOriginalIcon set to true */}
                                {renderStepIcon(step, true)}
                            </div>

                            <button
                                onClick={() => handleJumpToStep(step.id)}
                                className="w-full text-left p-2 -m-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                            >
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    {step.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                    {step.description}
                                </p>
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                <Button
                    onPress={handleReset}
                    color='success'
                    startContent={<Icon icon="lucide:refresh-cw"/>}
                    variant='bordered'
                >
                    {resetLabel}
                </Button>
            </div>
        </>
    );

    // Main Render Switch
    const renderLayout = () => {
        switch (layout) {
            case 'vertical':
                return renderVerticalLayout();
            case 'simple':
                return renderSimpleLayout();
            case 'progress-bar':
                return renderProgressBarLayout();
            case 'tabs':
                return renderTabsLayout();
            case 'horizontal':
            default:
                return renderHorizontalLayout();
        }
    }

    const wrapperClasses = clsx(
        "w-full my-12 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700",
        variant === 'neumorphic' ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-800/50 backdrop-blur-lg'
    );
    const motionProps: MotionProps = {
        initial: {opacity: 0, y: 15},
        animate: {opacity: 1, y: 0},
        exit: {opacity: 0, y: -15},
        transition: {duration: 0.3, ease: 'easeInOut'}
    };

    return (
        <AnimatePresence mode="wait">
            {isFinished ? (
                <motion.div key="summary-view" {...motionProps} className={wrapperClasses}>
                    {renderSummaryContent()}
                </motion.div>
            ) : (
                <motion.div key="steps-view" {...motionProps}>
                    {layout === 'split' ? renderSplitLayout() : (
                        <div className={wrapperClasses}>
                            {renderLayout()}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};