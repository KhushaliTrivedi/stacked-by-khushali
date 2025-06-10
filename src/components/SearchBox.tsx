import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/contexts/SearchContext";
import { useDocumentationData } from "@/hooks/useDocumentationData";
import { findAllMatchingTopics } from "@/utils/searchUtils";

interface SearchBoxProps {
  onNavigate: (sectionId: string, topicId: string) => void;
}

export const SearchBox = ({ onNavigate }: SearchBoxProps) => {
  const {
    searchQuery,
    setSearchQuery,
    currentResultIndex,
    setCurrentResultIndex,
    totalResults,
    setTotalResults,
    navigateToNextResult,
    navigateToPreviousResult,
    setHighlightedIndex
  } = useSearch();
  const { data } = useDocumentationData();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const allMatches = findAllMatchingTopics(data, query);
      setTotalResults(allMatches.length);
      setCurrentResultIndex(0);
      setHighlightedIndex(0);
      if (allMatches.length > 0) {
        onNavigate(allMatches[0].sectionId, allMatches[0].topicId);
      }
    } else {
      setTotalResults(0);
      setCurrentResultIndex(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!searchQuery.trim()) return;
    const allMatches = findAllMatchingTopics(data, searchQuery);
    if (e.key === 'Enter' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (allMatches.length > 0) {
        const nextIndex = (currentResultIndex + 1) % allMatches.length;
        setCurrentResultIndex(nextIndex);
        setHighlightedIndex(nextIndex);
        const nextMatch = allMatches[nextIndex];
        onNavigate(nextMatch.sectionId, nextMatch.topicId);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (allMatches.length > 0) {
        const prevIndex = (currentResultIndex - 1 + allMatches.length) % allMatches.length;
        setCurrentResultIndex(prevIndex);
        setHighlightedIndex(prevIndex);
        const prevMatch = allMatches[prevIndex];
        onNavigate(prevMatch.sectionId, prevMatch.topicId);
      }
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10"
        />
      </div>
      {searchQuery && totalResults > 0 && (
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">
            {currentResultIndex + 1} of {totalResults}
          </span>
          <button
            type="button"
            className="h-8 w-8 p-0 flex items-center justify-center border rounded bg-background hover:bg-muted"
            onClick={() => {
              const allMatches = findAllMatchingTopics(data, searchQuery);
              if (allMatches.length > 0) {
                const prevIndex = (currentResultIndex - 1 + allMatches.length) % allMatches.length;
                setCurrentResultIndex(prevIndex);
                setHighlightedIndex(prevIndex);
                const prevMatch = allMatches[prevIndex];
                onNavigate(prevMatch.sectionId, prevMatch.topicId);
              }
            }}
            aria-label="Previous match"
          >
            {/* Up chevron SVG */}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L10 7.5L15 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            type="button"
            className="h-8 w-8 p-0 flex items-center justify-center border rounded bg-background hover:bg-muted"
            onClick={() => {
              const allMatches = findAllMatchingTopics(data, searchQuery);
              if (allMatches.length > 0) {
                const nextIndex = (currentResultIndex + 1) % allMatches.length;
                setCurrentResultIndex(nextIndex);
                setHighlightedIndex(nextIndex);
                const nextMatch = allMatches[nextIndex];
                onNavigate(nextMatch.sectionId, nextMatch.topicId);
              }
            }}
            aria-label="Next match"
          >
            {/* Down chevron SVG */}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};
