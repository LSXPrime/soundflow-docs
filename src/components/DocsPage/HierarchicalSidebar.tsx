import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useContent } from '../../contexts/ContentContext.tsx';
import { NavigationItem } from '../../types/content.ts';
import { Button } from "@heroui/react";

interface HierarchicalSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isMinimized: boolean;
    setIsMinimized: (value: boolean) => void;
}

const HierarchicalSidebar: React.FC<HierarchicalSidebarProps> = ({ isOpen, onClose, isMinimized, setIsMinimized }) => {
    const { version } = useParams<{ version: string }>();
    const location = useLocation();
    const { getNavigationTree } = useContent();

    const navigationTree = useMemo(() => {
        return getNavigationTree(version || 'v1.0');
    }, [version, getNavigationTree]);

    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        // By default, expand all main categories
        setExpandedItems(new Set(navigationTree.map(item => item.title.toLowerCase())));
    }, [navigationTree]);

    useEffect(() => {
        // Close mobile sidebar on navigation
        if (isOpen) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const toggleExpanded = (key: string) => {
        setExpandedItems(prev => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(key)) {
                newExpanded.delete(key);
            } else {
                newExpanded.add(key);
            }
            return newExpanded;
        });
    };

    const isCurrentPage = (slug?: string) => {
        if (!slug) return false;
        return location.pathname === `/docs/${version}/${slug}`;
    };

    const renderNavigationItem = (item: NavigationItem) => {
        const isCategory = !!item.children?.length;
        if (!isCategory) return null;

        const isExpanded = expandedItems.has(item.title.toLowerCase());
        return (
            <div key={item.title}>
                <Button
                    onPress={() => toggleExpanded(item.title.toLowerCase())}
                    className="flex items-center justify-between w-full py-2 mt-4"
                    variant='light'
                >
                    <span className="text-sm font-bold text-default-500 uppercase tracking-wider">
                      {item.title}
                    </span>
                    <span className="text-default-400">
                      <Icon icon={isExpanded ? "heroicons:chevron-down" : "heroicons:chevron-right"} className="w-4 h-4" />
                    </span>
                </Button>
                {isExpanded && (
                    <div className="mt-2 space-y-1 border-l border-divider">
                        {item.children!.map((child) => (
                            <Link
                                key={child.slug}
                                to={`/docs/${version}/${child.slug}`}
                                className={`flex items-center w-full pl-4 pr-3 py-2 -ml-px border-l text-sm transition-colors duration-200 ${
                                    isCurrentPage(child.slug)
                                        ? 'border-primary text-primary font-medium'
                                        : 'border-divider text-default-600 hover:border-default-400 hover:text-foreground'
                                }`}
                            >
                                {child.title}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Overlay for mobile view */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    aria-hidden="true"
                />
            )}

            <aside
                className={`
                    flex-shrink-0 overflow-y-auto z-50
                    transition-all duration-300 ease-in-out
                    
                    // Base styles for mobile and default desktop
                    w-72 bg-content1 border-r border-divider
                    
                    // Mobile-specific positioning
                    fixed inset-y-0 left-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    
                    // Desktop-specific positioning
                    lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
                    
                    // Minimized state on desktop: shrink and become transparent
                    ${isMinimized ? 'lg:w-20 lg:bg-transparent lg:border-transparent' : 'lg:w-72'}
                `}
            >
                {/* Minimize/Expand button for desktop */}
                <Button
                    isIconOnly
                    variant="light"
                    onPress={() => setIsMinimized(!isMinimized)}
                    className={`
                        hidden lg:flex absolute top-1/2  ${isMinimized ? 'right-10' : 'right-0.5'} z-20
                        items-center justify-center
                        w-10 h-10 rounded-full shadow-xl
                        bg-content1 hover:bg-content2
                        border-2 border-divider
                        transform -translate-y-1/2 translate-x-1/2
                    `}
                    aria-label={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
                >
                    <Icon
                        icon={isMinimized ? "heroicons:chevron-double-right-20-solid" : "heroicons:chevron-double-left-20-solid"}
                        className="w-6 h-6 text-default-600"
                        fontSize={20}
                    />
                </Button>

                {/* Sidebar Content */}
                <div className={`p-6 h-full transition-opacity duration-300 ${isMinimized ? 'lg:opacity-0 lg:pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex items-center justify-between mb-8">
                        {/* Title Section */}
                        <Link to={`/docs/${version}`} className="flex items-center gap-2">
                            <Icon icon="heroicons:book-open-solid" className="w-7 h-7 text-primary" />
                            <span className="text-xl font-bold">Documentation</span>
                        </Link>

                        {/* Mobile Close Button */}
                        <div className="lg:hidden">
                            <Button isIconOnly variant="light" onPress={onClose} aria-label="Close navigation">
                                <Icon icon="heroicons:x-mark" className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {navigationTree.map((item) => renderNavigationItem(item))}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default HierarchicalSidebar;