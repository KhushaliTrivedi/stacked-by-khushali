
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { EnhancedContentArea } from "@/components/EnhancedContentArea";
import { SearchBox } from "@/components/SearchBox";
import { SearchProvider } from "@/contexts/SearchContext";
import { Plus } from "lucide-react";

const Index = () => {
  const [selectedSection, setSelectedSection] = useState("backend");
  const [selectedTopic, setSelectedTopic] = useState("basic-node.js-express.js-project-setup");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleNavigation = (sectionId: string, topicId: string) => {
    setSelectedSection(sectionId);
    setSelectedTopic(topicId);
  };

  return (
    <SearchProvider>
      <div className="min-h-screen bg-background flex w-full">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          selectedSection={selectedSection}
          selectedTopic={selectedTopic}
          onSectionChange={setSelectedSection}
          onTopicChange={setSelectedTopic}
          searchQuery=""
        />

        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-16'}`}>
          <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Stacked by Khushali</h1>
                <p className="text-muted-foreground">Because Googling the same thing 10 times is weak 😄</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-96">
                  <SearchBox onNavigate={handleNavigation} />
                </div>
                <Link to="/add-new">
                  <Button>
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
