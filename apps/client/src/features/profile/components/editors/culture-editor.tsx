import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { PlusCircle, Trash2 } from 'lucide-react';
import { CultureContent } from '../../types';

interface CultureEditorProps {
  content: CultureContent;
  onChange: (content: CultureContent) => void;
}

export function CultureEditor({ content, onChange }: CultureEditorProps) {
  const addPrinciple = () => {
    onChange({
      ...content,
      principles: [
        ...content.principles,
        {
          id: crypto.randomUUID(),
          title: '',
          description: '',
        },
      ],
    });
  };

  const updatePrinciple = (
    id: string,
    updates: Partial<{ title: string; description: string }>,
  ) => {
    onChange({
      ...content,
      principles: content.principles.map((principle) =>
        principle.id === id ? { ...principle, ...updates } : principle,
      ),
    });
  };

  const removePrinciple = (id: string) => {
    onChange({
      ...content,
      principles: content.principles.filter((principle) => principle.id !== id),
    });
  };

  const addPerk = () => {
    onChange({
      ...content,
      perks: [
        ...(content.perks || []),
        {
          id: crypto.randomUUID(),
          title: '',
          description: '',
        },
      ],
    });
  };

  const updatePerk = (id: string, updates: Partial<{ title: string; description: string }>) => {
    onChange({
      ...content,
      perks: content.perks?.map((perk) => (perk.id === id ? { ...perk, ...updates } : perk)),
    });
  };

  const removePerk = (id: string) => {
    onChange({
      ...content,
      perks: content.perks?.filter((perk) => perk.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <Label>Company Culture Description</Label>
        <Textarea
          value={content.description}
          onChange={(e) => onChange({ ...content, description: e.target.value })}
          placeholder="Describe your company's culture and values..."
          className="min-h-[150px]"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-lg">Core Principles</Label>
        </div>

        <div className="space-y-4">
          {content.principles.map((principle) => (
            <Card key={principle.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Label>Principle</Label>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => removePrinciple(principle.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={principle.title}
                    onChange={(e) => updatePrinciple(principle.id, { title: e.target.value })}
                    placeholder="e.g., Innovation First"
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={principle.description}
                    onChange={(e) => updatePrinciple(principle.id, { description: e.target.value })}
                    placeholder="Describe this principle..."
                  />
                </div>
              </div>
            </Card>
          ))}

          <Button type="button" variant="outline" className="w-full" onClick={addPrinciple}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Principle
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-lg">Perks & Benefits</Label>
        </div>

        <div className="space-y-4">
          {content.perks?.map((perk) => (
            <Card key={perk.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Label>Perk</Label>
                <Button size="icon" variant="destructive" onClick={() => removePerk(perk.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={perk.title}
                    onChange={(e) => updatePerk(perk.id, { title: e.target.value })}
                    placeholder="e.g., Flexible Hours"
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={perk.description}
                    onChange={(e) => updatePerk(perk.id, { description: e.target.value })}
                    placeholder="Describe this perk..."
                  />
                </div>
              </div>
            </Card>
          ))}

          <Button type="button" variant="outline" className="w-full" onClick={addPerk}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Perk
          </Button>
        </div>
      </div>
    </div>
  );
}
