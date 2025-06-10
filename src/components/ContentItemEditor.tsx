
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash, Plus, Link } from "lucide-react";
import { ContentItem } from "@/hooks/useDocumentationData";

interface ContentItemEditorProps {
  item: ContentItem;
  index: number;
  onUpdate: (index: number, item: ContentItem) => void;
  onRemove: (index: number) => void;
}

export const ContentItemEditor = ({ item, index, onUpdate, onRemove }: ContentItemEditorProps) => {
  const [noteInput, setNoteInput] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleChange = (field: keyof ContentItem, value: any) => {
    onUpdate(index, { ...item, [field]: value });
  };

  const addNote = () => {
    if (noteInput.trim()) {
      const newNotes = [...(item.notes || []), noteInput.trim()];
      handleChange('notes', newNotes);
      setNoteInput('');
    }
  };

  const removeNote = (noteIndex: number) => {
    const newNotes = item.notes?.filter((_, i) => i !== noteIndex) || [];
    handleChange('notes', newNotes);
  };

  const addLink = () => {
    if (linkTitle.trim() && linkUrl.trim()) {
      const newLinks = [...(item.links || []), { title: linkTitle.trim(), url: linkUrl.trim() }];
      handleChange('links', newLinks);
      setLinkTitle('');
      setLinkUrl('');
    }
  };

  const removeLink = (linkIndex: number) => {
    const newLinks = item.links?.filter((_, i) => i !== linkIndex) || [];
    handleChange('links', newLinks);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          Content Section {index + 1}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onRemove(index)}
            className="text-destructive"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`title-${index}`}>Section Title</Label>
          <Input
            id={`title-${index}`}
            value={item.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter section title"
          />
        </div>

        <div>
          <Label htmlFor={`description-${index}`}>Description (optional)</Label>
          <Textarea
            id={`description-${index}`}
            value={item.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Enter section description"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <Label htmlFor={`code-${index}`}>Code (optional)</Label>
            <Textarea
              id={`code-${index}`}
              value={item.code || ''}
              onChange={(e) => handleChange('code', e.target.value)}
              placeholder="Enter code snippet"
              rows={4}
              className="font-mono"
            />
          </div>
          <div>
            <Label htmlFor={`language-${index}`}>Language</Label>
            <Select
              value={item.language || 'bash'}
              onValueChange={(value) => handleChange('language', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bash">Bash</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="ps1">Windows Shell Program</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="yaml">YAML</SelectItem>
                <SelectItem value="dockerfile">Dockerfile</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Notes</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Add a note"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addNote())}
            />
            <Button type="button" onClick={addNote} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {item.notes && item.notes.length > 0 && (
            <div className="space-y-1">
              {item.notes.map((note, noteIndex) => (
                <div
                  key={noteIndex}
                  className="flex items-center justify-between bg-muted p-2 rounded text-sm"
                >
                  <span>{note}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNote(noteIndex)}
                    className="h-6 w-6 p-0 text-destructive"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label>Useful Links</Label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Input
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
              placeholder="Link title"
            />
            <div className="flex gap-2">
              <Input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="URL"
              />
              <Button type="button" onClick={addLink} size="sm">
                <Link className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {item.links && item.links.length > 0 && (
            <div className="space-y-1">
              {item.links.map((link, linkIndex) => (
                <div
                  key={linkIndex}
                  className="flex items-center justify-between bg-muted p-2 rounded text-sm"
                >
                  <span>{link.title} - {link.url}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(linkIndex)}
                    className="h-6 w-6 p-0 text-destructive"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
