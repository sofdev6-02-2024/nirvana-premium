'use client';

import { MarkdownEditor } from '@/components/markdown/editor';
import { MarkdownPreview } from '@/components/markdown/preview';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProfileBuilderProps {
  type: 'developer' | 'recruiter';
  initialContent?: string;
  onSave: (content: string) => Promise<void>;
}

const templates = {
  developer: {
    basic: `# About Me

## Professional Summary
A passionate developer with X years of experience...

## Experience
### Company Name
*Position* | Start Date - End Date
- Achievement 1
- Achievement 2

## Skills
- Skill 1
- Skill 2

## Education
### University Name
*Degree* | Graduation Year

## Projects
### Project Name
- Description
- Technologies used
`,
    detailed: `# Professional Portfolio

## 👋 Introduction
Brief introduction about yourself...

## 💼 Professional Experience
### Company Name | Position
*Location | Date - Present*

Key Responsibilities:
- Point 1
- Point 2

Achievements:
- Achievement 1
- Achievement 2

## 🛠 Technical Skills
### Languages
- Language 1
- Language 2

### Frameworks & Tools
- Framework 1
- Tool 1

## 🎓 Education & Certifications
### University Name
*Degree* | Year
- GPA if notable
- Relevant coursework

### Certifications
- Certification 1
- Certification 2

## 🚀 Projects
### Project Name
*[Link to project]*

**Technologies:** Tech1, Tech2

**Description:**
Brief project description...

## 📫 Contact
- LinkedIn: [Your Profile]
- GitHub: [Your Profile]
- Portfolio: [Your Website]
`,
  },
  recruiter: {
    basic: `# About Our Company

## Company Overview
Brief description of your company...

## What We Do
- Point 1
- Point 2

## Our Culture
Description of company culture...

## Benefits
- Benefit 1
- Benefit 2

## Contact
How to get in touch...
`,
    detailed: `# Welcome to [Company Name]

## 🏢 About Us
Detailed company description...

## 🎯 Our Mission
Our company mission statement...

## 💪 Why Join Us?
### Culture & Values
- Value 1
- Value 2

### Benefits & Perks
- Benefit 1
- Benefit 2

## 🌱 Growth & Development
- Development opportunity 1
- Development opportunity 2

## 📍 Our Locations
- Location 1
- Location 2

## 🤝 How to Connect
- LinkedIn: [Company Page]
- Website: [Company Website]
- Careers: [Careers Page]
`,
  },
};

export function ProfileBuilder({ type, initialContent = '', onSave }: ProfileBuilderProps) {
  const { user } = useUser();
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      await onSave(content);
      toast.success('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    if (value && templates[type][value as keyof (typeof templates)[typeof type]]) {
      setContent(templates[type][value as keyof (typeof templates)[typeof type]]);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {type === 'developer' ? 'CV Builder' : 'Company Profile'}
            </h1>
            <p className="text-muted-foreground">
              {type === 'developer'
                ? 'Create your professional CV using Markdown'
                : 'Create your company profile using Markdown'}
            </p>
          </div>
          <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Choose template" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Templates</SelectLabel>
                <SelectItem value="basic">Basic Template</SelectItem>
                <SelectItem value="detailed">Detailed Template</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Editor</h2>
          <MarkdownEditor
            initialValue={content}
            onChange={setContent}
            onSave={handleSave}
            isSaving={isSaving}
            placeholder={`Start writing your ${
              type === 'developer' ? 'CV' : 'company profile'
            } in Markdown...`}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Preview</h2>
          <MarkdownPreview content={content} />
        </div>
      </div>
    </div>
  );
}
