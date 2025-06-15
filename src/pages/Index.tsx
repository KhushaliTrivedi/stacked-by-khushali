
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { EnhancedContentArea } from "@/components/EnhancedContentArea";
import { SearchBox } from "@/components/SearchBox";
import { SearchProvider } from "@/contexts/SearchContext";
import { Plus, Menu } from "lucide-react";
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
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <SearchProvider>
      <div className="min-h-screen bg-background flex flex-col md:flex-row w-full">
        {/* Mobile Header - not sticky */}
        <div className="md:hidden bg-card border-b border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-foreground"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/add-new">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add New
              </Button>
            </Link>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-foreground">Stacked by Khushali</h1>
            <p className="text-sm text-muted-foreground">Because Past Me Knew I’d Forget 😄</p>
            <div className="w-full">
              <SearchBox onNavigate={handleNavigation} />
            </div>
          </div>
        </div>

        {/* Sidebar: overlay on mobile, sticky on desktop */}
        <div className="md:flex md:flex-col md:h-screen md:sticky md:top-0 md:z-20">
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

        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content area */}
        <main className="flex-1 flex flex-col min-h-0 md:h-screen md:overflow-hidden">
          {/* Desktop Header */}
          <header className="hidden md:block bg-card border-b border-border p-4 sticky top-0 z-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Stacked by Khushali</h1>
                <p className="text-muted-foreground">Because Past Me Knew I’d Forget 😄</p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 w-full lg:w-auto">
                <div className="w-full sm:w-80 lg:w-96 max-w-full">
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

          <div className="flex-1 overflow-y-auto">
            <EnhancedContentArea
              section={selectedSection}
              topic={selectedTopic}
            />
          </div>
        </main>
      </div>
    </SearchProvider>
  );
};

export default Index;
