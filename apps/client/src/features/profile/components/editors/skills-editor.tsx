import Badge from '@/components/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { useState } from 'react';
import { SectionEditorProps } from '.';
import { SkillContent } from '../../types';

type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export function SkillsEditor({ content, onChange }: SectionEditorProps<SkillContent>) {
  const [newSkillName, setNewSkillName] = useState('');

  const addSkill = (skill: { name: string; level?: SkillLevel }) => {
    onChange({
      skills: [
        ...content.skills,
        {
          id: crypto.randomUUID(),
          name: skill.name,
          level: skill.level,
        },
      ],
    });
  };

  const removeSkill = (id: string) => {
    onChange({
      skills: content.skills.filter((skill) => skill.id !== id),
    });
  };

  const updateSkillLevel = (id: string, level: SkillLevel) => {
    onChange({
      skills: content.skills.map((skill) => (skill.id === id ? { ...skill, level } : skill)),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {content.skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-2 bg-muted p-1 rounded-lg">
            <Badge variant="secondary">
              {skill.name}
              {skill.level && ` - ${skill.level}`}
            </Badge>
            <Select
              value={skill.level || ''}
              onValueChange={(value) => updateSkillLevel(skill.id, value as SkillLevel)}
            >
              <SelectTrigger className="h-7 w-[110px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => removeSkill(skill.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          placeholder="Add a new skill..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newSkillName) {
              addSkill({ name: newSkillName });
              setNewSkillName('');
            }
          }}
        />
        <Button
          type="button"
          onClick={() => {
            if (newSkillName) {
              addSkill({ name: newSkillName });
              setNewSkillName('');
            }
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
