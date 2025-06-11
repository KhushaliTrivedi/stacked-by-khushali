import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X, Server, Code, Database, Globe, GitBranch, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { documentationData } from "@/data/documentationData";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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

  const sidebarClasses = isMobile 
    ? `fixed inset-y-0 left-0 z-40 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-72 max-w-[85vw] h-screen flex flex-col`
    : `flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        isOpen ? 'w-64 lg:w-80' : 'w-14'
      } min-w-0`;

  return (
    <div className={sidebarClasses}>
      <div className="p-3 lg:p-4 border-b border-sidebar-border shrink-0">
        <div className={`flex items-center ${!isOpen && !isMobile ? 'justify-center' : 'justify-between'}`}>
          {(isOpen || isMobile) && (
            <div>
              <h2 className="font-semibold text-sidebar-foreground text-sm lg:text-base">Documentation</h2>
              <p className="text-xs text-sidebar-foreground/70">Personal Cheatsheet</p>
            </div>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-2">
            {Object.entries(filteredData).map(([sectionId, section]) => {
              const IconComponent = sectionIcons[sectionId as keyof typeof sectionIcons];
              const isExpanded = expandedSections.has(sectionId);

              return (
                <div key={sectionId} className="mb-2">
                  <Button
                    variant="ghost"
                    className={`w-full transition-colors ${
                      selectedSection === sectionId ? 'bg-sidebar-accent' : ''
                    } ${
                      !isOpen && !isMobile 
                        ? 'justify-center px-2 h-10' 
                        : 'justify-start text-sidebar-foreground hover:bg-sidebar-accent'
                    }`}
                    onClick={() => {
                      if (isOpen || isMobile) {
                        toggleSection(sectionId);
                        onSectionChange(sectionId);
                      } else {
                        onSectionChange(sectionId);
                        onTopicChange(section.topics[0]?.id || '');
                      }
                    }}
                  >
                    <IconComponent className="h-4 w-4 shrink-0" />
                    {(isOpen || isMobile) && (
                      <>
                        <span className="ml-2 truncate text-sm">{section.title}</span>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 ml-auto shrink-0" />
                        ) : (
                          <ChevronRight className="h-4 w-4 ml-auto shrink-0" />
                        )}
                      </>
                    )}
                  </Button>

                  {(isOpen || isMobile) && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.topics.map((topic) => (
                        <Button
                          key={topic.id}
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-xs text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors ${
                            selectedTopic === topic.id && selectedSection === sectionId
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
      </div>
      
      <div className={`border-t border-sidebar-border shrink-0 bg-sidebar ${
        !isOpen && !isMobile 
          ? 'p-2 flex items-center justify-center' 
          : 'p-3 text-center'
      }`}>
        {!isOpen && !isMobile ? (
          <div className="text-sidebar-foreground/60 text-lg" title="Made with ❤️ Khushali">
            <span style={{ color: '#e25555' }}>♥</span>
          </div>
        ) : (
          <div className="text-xs text-sidebar-foreground/60 select-none">
            Made with <span style={{ color: '#e25555', fontSize: '1.1em', verticalAlign: 'middle' }}>&hearts;</span> Khushali
          </div>
        )}
      </div>
    </div>
  );
};
