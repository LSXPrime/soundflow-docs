import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Card, CardBody, Spinner, Button } from '@heroui/react';
import { useContent } from '../contexts/ContentContext';
import HierarchicalSidebar from '../components/DocsPage/HierarchicalSidebar.tsx';
import MDXRenderer from '../components/DocsPage/MDXRenderer.tsx';
import TableOfContents from '../components/DocsPage/TableOfContents.tsx';
import NotFoundPage from './NotFoundPage';
import { mdxComponents } from '../components/DocsPage/mdxComponents.tsx';
import { Icon } from '@iconify/react';

// Import all MDX files dynamically
const mdxModules = import.meta.glob('/content/**/*.mdx');

const DocsPage: React.FC = () => {
    const { version, '*': slug } = useParams<{ version: string; '*': string }>();
    const { getPageBySlug, loading, error, versions, pages } = useContent();

    // State to manage sidebar and ToC and Go to Top visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile overlay
    const [isTocOpen, setIsTocOpen] = useState(false); // For mobile TOC
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false); // For desktop minimize
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Effect to handle scroll event for the "Go to Top" button
    useEffect(() => {
        const checkScroll = () => {
            // Show button if user has scrolled down more than 300px
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', checkScroll);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    // Function to scroll to the top of the page smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Get the first page for a version
    const getFirstPageForVersion = (ver: string) => {
        const versionPages = pages.filter(p => p.version === ver);
        if (versionPages.length === 0) return null;

        // Sort by navOrder and return the first one
        versionPages.sort((a, b) => (a.navOrder || 99) - (b.navOrder || 99));
        return versionPages[0];
    };

    // Memoize the page lookup
    const page = useMemo(() => {
        // If version is "latest", we skip lookup here and let the logic below handle it
        if (!version || !slug || version === 'latest') return undefined;
        return getPageBySlug(version, slug);
    }, [version, slug, getPageBySlug]);

    const mdxPath = useMemo(() => {
        if (!page) return null;
        return `/content/${page.version}/${page.slug}.mdx`;
    }, [page]);

    const MdxComponent = useMemo(() => {
        if (!mdxPath) return null;
        if (mdxPath in mdxModules) {
            return React.lazy(mdxModules[mdxPath] as () => Promise<{ default: React.ComponentType<any> }>);
        }
        return null;
    }, [mdxPath]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-70px)] bg-background">
                <Spinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-70px)] bg-background">
                <Card className="max-w-md">
                    <CardBody>
                        <p className="text-danger text-center">Error loading documentation: {error}</p>
                    </CardBody>
                </Card>
            </div>
        );
    }

    // Handle "latest" alias with smart fallback
    if (version === 'latest') {
        // 1. If user visited /docs/latest (no slug), go to the root of the actual latest version
        if (!slug) {
            const latestVersion = versions[0];
            if (latestVersion) {
                const firstPage = getFirstPageForVersion(latestVersion);
                const targetSlug = firstPage?.slug || 'introduction';
                return <Navigate to={`/docs/${latestVersion}/${targetSlug}`} replace />;
            }
            return <NotFoundPage />;
        }

        // 2. Smart Fallback: Find the newest version that actually contains this slug
        // 'versions' is already sorted descending in ContentContext (e.g., v1.3.0, v1.2.0...)
        const foundVersion = versions.find((v) => getPageBySlug(v, slug));

        if (foundVersion) {
            // Redirect to the specific version where the page exists
            return <Navigate to={`/docs/${foundVersion}/${slug}`} replace />;
        }

        // 3. If slug not found in ANY version
        return <NotFoundPage />;
    }

    // Standard Redirect: Handle /docs or /docs/v1.3.0 (missing slug)
    if (!version || !slug) {
        const latestVersion = versions[0] || 'v1.3.0';
        const firstPage = getFirstPageForVersion(latestVersion);
        const defaultSlug = firstPage?.slug || 'introduction';
        return <Navigate to={`/docs/${latestVersion}/${defaultSlug}`} replace />;
    }

    if (!page) {
        const firstPage = getFirstPageForVersion(version);
        if (firstPage) {
            return <Navigate to={`/docs/${version}/${firstPage.slug}`} replace />;
        }
        return <NotFoundPage />;
    }

    if (!MdxComponent) {
        return <NotFoundPage />;
    }

    return (
        <div className="flex min-h-[calc(100vh-70px)] bg-background">

            {/* Pass state and handlers to the sidebar */}
            <HierarchicalSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                isMinimized={isSidebarMinimized}
                setIsMinimized={setIsSidebarMinimized}
            />

            <div className="flex-1 flex justify-center pt-20">
                <main className={`flex-1 ${isSidebarMinimized ? 'lg:max-w-7xl' : 'max-w-4xl'} px-4 sm:px-8 py-12 lg:px-12 transition-[max-width] duration-300 ease-in-out`}>
                    <header className="mb-12">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                            {page.title}
                        </h1>
                        {page.description && (
                            <p className="text-lg sm:text-xl text-default-600">
                                {page.description}
                            </p>
                        )}
                    </header>

                    <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner size="lg" /></div>}>
                        <MDXRenderer>
                            <MdxComponent components={mdxComponents} />
                        </MDXRenderer>
                    </Suspense>
                </main>

                {/* Desktop Table of Contents */}
                <aside className="hidden xl:block w-80 p-8 flex-shrink-0">
                    {/* TOC sticky and scrollable if content overflows */}
                    <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
                        <TableOfContents content={page.content || ''} />
                    </div>
                </aside>
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
                {/* Go To Top button - visible on all screens when scrolled */}
                {showScrollTop && (
                    <Button
                        isIconOnly
                        radius="full"
                        color="primary"
                        variant="solid"
                        onPress={scrollToTop}
                        aria-label="Go to top of page"
                        className="shadow-lg"
                    >
                        <Icon icon="material-symbols:arrow-upward" className="w-6 h-6" />
                    </Button>
                )}

                {/* Mobile/Tablet specific buttons */}
                <Button
                    isIconOnly
                    radius="full"
                    color="primary"
                    variant="solid"
                    onPress={() => setIsTocOpen(true)}
                    aria-label="Open Table of Contents"
                    className="shadow-lg xl:hidden"
                >
                    <Icon icon='material-symbols:menu-book-outline' className="w-6 h-6" />
                </Button>
                <Button
                    isIconOnly
                    radius="full"
                    color="primary"
                    variant="solid"
                    onPress={() => setIsSidebarOpen(!isSidebarOpen)}
                    aria-label="Toggle Navigation Menu"
                    className="shadow-lg xl:hidden"
                >
                    <Icon icon='material-symbols:format-list-bulleted-rounded' className="w-6 h-6" />
                </Button>
            </div>

            {/* Mobile Table of Contents Drawer/Modal */}
            {isTocOpen && (
                <div
                    className="xl:hidden fixed inset-0 z-50 flex justify-end"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsTocOpen(false)}
                    ></div>

                    {/* Content Panel */}
                    <div className="relative z-10 w-full max-w-xs bg-background p-6 shadow-xl flex flex-col transition-transform transform translate-x-0">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-foreground">Table of Contents</h3>
                            <Button
                                isIconOnly
                                variant="light"
                                size="sm"
                                onPress={() => setIsTocOpen(false)}
                                aria-label="Close Table of Contents"
                            >
                                <Icon icon="mdi:close" className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="overflow-y-auto">
                            <TableOfContents content={page.content || ''} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocsPage;