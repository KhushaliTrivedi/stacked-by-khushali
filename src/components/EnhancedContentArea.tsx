import { Copy, Check, ExternalLink, Edit, Trash } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useSearch } from "@/contexts/SearchContext";
import { useDocumentationData } from "@/hooks/useDocumentationData";
import { highlightText, countMatches } from "@/utils/searchUtils";
import { useNavigate } from "react-router-dom";

interface EnhancedContentAreaProps {
  section: string;
  topic: string;
}

export const EnhancedContentArea = ({ section, topic }: EnhancedContentAreaProps) => {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { searchQuery, setTotalMatches, setHighlightedIndex, highlightedIndex } = useSearch();
  const { data } = useDocumentationData();
  const matchRefs = useRef<(HTMLElement | null)[]>([]);

  const sectionData = data[section];
  const topicData = sectionData?.topics.find(t => t.id === topic);

  // Restore matchRefs and highlight navigation logic for auto-scroll and up/down navigation
  const highlightWithRefs = (text: string, searchQuery: string, currentIndex: number, offset: number = 0): JSX.Element => {
    if (!searchQuery.trim()) return <span>{text}</span>;
    if (currentIndex === 0 && offset === 0) matchRefs.current.length = 0;
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    let matchIndex = -1;
    return (
      <span>
        {parts.map((part, idx) => {
          if (idx % 2 === 1 && part.length > 0) {
            matchIndex++;
            return (
              <mark
                key={idx}
                ref={el => {
                  matchRefs.current[offset + matchIndex] = el;
                }}
                id={offset + matchIndex === currentIndex ? 'current-highlight' : undefined}
                className={offset + matchIndex === currentIndex ? 'bg-yellow-400 rounded px-1' : 'bg-yellow-200 rounded px-1'}
              >
                {part}
              </mark>
            );
          }
          return part;
        })}
      </span>
    );
  };

  // Helper to count matches for offset calculation
  const countMatchesForOffset = (text: string, searchQuery: string): number => {
    if (!searchQuery.trim()) return 0;
    const regex = new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    return (text.match(regex) || []).length;
  };

  useEffect(() => {
    if (searchQuery && topicData) {
      let totalCount = 0;

      // Count matches in title and description
      totalCount += countMatches(topicData.title, searchQuery);
      totalCount += countMatches(topicData.description, searchQuery);

      // Count matches in content
      topicData.content.forEach(item => {
        totalCount += countMatches(item.title, searchQuery);
        if (item.description) totalCount += countMatches(item.description, searchQuery);
        if (item.code) totalCount += countMatches(item.code, searchQuery);
      });

      setTotalMatches(totalCount);
      setHighlightedIndex(0);
    } else {
      setTotalMatches(0);
    }
  }, [searchQuery, topicData, setTotalMatches, setHighlightedIndex]);

  useEffect(() => {
    setTimeout(() => {
      const el = matchRefs.current[highlightedIndex];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof el.focus === 'function') el.focus();
      }
    }, 0);
  }, [highlightedIndex, searchQuery, topicData]);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleEdit = () => {
    navigate(`/add-new?section=${section}&topic=${topic}`);
  };

  if (!sectionData || !topicData) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold text-muted-foreground">Select a topic to view documentation</h2>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-6 max-w-full sm:max-w-screen-lg mx-auto">
        <div className="mb-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{sectionData.title}</Badge>
              {topicData.difficulty && (
                <Badge variant={topicData.difficulty === 'beginner' ? 'default' : topicData.difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
                  {topicData.difficulty}
                </Badge>
              )}
              {topicData.timeEstimate && (
                <Badge variant="outline">{topicData.timeEstimate}</Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleEdit} size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {searchQuery ? highlightWithRefs(topicData.title, searchQuery, highlightedIndex, 0) : topicData.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            {searchQuery ? highlightWithRefs(topicData.description, searchQuery, highlightedIndex, countMatchesForOffset(topicData.title, searchQuery)) : topicData.description}
          </p>
        </div>

        {topicData.prerequisites && topicData.prerequisites.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Prerequisites</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {topicData.prerequisites.map((prereq, index) => (
                  <li key={index} className="text-muted-foreground">{prereq}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {topicData.content.map((item, index) => {
            const itemOffset = countMatchesForOffset(topicData.title, searchQuery) + countMatchesForOffset(topicData.description, searchQuery) + index;
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {searchQuery ? highlightWithRefs(item.title, searchQuery, highlightedIndex, itemOffset) : item.title}
                  </CardTitle>
                  {item.description && (
                    <CardDescription>
                      {searchQuery ? highlightWithRefs(item.description, searchQuery, highlightedIndex, itemOffset + countMatchesForOffset(item.title, searchQuery)) : item.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {item.code && (
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          {item.language || 'bash'}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(item.code!, `${index}-code`)}
                          className="h-8"
                        >
                          {copiedStates[`${index}-code`] ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                        <code>
                          {searchQuery ? highlightWithRefs(item.code, searchQuery, highlightedIndex) : item.code}
                        </code>
                      </pre>
                    </div>
                  )}

                  {item.notes && item.notes.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Notes:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {item.notes.map((note, noteIndex) => (
                          <li key={noteIndex} className="text-sm text-muted-foreground">{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.links && item.links.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Useful Links:</h4>
                      <div className="space-y-1">
                        {item.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {topicData.troubleshooting && topicData.troubleshooting.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl">Common Issues & Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topicData.troubleshooting.map((item, index) => (
                  <div key={index} className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-medium text-foreground">{item.issue}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.solution}</p>
                    {item.code && (
                      <div className="relative mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-muted-foreground">Solution</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(item.code!, `${index}-troubleshoot`)}
                            className="h-6 text-xs"
                          >
                            {copiedStates[`${index}-troubleshoot`] ? (
                              <Check className="h-2 w-2" />
                            ) : (
                              <Copy className="h-2 w-2" />
                            )}
                          </Button>
                        </div>
                        <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                          <code>{item.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};
