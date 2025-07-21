import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {Document} from 'flexsearch';
import {ContentPage, NavigationItem} from '../types/content';

type IndexablePage = ContentPage & { [key: string]: any };

type SearchResult = {
  field: string;
  result: number[];
}

interface ContentContextType {
  pages: ContentPage[];
  versions: string[];
  loading: boolean;
  error: string | null;
  getPageBySlug: (version: string, slug: string) => ContentPage | undefined;
  getNavigationTree: (version: string) => NavigationItem[];
  search: (query: string) => ContentPage[];
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [searchIndex, setSearchIndex] = useState<Document<IndexablePage> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the base URL from Vite's environment variables
        const baseUrl = import.meta.env.BASE_URL;

        // First try to fetch the content-meta.json file
        const metaResponse = await fetch(`${baseUrl}/content-meta.json`);
        if (!metaResponse.ok) {
          throw new Error(`Failed to load content metadata: ${metaResponse.status} ${metaResponse.statusText}`);
        }

        const metaData: ContentPage[] = await metaResponse.json();

        // Try to fetch the full content file
        let fullData: ContentPage[] = [];
        try {
          const fullResponse = await fetch(`${baseUrl}/content-full.json`);
          if (fullResponse.ok) {
            fullData = await fullResponse.json();
          } else {
            console.warn('Full content not available, using metadata only');
          }
        } catch (fullError) {
          console.warn('Could not load full content:', fullError);
        }

        // Try to fetch search index
        let searchIndexData = null;
        try {
          const searchIndexResponse = await fetch(`${baseUrl}/search-index.json`);
          if (searchIndexResponse.ok) {
            searchIndexData = await searchIndexResponse.json();
          } else {
            console.warn('Search index not available');
          }
        } catch (searchError) {
          console.warn('Could not load search index:', searchError);
        }

        // Merge metadata with full content
        const pagesData = metaData.map(meta => {
          const full = fullData.find(f => f.id === meta.id);
          return { ...meta, content: full?.content || '' };
        });

        // Set up search index if available
        if (searchIndexData) {
          const index = new Document<IndexablePage>({
            document: {
              id: 'id',
              index: ['title', 'description', 'content'],
              store: ['id', 'title', 'description', 'version', 'slug'],
            },
            tokenize: 'forward',
          });

          try {
            Object.entries(searchIndexData).forEach(([key, data]) => {
              index.import(key, data as string);
            });
            setSearchIndex(index);
          } catch (indexError) {
            console.warn('Could not set up search index:', indexError);
          }
        }

        setPages(pagesData);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        console.error('Error loading content:', e);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const versions = useMemo(() => {
    const versionSet = new Set(pages.map(p => p.version));
    return Array.from(versionSet).sort((a, b) => b.localeCompare(a, undefined, {numeric: true}));
  }, [pages]);

  const getPageBySlug = (version: string, slug: string): ContentPage | undefined => {
    return pages.find(p => p.version === version && p.slug === slug);
  };

  const getNavigationTree = (version: string): NavigationItem[] => {
    const versionPages = pages.filter(p => p.version === version);
    const categories = new Map<string, ContentPage[]>();

    versionPages.forEach(page => {
      const category = page.category || 'General';
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push(page);
    });

    const tree: NavigationItem[] = [];
    categories.forEach((catPages, categoryName) => {
      catPages.sort((a, b) => (a.navOrder || 99) - (b.navOrder || 99));

      tree.push({
        title: categoryName,
        children: catPages.map(p => ({
          title: p.title,
          slug: p.slug,
        })),
      });
    });

    tree.sort((a, b) => a.title.localeCompare(b.title));

    return tree;
  };

  const search = (query: string): ContentPage[] => {
    if (!query || !searchIndex) return [];

    try {
      const searchResults = searchIndex.search(query, {
        limit: 10,
      }) as SearchResult[];

      const uniqueIds = new Set<number>();
      searchResults.forEach(res => {
        res.result.forEach(id => uniqueIds.add(id));
      });

      return Array.from(uniqueIds)
          .map(id => pages.find(p => p.id === id))
          .filter((p): p is ContentPage => !!p);
    } catch (searchError) {
      console.warn('Search error:', searchError);
      return [];
    }
  };

  const value = {
    pages,
    versions,
    loading,
    error,
    getPageBySlug,
    getNavigationTree,
    search,
  };

  return (
      <ContentContext.Provider value={value}>
        {children}
      </ContentContext.Provider>
  );
};