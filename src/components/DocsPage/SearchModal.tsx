import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
  Spinner,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useContent } from '../../contexts/ContentContext.tsx';
import { useNavigate } from 'react-router-dom';
import { ContentPage } from '../../types/content.ts';

// Custom hook for debouncing a value
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const SearchModal: React.FC = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<ContentPage[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const { search, loading } = useContent();
  const navigate = useNavigate();
  const debouncedSearchQuery = useDebounce(searchQuery, 200);
  const resultRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Effect for handling global keydown to open the modal (Cmd+K / Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpen();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onOpen]);

  // Effect to perform the search when debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery.length > 1) {
      setResults(search(debouncedSearchQuery));
    } else {
      setResults([]);
    }
    setActiveIndex(0); // Reset selection on new search
  }, [debouncedSearchQuery, search]);

  // Group results by category for a structured view
  const groupedResults = useMemo(() => {
    const groups = new Map<string, ContentPage[]>();
    results.forEach((page) => {
      const category = page.category || 'General';
      if (!groups.has(category)) {
        groups.set(category, []);
      }
      groups.get(category)!.push(page);
    });
    return groups;
  }, [results]);

  // Flattened results for easy indexing with keyboard navigation
  const flatResults = useMemo(() => Array.from(groupedResults.values()).flat(), [groupedResults]);

  // Effect to automatically scroll the active item into view
  useEffect(() => {
    resultRefs.current[activeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [activeIndex]);

  const handlePageSelect = useCallback((page: ContentPage) => {
    navigate(`/docs/${page.version}/${page.slug}`);
    onClose();
  }, [navigate, onClose]);

  // Effect for keyboard navigation within the results list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (flatResults.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % flatResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selectedPage = flatResults[activeIndex];
        if (selectedPage) {
          handlePageSelect(selectedPage);
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, flatResults, handlePageSelect]);


  const onModalClose = () => {
    setSearchQuery('');
    setResults([]);
    setActiveIndex(0);
  };

  const renderItem = (page: ContentPage, index: number) => {
    const isSelected = index === activeIndex;
    return (
        <div
            key={`${page.version}-${page.slug}`}
            ref={(el) => {
              resultRefs.current[index] = el;
            }}
            role="button"
            tabIndex={-1}
            onClick={() => handlePageSelect(page)}
            onMouseMove={() => setActiveIndex(index)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-150 ease-in-out ${
                isSelected ? 'bg-primary/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
        >
          <div className="flex items-center gap-4">
            <div className={`flex-shrink-0 p-2 rounded-md ${ isSelected ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-500 dark:bg-gray-700/50 dark:text-gray-400'}`}>
              <Icon icon="heroicons:document-text" width={20} height={20} />
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${isSelected ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{page.title}</h3>
              {page.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{page.description}</p>
              )}
            </div>
          </div>
          <span className="text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-md ml-4 flex-shrink-0">
            {page.version}
          </span>
        </div>
    );
  };

  return (
      <>
        <Button
            variant="bordered"
            startContent={<Icon icon="heroicons:magnifying-glass" className="text-gray-500" />}
            onPress={onOpen}
            className="w-full sm:w-64 justify-between text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:border-gray-400 hover:text-gray-800 dark:hover:border-gray-500 dark:hover:text-white"
        >
          Search...
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono text-xs text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <span>⌘</span>
            <span>K</span>
          </kbd>
        </Button>

        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onModalClose}
            size="2xl"
            scrollBehavior="inside"
            backdrop="blur"
            placement="top-center"
            classNames={{
              base: "mt-12 mx-4 sm:mx-0",
              body: "bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50",
              header: "border-b border-gray-200 dark:border-gray-800",
              footer: "border-t border-gray-200 dark:border-gray-800",
            }}
        >
          <ModalContent>
            <ModalHeader>
              <Input
                  autoFocus
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  startContent={<Icon icon="heroicons:magnifying-glass" className="text-gray-500" />}
                  endContent={
                      searchQuery && <Button isIconOnly variant="light" size="sm" onPress={() => setSearchQuery('')}><Icon icon="heroicons:x-mark" /></Button>
                  }
                  variant="underlined"
                  classNames={{ inputWrapper: "bg-transparent shadow-none" }}
              />
            </ModalHeader>
            <ModalBody className="p-2 sm:p-3 max-h-[60vh]">
              {loading && <div className="flex justify-center items-center h-48"><Spinner label="Searching..." /></div>}

              {!loading && debouncedSearchQuery.length > 1 && results.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500 h-48">
                    <Icon icon="heroicons:newspaper" width={48} height={48} className="mb-4 text-gray-400 dark:text-gray-600"/>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">No results found</h3>
                    <p>We couldn't find any results for "{searchQuery}"</p>
                  </div>
              )}

              {!loading && results.length === 0 && debouncedSearchQuery.length <= 1 && (
                  <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500 h-48">
                    <Icon icon="heroicons:magnifying-glass" width={48} height={48} className="mb-4 text-gray-400 dark:text-gray-600"/>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Search the docs</h3>
                    <p>Find components, hooks, guides, and more.</p>
                  </div>
              )}

              {!loading && results.length > 0 && (
                  <div className="space-y-2">
                    {Array.from(groupedResults.entries()).map(([category, pages]) => (
                        <div key={category}>
                          <h4 className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {category}
                          </h4>
                          <div className="space-y-1">
                            {pages.map((page) => {
                              const flatIndex = flatResults.findIndex(p => p.id === page.id);
                              return renderItem(page, flatIndex);
                            })}
                          </div>
                        </div>
                    ))}
                  </div>
              )}
            </ModalBody>
            <ModalFooter>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <kbd className="flex items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono dark:border-gray-700 dark:bg-gray-800">↑</kbd>
                <kbd className="flex items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono dark:border-gray-700 dark:bg-gray-800">↓</kbd>
                <span>to navigate</span>
                <kbd className="flex items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono dark:border-gray-700 dark:bg-gray-800">↵</kbd>
                <span>to select</span>
                <kbd className="flex items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono dark:border-gray-700 dark:bg-gray-800">esc</kbd>
                <span>to close</span>
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  );
};

export default SearchModal;