import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from './mdxComponents.tsx';

interface MDXRendererProps {
    children: React.ReactNode;
}

const MDXRenderer: React.FC<MDXRendererProps> = ({ children }) => {
    return (
        // Pass the imported components to the provider
        <MDXProvider components={mdxComponents}>
            <div>
                {children}
            </div>
        </MDXProvider>
    );
};

export default MDXRenderer;