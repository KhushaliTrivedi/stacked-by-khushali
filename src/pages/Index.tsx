import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { EnhancedContentArea } from "@/components/EnhancedContentArea";
import { SearchBox } from "@/components/SearchBox";
import { SearchProvider } from "@/contexts/SearchContext";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [selectedSection, setSelectedSection] = useState("backend");
  const [selectedTopic, setSelectedTopic] = useState("basic-node.js-express.js-project-setup");
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleNavigation = (sectionId: string, topicId: string) => {
    setSelectedSection(sectionId);
    setSelectedTopic(topicId);
  };

  return (
    <SearchProvider>
      <div className="min-h-screen bg-background flex w-full">
        {/* Sidebar: sticky on desktop, Sheet/drawer on mobile */}
        <div className="hidden md:flex flex-col h-screen sticky top-0 z-20">
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            selectedSection={selectedSection}
            selectedTopic={selectedTopic}
            onSectionChange={setSelectedSection}
            onTopicChange={setSelectedTopic}
            searchQuery=""
          />
        </div>
        {/* Mobile sidebar as overlay/drawer */}
        <div className="md:hidden">
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            selectedSection={selectedSection}
            selectedTopic={selectedTopic}
            onSectionChange={setSelectedSection}
            onTopicChange={setSelectedTopic}
            searchQuery=""
          />
        </div>
        {/* Main content area, scrollable */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto">
          <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Stacked by Khushali</h1>
                <p className="text-muted-foreground">Because Googling the same thing 10 times is weak 😄</p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 w-full md:w-auto">
                <div className="w-full sm:w-80 md:w-96 max-w-full">
                  <SearchBox onNavigate={handleNavigation} />
                </div>
                <Link to="/add-new" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-1" />
                    Add New
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          <EnhancedContentArea
            section={selectedSection}
            topic={selectedTopic}
          />
        </main>
      </div>
    </SearchProvider>
  );
};

export default Index;
