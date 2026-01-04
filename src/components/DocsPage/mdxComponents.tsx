import React from 'react';
import { Card, CardBody, Code, Link, Divider } from '@heroui/react';
import CodeBlock from '../Shared/CodeBlock.tsx';
import MermaidDiagram from "../Shared/MermaidDiagram.tsx";

// Recursively extract text from React children
const extractText = (children: React.ReactNode): string => {
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return children.toString();
    if (Array.isArray(children)) return children.map(extractText).join('');
    if (React.isValidElement(children) && children.props.children) {
        return extractText(children.props.children);
    }
    return '';
};

// Generate a clean ID (slug)
const generateId = (children: React.ReactNode) => {
    const text = extractText(children);
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/(^-|-$)/g, '');    // Trim hyphens from start/end
};

export const mdxComponents = {
    h1: (props: any) => (
        <h1
            id={generateId(props.children)}
            className="text-4xl font-bold text-foreground mb-8 mt-12 first:mt-0 scroll-mt-24"
            {...props}
        />
    ),
    h2: (props: any) => (
        <h2
            id={generateId(props.children)}
            className="text-3xl font-semibold text-foreground mb-6 mt-10 first:mt-0 scroll-mt-24 border-b border-divider pb-3"
            {...props}
        />
    ),
    h3: (props: any) => (
        <h3
            id={generateId(props.children)}
            className="text-2xl font-semibold text-foreground mb-4 mt-8 first:mt-0 scroll-mt-24"
            {...props}
        />
    ),
    p: (props: any) => <p className="text-foreground leading-relaxed text-base mb-6 whitespace-pre-line" {...props} />,
    a: (props: any) => {
        const { href, children, ...rest } = props;

        // Intercept internal hash links to make them work with HashRouter
        if (href && href.startsWith('#')) {
            const handleClick = (e: React.MouseEvent) => {
                e.preventDefault();

                // Extract ID (remove the #)
                const id = href.substring(1);
                const element = document.getElementById(id);

                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Update URL hash without triggering router
                    history.pushState(null, '', href);
                } else {
                    console.warn(`Element with id "${id}" not found. Generated IDs might not match link.`);
                }
            };

            return (
                <a
                    href={href}
                    onClick={handleClick}
                    className="text-primary hover:text-primary-600 font-medium underline decoration-primary underline-offset-2 cursor-pointer"
                    {...rest}
                >
                    {children}
                </a>
            );
        }

        // Default behavior for external links or actual routes
        return (
            <Link
                href={href}
                className="text-primary hover:text-primary-600 font-medium underline decoration-primary underline-offset-2"
                {...rest}
            >
                {children}
            </Link>
        );
    },
    ul: (props: any) => <ul className="list-disc ml-6 mb-6 space-y-2 text-foreground" {...props} />,
    ol: (props: any) => <ol className="list-decimal ml-6 mb-6 space-y-2 text-foreground" {...props} />,
    li: (props: any) => <li className="leading-relaxed" {...props} />,
    blockquote: (props: any) => (
        <Card className="border-l-4 border-l-primary bg-primary/10 mb-6 shadow-sm">
            <CardBody className="p-6">
                <div className="text-foreground italic" {...props} />
            </CardBody>
        </Card>
    ),
    pre: (props: any) => {
        return (
            <div className="overflow-x-auto mb-6">
                {(() => {
                    if (
                        React.isValidElement(props.children) &&
                        props.children.type.name === 'code'
                    ) {
                        const codeElement = props.children;
                        const codeClassName = codeElement.props.className || '';
                        const language = codeClassName.replace('language-', '') || 'text';
                        const code = codeElement.props.children;

                        // 2. Check if the language is 'mermaid'
                        if (language === 'mermaid') {
                            return <MermaidDiagram chart={code} />;
                        }

                        // Fallback to the original CodeBlock for all other languages
                        return <CodeBlock code={code} language={language} />;
                    }
                    // Fallback for code without a language specified
                    return <CodeBlock code={props.children} language="text" />;
                })()}
            </div>
        );
    },
    code: (props: any) => {
        if (props.className?.includes('language-')) {
            return (
                <CodeBlock code={props.children} language={props.className.replace('language-', '')} />
            );
        }
        return (
            <Code
                size="sm"
                className="bg-content2 text-foreground px-1.5 py-0.5 rounded-md font-mono text-sm"
                {...props}
            />
        );
    },
    hr: () => <Divider className="my-8"/>,
    table: (props: any) => (
        <div className="w-full overflow-x-auto mb-8 rounded-lg border border-divider">
            <table className="w-full border-collapse text-left text-sm" {...props} />
        </div>
    ),
    thead: (props: any) => (
        <thead className="bg-content2 text-foreground font-semibold border-b border-divider" {...props} />
    ),
    tbody: (props: any) => (
        <tbody className="divide-y divide-divider" {...props} />
    ),
    tr: (props: any) => (
        <tr className="hover:bg-content2/50 transition-colors" {...props} />
    ),
    th: (props: any) => (
        <th className="px-4 py-3 font-semibold" {...props} />
    ),
    td: (props: any) => (
        <td className="px-4 py-3 text-foreground/80" {...props} />
    ),
};