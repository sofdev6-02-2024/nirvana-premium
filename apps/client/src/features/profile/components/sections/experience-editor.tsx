import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import type { ExperienceContent } from '@/features/profile/lib/types';
import { PlusCircle, X } from 'lucide-react';

interface ExperienceEditorProps {
  content: { experiences: ExperienceContent[] };
  onChange: (content: { experiences: ExperienceContent[] }) => void;
}

export function ExperienceEditor({ content, onChange }: ExperienceEditorProps) {
  const handleFieldChange = (index: number, field: keyof ExperienceContent, value: string) => {
    const updatedExperiences = [...(content.experiences || [])];
    if (!updatedExperiences[index]) {
      updatedExperiences[index] = {
        title: '',
        company: '',
        period: '',
        description: '',
      };
    }
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    onChange({ experiences: updatedExperiences });
  };

  const addExperience = () => {
    const updatedExperiences = [
      ...(content.experiences || []),
      {
        title: '',
        company: '',
        period: '',
        description: '',
      },
    ];
    onChange({ experiences: updatedExperiences });
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = (content.experiences || []).filter((_, i) => i !== index);
    onChange({ experiences: updatedExperiences });
  };

  return (
    <div className="space-y-6">
      {(content.experiences || []).map((experience, index) => (
        <Card key={index} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeExperience(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={experience.title}
                onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                placeholder="Position or role"
              />
            </div>

            <div>
              <Label>Company</Label>
              <Input
                value={experience.company}
                onChange={(e) => handleFieldChange(index, 'company', e.target.value)}
                placeholder="Company name"
              />
            </div>

            <div>
              <Label>Period</Label>
              <Input
                value={experience.period}
                onChange={(e) => handleFieldChange(index, 'period', e.target.value)}
                placeholder="e.g., Jan 2020 - Present"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={experience.description}
                onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </div>
        </Card>
      ))}

      <Button type="button" variant="outline" className="w-full" onClick={addExperience}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
