
import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { documentationData } from "@/data/documentationData";
import { useToast } from "@/hooks/use-toast";

interface ContentAreaProps {
  section: string;
  topic: string;
  searchQuery: string;
}

export const ContentArea = ({ section, topic, searchQuery }: ContentAreaProps) => {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const sectionData = documentationData[section];
  const topicData = sectionData?.topics.find(t => t.id === topic);

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

  if (!sectionData || !topicData) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold text-muted-foreground">Select a topic to view documentation</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
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
        <h1 className="text-3xl font-bold text-foreground mb-2">{topicData.title}</h1>
        <p className="text-lg text-muted-foreground">{topicData.description}</p>
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
        {topicData.content.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              {item.description && (
                <CardDescription>{item.description}</CardDescription>
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
                    <code>{item.code}</code>
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
        ))}
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
  );
};
