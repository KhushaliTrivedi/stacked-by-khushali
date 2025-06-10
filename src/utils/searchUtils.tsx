
export interface SearchMatch {
  sectionId: string;
  topicId: string;
  matchType: 'title' | 'description' | 'content';
  matchText: string;
}

export const findAllMatchingTopics = (
  data: Record<string, any>,
  searchQuery: string
): SearchMatch[] => {
  if (!searchQuery.trim()) return [];

  const query = searchQuery.toLowerCase();
  const matches: SearchMatch[] = [];
  
  for (const [sectionId, section] of Object.entries(data)) {
    for (const topic of section.topics) {
      // Check title match
      if (topic.title.toLowerCase().includes(query)) {
        matches.push({
          sectionId,
          topicId: topic.id,
          matchType: 'title',
          matchText: topic.title
        });
      }
      
      // Check description match
      if (topic.description.toLowerCase().includes(query)) {
        matches.push({
          sectionId,
          topicId: topic.id,
          matchType: 'description',
          matchText: topic.description
        });
      }
      
      // Check content matches
      topic.content.forEach((item: any) => {
        if (item.title.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query) ||
            item.code?.toLowerCase().includes(query)) {
          matches.push({
            sectionId,
            topicId: topic.id,
            matchType: 'content',
            matchText: item.title
          });
        }
      });
    }
  }

  return matches;
};

export const findFirstMatchingTopic = (
  data: Record<string, any>,
  searchQuery: string
): { sectionId: string; topicId: string } | null => {
  const matches = findAllMatchingTopics(data, searchQuery);
  return matches.length > 0 ? { sectionId: matches[0].sectionId, topicId: matches[0].topicId } : null;
};

export const highlightText = (text: string, searchQuery: string, currentIndex: number, totalMatches: number): JSX.Element => {
  if (!searchQuery.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${searchQuery})`, 'gi');
  const parts = text.split(regex);
  let matchIndex = -1;

  return (
    <span>
      {parts.map((part, index) => {
        if (regex.test(part)) {
          matchIndex++;
          const isCurrentMatch = matchIndex === currentIndex;
          return (
            <mark
              key={index}
              className={`${isCurrentMatch ? 'bg-yellow-400' : 'bg-yellow-200'} rounded px-1`}
              id={isCurrentMatch ? 'current-highlight' : undefined}
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

export const countMatches = (text: string, searchQuery: string): number => {
  if (!searchQuery.trim()) return 0;
  const regex = new RegExp(searchQuery, 'gi');
  return (text.match(regex) || []).length;
};
