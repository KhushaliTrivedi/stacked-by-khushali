import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X, Server, Code, Database, Globe, GitBranch, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { documentationData } from "@/data/documentationData";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedSection: string;
  selectedTopic: string;
  onSectionChange: (section: string) => void;
  onTopicChange: (topic: string) => void;
  searchQuery: string;
}

const sectionIcons = {
  devops: Server,
  github: GitBranch,
  backend: Database,
  frontend: Globe,
  config: Settings,
  shell: Code,
};

export const Sidebar = ({
  isOpen,
  onToggle,
  selectedSection,
  selectedTopic,
  onSectionChange,
  onTopicChange,
  searchQuery,
}: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([selectedSection]));

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleTopicSelect = (sectionId: string, topicId: string) => {
    onSectionChange(sectionId);
    onTopicChange(topicId);
  };

  const filteredData = Object.entries(documentationData).reduce((acc, [sectionId, section]) => {
    const filteredTopics = section.topics.filter(topic =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredTopics.length > 0 || section.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      acc[sectionId] = {
        ...section,
        topics: searchQuery ? filteredTopics : section.topics
      };
    }

    return acc;
  }, {} as typeof documentationData);

  return (
    <div className={`fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-20 ${isOpen ? 'w-80' : 'w-16'
      }`}>
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div>
              <h2 className="font-semibold text-sidebar-foreground">Documentation</h2>
              <p className="text-xs text-sidebar-foreground/70">Personal Cheatsheet</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 h-[calc(100vh-100px)]">
        <div className="p-2">
          {Object.entries(filteredData).map(([sectionId, section]) => {
            const IconComponent = sectionIcons[sectionId as keyof typeof sectionIcons];
            const isExpanded = expandedSections.has(sectionId);

            return (
              <div key={sectionId} className="mb-2">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent ${selectedSection === sectionId ? 'bg-sidebar-accent' : ''
                    } ${!isOpen ? 'px-2' : ''}`}
                  onClick={() => {
                    if (isOpen) {
                      toggleSection(sectionId);
                      onSectionChange(sectionId);
                    } else {
                      onSectionChange(sectionId);
                      onTopicChange(section.topics[0]?.id || '');
                    }
                  }}
                >
                  <IconComponent className="h-4 w-4 shrink-0" />
                  {isOpen && (
                    <>
                      <span className="ml-2 truncate">{section.title}</span>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 ml-auto shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 ml-auto shrink-0" />
                      )}
                    </>
                  )}
                </Button>

                {isOpen && isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {section.topics.map((topic) => (
                      <Button
                        key={topic.id}
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start text-xs text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground ${selectedTopic === topic.id && selectedSection === sectionId
                          ? 'bg-sidebar-accent text-sidebar-foreground'
                          : ''
                          }`}
                        onClick={() => handleTopicSelect(sectionId, topic.id)}
                      >
                        <span className="truncate">{topic.title}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="sticky bottom-0 left-0 w-full p-3 text-center text-xs text-sidebar-foreground/60 select-none bg-sidebar z-30 border-t border-sidebar-border">
        Made with <span style={{ color: '#e25555', fontSize: '1.1em', verticalAlign: 'middle' }}>&hearts;</span> Khushali
      </div>
    </div>
  );
};
