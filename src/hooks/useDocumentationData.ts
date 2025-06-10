
import { useState, useCallback } from 'react';
import { documentationData as initialData } from '@/data/documentationData';

export interface DocumentationTopic {
  id: string;
  title: string;
  description: string;
  difficulty?: string;
  timeEstimate?: string;
  prerequisites?: string[];
  content: ContentItem[];
  troubleshooting?: TroubleshootingItem[];
}

export interface ContentItem {
  title: string;
  description?: string;
  code?: string;
  language?: string;
  notes?: string[];
  links?: { title: string; url: string }[];
}

export interface TroubleshootingItem {
  issue: string;
  solution: string;
  code?: string;
}

export interface DocumentationSection {
  title: string;
  topics: DocumentationTopic[];
}

export const useDocumentationData = () => {
  const [data, setData] = useState<Record<string, DocumentationSection>>(initialData);

  const createTopic = useCallback((sectionId: string, topic: DocumentationTopic) => {
    setData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        topics: [...(prev[sectionId]?.topics || []), topic]
      }
    }));
  }, []);

  const updateTopic = useCallback((sectionId: string, topicId: string, updatedTopic: DocumentationTopic) => {
    setData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        topics: prev[sectionId].topics.map(topic =>
          topic.id === topicId ? updatedTopic : topic
        )
      }
    }));
  }, []);

  const getTopic = useCallback((sectionId: string, topicId: string): DocumentationTopic | undefined => {
    return data[sectionId]?.topics.find(topic => topic.id === topicId);
  }, [data]);

  return {
    data,
    createTopic,
    updateTopic,
    getTopic
  };
};
