import React, { useEffect, useState, useId, useRef, useCallback } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '../../contexts/ThemeContext.tsx';
import { Spinner, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

interface MermaidDiagramProps {
    chart: string;
}

/**
 * A dedicated UI component for diagram navigation controls.
 * Renders buttons for zooming and resetting the transform.
 */
const DiagramControls = ({ zoomIn, zoomOut, resetTransform }: {
    zoomIn: () => void;
    zoomOut: () => void;
    resetTransform: () => void;
}) => (
    <div className="absolute top-2 right-2 z-10 flex gap-1 rounded-lg bg-black/10 p-1 backdrop-blur-sm">
        <Button isIconOnly size="sm" variant="light" onPress={zoomIn} aria-label="Zoom In">
            <Icon icon="lucide:zoom-in" className="w-5 h-5" />
        </Button>
        <Button isIconOnly size="sm" variant="light" onPress={zoomOut} aria-label="Zoom Out">
            <Icon icon="lucide:zoom-out" className="w-5 h-5" />
        </Button>
        <Button isIconOnly size="sm" variant="light" onPress={resetTransform} aria-label="Reset View">
            <Icon icon="lucide:expand" className="w-5 h-5" />
        </Button>
    </div>
);

/**
 * Renders a Mermaid diagram string as a responsive, pannable, and zoomable SVG.
 */
const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
    const { theme } = useTheme();
    const [svg, setSvg] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);
    const id = `mermaid-svg-${useId()}`;

    // State and refs for pan/zoom functionality
    const [transform, setTransform] = useState({ scale: 1, translateX: 0, translateY: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const panStart = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Interaction Logic ---

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        panStart.current = {
            x: event.clientX - transform.translateX,
            y: event.clientY - transform.translateY,
        };
        setIsPanning(true);
    };

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (!isPanning) return;
        const newTranslateX = event.clientX - panStart.current.x;
        const newTranslateY = event.clientY - panStart.current.y;
        setTransform(prev => ({ ...prev, translateX: newTranslateX, translateY: newTranslateY }));
    }, [isPanning]);

    const handleMouseUp = useCallback(() => {
        setIsPanning(false);
    }, []);

    // Effect to attach global mouse listeners during a pan operation for smooth dragging
    useEffect(() => {
        if (isPanning) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isPanning, handleMouseMove, handleMouseUp]);

    // Effect to handle wheel events for zooming, attached directly for non-passive behavior
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault(); // Prevents page scroll

            const zoomFactor = 1.1;
            const newScale = event.deltaY < 0 ? transform.scale * zoomFactor : transform.scale / zoomFactor;
            const clampedScale = Math.max(0.1, Math.min(newScale, 10));

            const rect = container.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const newTranslateX = mouseX - (mouseX - transform.translateX) * (clampedScale / transform.scale);
            const newTranslateY = mouseY - (mouseY - transform.translateY) * (clampedScale / transform.scale);

            setTransform({ scale: clampedScale, translateX: newTranslateX, translateY: newTranslateY });
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [transform]);

    const zoomIn = useCallback(() => setTransform(prev => ({ ...prev, scale: Math.min(prev.scale * 1.5, 10) })), []);
    const zoomOut = useCallback(() => setTransform(prev => ({ ...prev, scale: Math.max(prev.scale / 1.5, 0.1) })), []);
    const resetTransform = useCallback(() => setTransform({ scale: 1, translateX: 0, translateY: 0 }), []);

    // --- Rendering and Responsiveness Logic ---

    // Effect to re-render the SVG when the chart string or theme changes
    useEffect(() => {
        resetTransform();
        setSvg(null); setError(null); setAspectRatio(null);
        mermaid.initialize({ startOnLoad: false, theme: theme === 'dark' ? 'dark' : 'default', securityLevel: 'loose' });

        const renderDiagram = async () => {
            try {
                const { svg: renderedSvg } = await mermaid.render(id, chart);

                // Parse viewBox to calculate and set the SVG's intrinsic aspect ratio
                const viewBoxMatch = renderedSvg.match(/viewBox="0 0 ([0-9.]+) ([0-9.]+)"/);
                if (viewBoxMatch && viewBoxMatch[1] && viewBoxMatch[2]) {
                    const width = parseFloat(viewBoxMatch[1]);
                    const height = parseFloat(viewBoxMatch[2]);
                    if (height > 0) setAspectRatio(width / height);
                }

                // Strip fixed dimensions to make the SVG fluid within its container
                const responsiveSvg = renderedSvg.replace(/width="[^"]*"/, '').replace(/height="[^"]*"/, '');
                setSvg(responsiveSvg);

            } catch (e: any) {
                setError(e.message || "An error occurred while rendering the diagram.");
            }
        };
        renderDiagram();
    }, [chart, theme, id, resetTransform]);

    // Effect to reset the diagram's position when the window is resized
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(resetTransform, 100); // Debounced for performance
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [resetTransform]);

    return (
        <div
            ref={containerRef}
            className={clsx(
                "relative my-6 rounded-lg bg-white/50 dark:bg-black/20 w-full overflow-hidden border border-black/10 dark:border-white/10 select-none",
                isPanning ? 'cursor-grabbing' : 'cursor-grab'
            )}
            style={{
                minHeight: '200px',
                maxHeight: '80vh',
                aspectRatio: aspectRatio ? `${aspectRatio}` : '16 / 9', // Maintain shape
            }}
            onMouseDown={handleMouseDown}
        >
            {!svg && !error && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner label="Rendering diagram..."/>
                </div>
            )}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center text-red-500 p-4">
                    <p>Error: {error}</p>
                </div>
            )}
            {svg && !error && (
                <>
                    <DiagramControls zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />
                    <div
                        style={{
                            transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`,
                            transition: isPanning ? 'none' : 'transform 0.1s ease-out',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <div
                            className="mermaid-svg-container"
                            dangerouslySetInnerHTML={{ __html: svg }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default MermaidDiagram;