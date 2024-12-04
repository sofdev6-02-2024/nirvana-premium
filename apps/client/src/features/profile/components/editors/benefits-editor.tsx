import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { PlusCircle, Trash2 } from 'lucide-react';
import { SectionEditorProps } from '.';
import { BenefitsContent } from '../../types';
import { EmojiPicker } from '../ui/emoji-picker';

export function BenefitsEditor({ content, onChange }: SectionEditorProps<BenefitsContent>) {
  const addBenefit = () => {
    const newBenefit = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      icon: '',
    };
    onChange({
      benefits: [...content.benefits, newBenefit],
    });
  };

  const updateBenefit = (id: string, updates: Partial<BenefitsContent['benefits'][0]>) => {
    onChange({
      benefits: content.benefits.map((benefit) =>
        benefit.id === id ? { ...benefit, ...updates } : benefit,
      ),
    });
  };

  const removeBenefit = (id: string) => {
    onChange({
      benefits: content.benefits.filter((benefit) => benefit.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {content.benefits.map((benefit) => (
        <Card key={benefit.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Benefit</h3>
            <Button size="icon" variant="destructive" onClick={() => removeBenefit(benefit.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-[auto,1fr] items-start">
              <div>
                <Label className="mb-2 block">Icon</Label>
                <EmojiPicker
                  value={benefit.icon}
                  onEmojiSelect={(emoji) => updateBenefit(benefit.id, { icon: emoji })}
                  triggerClassName="h-10 w-10 text-lg"
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={benefit.title}
                  onChange={(e) => updateBenefit(benefit.id, { title: e.target.value })}
                  placeholder="e.g., Flexible Hours"
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={benefit.description}
                onChange={(e) => updateBenefit(benefit.id, { description: e.target.value })}
                placeholder="Describe this benefit..."
              />
            </div>
          </div>
        </Card>
      ))}

      <Button type="button" variant="outline" className="w-full" onClick={addBenefit}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Benefit
      </Button>
    </div>
  );
}
