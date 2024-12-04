import Badge from '@/components/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/text-area';
import { Plus, PlusCircle, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { SectionEditorProps } from '.';
import { ExperienceContent } from '../../types';

export function ExperienceEditor({ content, onChange }: SectionEditorProps<ExperienceContent>) {
  const [newAchievements, setNewAchievements] = useState<Record<string, string>>({});
  const [newTech, setNewTech] = useState<Record<string, string>>({});

  const addPosition = () => {
    const newPosition = {
      id: crypto.randomUUID(),
      title: '',
      company: '',
      startDate: '',
      current: false,
      description: '',
      achievements: [],
      technologies: [],
    };

    onChange({
      positions: [...content.positions, newPosition],
    });
  };

  const updatePosition = (id: string, updates: Partial<ExperienceContent['positions'][0]>) => {
    onChange({
      positions: content.positions.map((position) =>
        position.id === id ? { ...position, ...updates } : position,
      ),
    });
  };

  const removePosition = (id: string) => {
    onChange({
      positions: content.positions.filter((position) => position.id !== id),
    });
  };

  const addAchievement = (positionId: string) => {
    const achievement = newAchievements[positionId]?.trim();
    if (!achievement) return;

    const position = content.positions.find((p) => p.id === positionId);
    if (!position) return;

    updatePosition(positionId, {
      achievements: [...(position.achievements || []), achievement],
    });

    setNewAchievements((prev) => ({
      ...prev,
      [positionId]: '',
    }));
  };

  const removeAchievement = (positionId: string, index: number) => {
    const position = content.positions.find((p) => p.id === positionId);
    if (!position?.achievements) return;

    updatePosition(positionId, {
      achievements: position.achievements.filter((_, i) => i !== index),
    });
  };

  const addTechnology = (positionId: string) => {
    const tech = newTech[positionId]?.trim();
    if (!tech) return;

    const position = content.positions.find((p) => p.id === positionId);
    if (!position) return;

    updatePosition(positionId, {
      technologies: [...(position.technologies || []), tech],
    });

    setNewTech((prev) => ({
      ...prev,
      [positionId]: '',
    }));
  };

  const removeTechnology = (positionId: string, index: number) => {
    const position = content.positions.find((p) => p.id === positionId);
    if (!position?.technologies) return;

    updatePosition(positionId, {
      technologies: position.technologies.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {content.positions.map((position, index) => (
        <Card key={position.id} className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Position {index + 1}</h3>
            <Button size="icon" variant="destructive" onClick={() => removePosition(position.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Title</Label>
                <Input
                  value={position.title}
                  onChange={(e) => updatePosition(position.id, { title: e.target.value })}
                  placeholder="Position title"
                />
              </div>

              <div>
                <Label>Company</Label>
                <Input
                  value={position.company}
                  onChange={(e) => updatePosition(position.id, { company: e.target.value })}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={position.startDate}
                  onChange={(e) => updatePosition(position.id, { startDate: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-2">
                <Label>Current Position</Label>
                <Switch
                  checked={position.current}
                  onCheckedChange={(checked) => updatePosition(position.id, { current: checked })}
                />
              </div>

              {!position.current && (
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={position.endDate}
                    onChange={(e) => updatePosition(position.id, { endDate: e.target.value })}
                  />
                </div>
              )}
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={position.description}
                onChange={(e) => updatePosition(position.id, { description: e.target.value })}
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>

            <div className="space-y-2">
              <Label>Achievements</Label>
              <div className="space-y-2">
                {position.achievements?.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex items-center gap-2">
                    <Input value={achievement} readOnly className="flex-1" />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeAchievement(position.id, achievementIndex)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="flex gap-2">
                  <Input
                    value={newAchievements[position.id] || ''}
                    onChange={(e) =>
                      setNewAchievements((prev) => ({
                        ...prev,
                        [position.id]: e.target.value,
                      }))
                    }
                    placeholder="Type a new achievement..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addAchievement(position.id);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addAchievement(position.id)}
                    disabled={!newAchievements[position.id]?.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Technologies</Label>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {position.technologies?.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="flex items-center gap-2">
                      {tech}
                      <button
                        onClick={() => removeTechnology(position.id, techIndex)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newTech[position.id] || ''}
                    onChange={(e) =>
                      setNewTech((prev) => ({
                        ...prev,
                        [position.id]: e.target.value,
                      }))
                    }
                    placeholder="Add a technology..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTechnology(position.id);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addTechnology(position.id)}
                    disabled={!newTech[position.id]?.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Button type="button" variant="outline" className="w-full" onClick={addPosition}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Position
      </Button>
    </div>
  );
}
