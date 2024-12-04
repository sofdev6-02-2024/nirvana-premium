import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { PlusCircle, Trash2 } from 'lucide-react';
import { SectionEditorProps } from '.';
import { MissionContent } from '../../types';

export function MissionEditor({ content, onChange }: SectionEditorProps<MissionContent>) {
  const addValue = () => {
    const newValue = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
    };
    onChange({
      ...content,
      values: [...content.values, newValue],
    });
  };

  const updateValue = (id: string, updates: Partial<{ title: string; description: string }>) => {
    onChange({
      ...content,
      values: content.values.map((value) => (value.id === id ? { ...value, ...updates } : value)),
    });
  };

  const removeValue = (id: string) => {
    onChange({
      ...content,
      values: content.values.filter((value) => value.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label>Mission Statement</Label>
          <Textarea
            value={content.mission}
            onChange={(e) => onChange({ ...content, mission: e.target.value })}
            placeholder="Your company's mission statement..."
            className="min-h-[100px]"
          />
        </div>

        <div>
          <Label>Vision (Optional)</Label>
          <Textarea
            value={content.vision || ''}
            onChange={(e) => onChange({ ...content, vision: e.target.value })}
            placeholder="Your company's vision for the future..."
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-lg">Company Values</Label>
        </div>

        {content.values.map((value) => (
          <Card key={value.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Value</h3>
              <Button size="icon" variant="destructive" onClick={() => removeValue(value.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={value.title}
                  onChange={(e) => updateValue(value.id, { title: e.target.value })}
                  placeholder="e.g., Innovation, Integrity, Excellence"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={value.description}
                  onChange={(e) => updateValue(value.id, { description: e.target.value })}
                  placeholder="Describe this value..."
                />
              </div>
            </div>
          </Card>
        ))}

        <Button type="button" variant="outline" className="w-full" onClick={addValue}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Value
        </Button>
      </div>
    </div>
  );
}
