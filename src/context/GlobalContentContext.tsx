"use client";

import { createContext, useContext, ReactNode } from 'react';

// Define types reflecting our DB schema
export interface SiteSettings {
    [key: string]: any; // Key-value pairs
}

export interface NavigationItem {
    id: string;
    label: string;
    url: string;
    sort_order: number;
    icon?: string;
    description?: string;
    children?: NavigationItem[];
}

export interface FooterSection {
    id: string;
    section_title: string;
    section_type: string;
    content: any;
}

interface GlobalContentContextType {
    settings: SiteSettings;
    navigation: NavigationItem[]; // Tree structure
    footer: FooterSection[];
}

const GlobalContentContext = createContext<GlobalContentContextType | undefined>(undefined);

export function GlobalContentProvider({
    children,
    settings,
    navigation,
    footer
}: {
    children: ReactNode;
    settings: SiteSettings;
    navigation: NavigationItem[];
    footer: FooterSection[];
}) {
    return (
        <GlobalContentContext.Provider value={{ settings, navigation, footer }}>
            {children}
        </GlobalContentContext.Provider>
    );
}

export function useGlobalContent() {
    const context = useContext(GlobalContentContext);
    if (context === undefined) {
        throw new Error('useGlobalContent must be used within a GlobalContentProvider');
    }
    return context;
}
