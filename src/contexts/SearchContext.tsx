
import { createContext, useContext, useState, useCallback } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  totalMatches: number;
  setTotalMatches: (count: number) => void;
  currentResultIndex: number;
  setCurrentResultIndex: (index: number) => void;
  totalResults: number;
  setTotalResults: (count: number) => void;
  navigateToNext: () => void;
  navigateToPrevious: () => void;
  navigateToNextResult: () => void;
  navigateToPreviousResult: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const navigateToNext = useCallback(() => {
    if (totalMatches > 0) {
      setHighlightedIndex((prev) => (prev + 1) % totalMatches);
    }
  }, [totalMatches]);

  const navigateToPrevious = useCallback(() => {
    if (totalMatches > 0) {
      setHighlightedIndex((prev) => (prev - 1 + totalMatches) % totalMatches);
    }
  }, [totalMatches]);

  const navigateToNextResult = useCallback(() => {
    if (totalResults > 0) {
      setCurrentResultIndex((prev) => (prev + 1) % totalResults);
    }
  }, [totalResults]);

  const navigateToPreviousResult = useCallback(() => {
    if (totalResults > 0) {
      setCurrentResultIndex((prev) => (prev - 1 + totalResults) % totalResults);
    }
  }, [totalResults]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        highlightedIndex,
        setHighlightedIndex,
        totalMatches,
        setTotalMatches,
        currentResultIndex,
        setCurrentResultIndex,
        totalResults,
        setTotalResults,
        navigateToNext,
        navigateToPrevious,
        navigateToNextResult,
        navigateToPreviousResult,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
