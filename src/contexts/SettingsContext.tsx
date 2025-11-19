import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the available variants for the Steps component
export type StepVariant = 'modern' | 'glow' | 'mono' | 'brutalist' | 'neumorphic';

// Define the shape of our settings
interface AppSettings {
    typewriterEffect: boolean;
    stepsVariant: StepVariant;
}

// Define the shape of our context
interface SettingsContextType {
    settings: AppSettings;
    setSettings: (newSettings: Partial<AppSettings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Helper to get initial state from localStorage
const getInitialState = (): AppSettings => {
    try {
        const item = window.localStorage.getItem('app-settings');
        if (item) {
            return { ...defaultSettings, ...JSON.parse(item) };
        }
    } catch (error) {
        console.warn('Error reading settings from localStorage', error);
    }
    return {
        typewriterEffect: false,
        stepsVariant: 'glow',
    };
};

const defaultSettings: AppSettings = {
    typewriterEffect: true,
    stepsVariant: 'glow',
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettingsState] = useState<AppSettings>(getInitialState);

    // Persist settings to localStorage whenever they change
    useEffect(() => {
        try {
            window.localStorage.setItem('app-settings', JSON.stringify(settings));
        } catch (error) {
            console.warn('Error saving settings to localStorage', error);
        }
    }, [settings]);

    // Create a single function to update settings
    const setSettings = (newSettings: Partial<AppSettings>) => {
        setSettingsState((prevSettings) => ({
            ...prevSettings,
            ...newSettings,
        }));
    };

    const value = { settings, setSettings };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

// Custom hook for easy access to the context
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};