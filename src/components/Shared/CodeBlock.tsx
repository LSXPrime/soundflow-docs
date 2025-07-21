import React, {useState, useEffect, useMemo, useCallback, memo, useRef, useId, CSSProperties} from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import {useSettings} from "../../contexts/SettingsContext.tsx";

const useTheme = () => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
          setTheme(currentTheme);
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    return () => observer.disconnect();
  }, []);
  return theme;
};

const useTypewriter = (text: string, enabled: boolean, speed: number = 1) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(enabled);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const finishTyping = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setDisplayText(text);
    setIsTyping(false);
  }, [text]);

  useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    if (!enabled) {
      setDisplayText(text);
      setIsTyping(false);
      return;
    }

    setDisplayText('');
    setIsTyping(true);

    const intervalId = setInterval(() => {
      setDisplayText(currentDisplayText => {
        if (currentDisplayText.length === text.length) {
          clearInterval(intervalId);
          intervalIdRef.current = null;
          setIsTyping(false);
          return currentDisplayText;
        }
        return text.substring(0, currentDisplayText.length + 1);
      });
    }, speed);

    intervalIdRef.current = intervalId;

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [text, speed, enabled]);

  return { displayText, isTyping, finishTyping };
};


interface CodeSnippet {
  language: string;
  title: string;
  code: string;
}
type SingleSnippetProps = {
  code: string;
  language?: string;
  title?: string;
  codeSnippets?: never;
};
type MultiSnippetProps = {
  codeSnippets: CodeSnippet[];
  code?: never;
  language?: never;
  title?: never;
};
type ElegantCodeBlockProps = {
  typewriter?: boolean;
} & (SingleSnippetProps | MultiSnippetProps);


const CodeBlock: React.FC<ElegantCodeBlockProps> = memo(({
                                                           typewriter = false,
                                                           ...props
                                                         }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const theme = useTheme();
  const { settings } = useSettings();
  const layoutGroupId = useId();

  const snippets = useMemo<CodeSnippet[]>(() => {
    if (props.codeSnippets) {
      return props.codeSnippets.map(s => ({ ...s, code: String(s.code).trim() }));
    }
    const lang = props.language || 'text';
    return [{
      language: lang,
      title: props.title || lang.charAt(0).toUpperCase() + lang.slice(1),
      code: String(props.code).trim(),
    }];
  }, [props.codeSnippets, props.code, props.language, props.title]);

  const isMultiSnippet = snippets.length > 1;
  const activeSnippet = snippets[activeTab] || snippets[0];
  const isTypewriterEnabled = typewriter ? typewriter : settings.typewriterEffect;
  const { displayText: codeToDisplay, isTyping, finishTyping } = useTypewriter(activeSnippet.code, isTypewriterEnabled);

  const copyToClipboard = useCallback(async () => {
    if (isCopied) return;
    try {
      await navigator.clipboard.writeText(activeSnippet.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [activeSnippet.code, isCopied]);

  const syntaxHighlighterStyle : CSSProperties = {
    background: 'transparent',
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    fontSize: '14px',
    padding: '1.5rem',
    margin: 0,
    overflow: 'initial',
    textShadow: theme === 'dark' ? '0 0 5px rgba(192, 219, 255, 0.3)' : 'none',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  };

  return (
      <div className="group my-8" >
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={clsx(
                "aurora-background relative rounded-xl backdrop-blur-sm",
                // Light Mode styles
                "bg-slate-200 border border-slate-300 shadow-xl shadow-slate-900/15",
                // Dark Mode styles
                "dark:bg-black/20 dark:border-white/10 dark:shadow-2xl dark:shadow-purple-900/20"
            )}
        >
          {/* Adaptive Header */}
          <div className={clsx(
              "flex items-center justify-between px-4 py-3 rounded-t-xl",
              // Light Mode
              "border-b border-slate-300/70 bg-slate-100/70",
              // Dark Mode
              "dark:border-b-white/5 dark:bg-black/20"
          )}>
            <div className="flex items-center gap-4">
              {isMultiSnippet ? (
                  // Multi-Snippet Header (Tabs)
                  <LayoutGroup id={layoutGroupId}>
                    {snippets.map((snippet, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={clsx(
                                'relative px-1 py-1 text-xs font-medium transition-colors duration-200',
                                index === activeTab
                                    ? "text-gray-800 dark:text-white"
                                    : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                            )}
                        >
                          {snippet.title}
                          {index === activeTab && (
                              <motion.div
                                  layoutId="activeTabIndicator"
                                  className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-blue-500 dark:bg-purple-400"
                              />
                          )}
                        </button>
                    ))}
                  </LayoutGroup>
              ) : (
                  // Single-Snippet Header (Simple Title)
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{activeSnippet.title}</span>
              )}
            </div>

            {/* Action Buttons Container */}
            <div className="flex items-center gap-2">
              {/* Finish Typing Button (Conditional) */}
              <AnimatePresence>
                {isTypewriterEnabled && isTyping && (
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                      <button
                          onClick={finishTyping}
                          className={clsx(
                              "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-300",
                              // Light Mode
                              "text-gray-600 bg-black/5 hover:bg-green-500/10 hover:text-green-700 hover:shadow-lg hover:shadow-green-500/10",
                              // Dark Mode
                              "dark:text-gray-300 dark:bg-white/5 dark:hover:bg-green-500/20 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-green-500/20"
                          )}
                          aria-label="Finish typing"
                      >
                        <Icon icon="heroicons:forward" className="w-4 h-4" />
                        <span className="text-xs">Finish</span>
                      </button>
                    </motion.div>
                )}
              </AnimatePresence>

              {/* Copy Button */}
              <button
                  onClick={copyToClipboard}
                  className={clsx(
                      "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-300",
                      // Light Mode
                      "text-gray-600 bg-black/5 hover:bg-blue-500/10 hover:text-blue-700 hover:shadow-lg hover:shadow-blue-500/10",
                      // Dark Mode
                      "dark:text-gray-300 dark:bg-white/5 dark:hover:bg-purple-500/20 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-purple-500/20"
                  )}
                  aria-label="Copy code"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={isCopied ? 'check' : 'copy'} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}>
                    {isCopied ? <Icon icon="heroicons:check" className="w-4 h-4 text-green-500" /> : <Icon icon="heroicons:clipboard" className="w-4 h-4" />}
                  </motion.span>
                </AnimatePresence>
                <span className="text-xs">{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Code Area */}
          <div className="text-left scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-white/20 scrollbar-track-transparent">
            <SyntaxHighlighter
                language={activeSnippet.language}
                style={theme === 'dark' ? oneDark : oneLight}
                customStyle={syntaxHighlighterStyle}
                CodeTag={({ children }) => (
                    <code>
                      {children}
                      {isTyping && <span className="animate-pulse opacity-50">_</span>}
                    </code>
                )}
            >
              {codeToDisplay}
            </SyntaxHighlighter>
          </div>
        </motion.div>
      </div>
  );
});

export default CodeBlock;