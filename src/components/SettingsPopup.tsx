import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button, Switch, Select, SelectItem, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTheme } from '../contexts/ThemeContext.tsx';
import { useSettings, StepVariant } from '../contexts/SettingsContext.tsx';

const stepVariants: { key: StepVariant; label: string }[] = [
    { key: 'modern', label: 'Modern' },
    { key: 'glow', label: 'Glow' },
    { key: 'mono', label: 'Monochrome' },
    { key: 'brutalist', label: 'Brutalist' },
    { key: 'neumorphic', label: 'Neumorphic' },
];

const SettingsPopup: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { settings, setSettings } = useSettings();

    return (
        <Popover placement="bottom-end">
            <PopoverTrigger>
                <Button
                    isIconOnly
                    variant="light"
                    aria-label="Open settings"
                    className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                    <Icon icon="solar:settings-bold-duotone" className="text-xl" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 w-64">
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-foreground">Settings</h4>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground-600">Dark Mode</span>
                        <Switch
                            isSelected={theme === 'dark'}
                            onValueChange={toggleTheme}
                            aria-label="Toggle dark mode"
                            thumbIcon={({ isSelected, className }) =>
                                isSelected ? <Icon icon="line-md:moon" className={className} /> : <Icon icon="line-md:sun-rising-loop" className={className} />
                            }
                        />
                    </div>

                    <Divider />

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground-600">Typewriter</span>
                        <Switch
                            isSelected={settings.typewriterEffect}
                            onValueChange={(isSelected) => setSettings({ typewriterEffect: isSelected })}
                            aria-label="Toggle typewriter effect"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-foreground-600 pt-2">Steps Component Style</span>
                        <Select
                            label="Select a variant"
                            aria-label="Select Steps component variant"
                            size="sm"
                            color="primary"
                            value={settings.stepsVariant}
                            selectedKeys={[settings.stepsVariant]}
                            onSelectionChange={(keys) => setSettings({ stepsVariant: Array.from(keys)[0] as StepVariant })}
                        >
                            {stepVariants.map((variant) => (
                                <SelectItem key={variant.key}>
                                    {variant.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default SettingsPopup;