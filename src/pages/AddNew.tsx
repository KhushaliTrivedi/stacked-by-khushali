import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useDocumentationData, DocumentationTopic, ContentItem } from "@/hooks/useDocumentationData";
import { ContentItemEditor } from "@/components/ContentItemEditor";
import { Plus, Save, ArrowLeft } from "lucide-react";

const AddNew = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { data, createTopic, updateTopic, getTopic } = useDocumentationData();

  const sectionParam = searchParams.get('section');
  const topicParam = searchParams.get('topic');
  const isEditing = !!(sectionParam && topicParam);

  const [formData, setFormData] = useState<DocumentationTopic>({
    id: '',
    title: '',
    description: '',
    difficulty: 'beginner',
    timeEstimate: '',
    prerequisites: [],
    content: [],
    troubleshooting: []
  });

  const [selectedSection, setSelectedSection] = useState(sectionParam || 'devops');
  const [prerequisiteInput, setPrerequisiteInput] = useState('');
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [copiedObject, setCopiedObject] = useState<DocumentationTopic | null>(null);

  useEffect(() => {
    if (isEditing && sectionParam && topicParam) {
      const existingTopic = getTopic(sectionParam, topicParam);
      if (existingTopic) {
        setFormData(existingTopic);
        setSelectedSection(sectionParam);
      }
    }
  }, [isEditing, sectionParam, topicParam, getTopic]);

  const handleInputChange = (field: keyof DocumentationTopic, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPrerequisite = () => {
    if (prerequisiteInput.trim()) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...(prev.prerequisites || []), prerequisiteInput.trim()]
      }));
      setPrerequisiteInput('');
    }
  };

  const removePrerequisite = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites?.filter((_, i) => i !== index) || []
    }));
  };

  const addContentItem = () => {
    const newItem: ContentItem = {
      title: '',
      description: '',
      code: '',
      language: 'bash',
      notes: [],
      links: []
    };
    setFormData(prev => ({
      ...prev,
      content: [...prev.content, newItem]
    }));
  };

  const updateContentItem = (index: number, updatedItem: ContentItem) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content.map((item, i) => i === index ? updatedItem : item)
    }));
  };

  const removeContentItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and description are required",
        variant: "destructive"
      });
      return;
    }

    const finalData = {
      ...formData,
      id: formData.id || formData.title.toLowerCase().replace(/\s+/g, '-')
    };

    if (isEditing) {
      updateTopic(selectedSection, finalData.id, finalData);
      // toast({
      //   title: "Updated!",
      //   description: "Topic has been updated successfully"
      // });
    } else {
      createTopic(selectedSection, finalData);
      // toast({
      //   title: "Created!",
      //   description: "New topic has been created successfully"
      // });
    }

    setCopiedObject(finalData);
    setShowCopyModal(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={() => navigate('/')} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">
            {isEditing ? 'Edit Topic' : 'Add New Topic'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(data).map(([key, section]) => (
                        <SelectItem key={key} value={key}>
                          {section.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => handleInputChange('difficulty', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter topic title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter topic description"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="timeEstimate">Time Estimate</Label>
                <Input
                  id="timeEstimate"
                  value={formData.timeEstimate || ''}
                  onChange={(e) => handleInputChange('timeEstimate', e.target.value)}
                  placeholder="e.g., 15 min"
                />
              </div>

              <div>
                <Label>Prerequisites</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={prerequisiteInput}
                    onChange={(e) => setPrerequisiteInput(e.target.value)}
                    placeholder="Add prerequisite"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
                  />
                  <Button type="button" onClick={addPrerequisite} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.prerequisites && formData.prerequisites.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.prerequisites.map((prereq, index) => (
                      <span
                        key={index}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm cursor-pointer"
                        onClick={() => removePrerequisite(index)}
                      >
                        {prereq} ×
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Content Sections
                <Button type="button" onClick={addContentItem} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Section
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {formData.content.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No content sections yet. Click "Add Section" to get started.
                </p>
              ) : (
                <div className="space-y-4">
                  {formData.content.map((item, index) => (
                    <ContentItemEditor
                      key={index}
                      item={item}
                      index={index}
                      onUpdate={updateContentItem}
                      onRemove={removeContentItem}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-end">
            <Button type="submit" className={`${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>
              <Save className="h-4 w-4 mr-1" />
              {isEditing ? 'Update Topic' : 'Create Topic'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/')}>
              Cancel
            </Button>
          </div>
        </form>

        {showCopyModal && copiedObject && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full relative">
              <h2 className="text-xl font-bold mb-4">Copy Topic Object</h2>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto max-h-96 mb-4">{JSON.stringify(copiedObject, null, 2)}</pre>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(copiedObject, null, 2));
                    toast({ title: 'Copied!', description: 'Object copied to clipboard.' });
                  }}
                >
                  Copy
                </Button>
                <Button variant="outline" onClick={() => setShowCopyModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNew;
