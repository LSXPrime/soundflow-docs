import React, {Children} from 'react';
import {Card, CardBody, Code, Link, Divider} from '@heroui/react';
import CodeBlock from '../Shared/CodeBlock.tsx';

export const mdxComponents = {
    h1: (props: any) => (
        <h1
            id={Children.toArray(props.children).join('').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
            className="text-4xl font-bold text-foreground mb-8 mt-12 first:mt-0 scroll-mt-24"
            {...props}
        />
    ),
    h2: (props: any) => (
        <h2
            id={Children.toArray(props.children).join('').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
            className="text-3xl font-semibold text-foreground mb-6 mt-10 first:mt-0 scroll-mt-24 border-b border-divider pb-3"
            {...props}
        />
    ),
    h3: (props: any) => (
        <h3
            id={Children.toArray(props.children).join('').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
            className="text-2xl font-semibold text-foreground mb-4 mt-8 first:mt-0 scroll-mt-24"
            {...props}
        />
    ),
    p: (props: any) => <p className="text-foreground leading-relaxed text-base" {...props} />,
    a: (props: any) => (
        <Link
            href={props.href}
            className="text-primary hover:text-primary-600 font-medium underline decoration-primary underline-offset-2"
            {...props}
        />
    ),
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

                        return (
                            <CodeBlock code={codeElement.props.children} language={language} />
                        );
                    }
                    return (
                        <CodeBlock code={props.children} language="text" />
                    );
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
};