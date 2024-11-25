import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { PlusCircle, X } from 'lucide-react';

interface MissionContent {
  mission: string;
  values: Array<{ title: string; description: string }>;
  culture: string;
}

interface MissionEditorProps {
  content: MissionContent;
  onChange: (content: MissionContent) => void;
}

export function MissionEditor({ content, onChange }: MissionEditorProps) {
  const handleFieldChange = (field: keyof MissionContent, value: string) => {
    onChange({
      ...content,
      [field]: value,
    });
  };

  const handleValueChange = (index: number, field: 'title' | 'description', value: string) => {
    const updatedValues = [...(content.values || [])];
    if (!updatedValues[index]) {
      updatedValues[index] = { title: '', description: '' };
    }
    updatedValues[index] = {
      ...updatedValues[index],
      [field]: value,
    };
    onChange({
      ...content,
      values: updatedValues,
    });
  };

  const addValue = () => {
    const updatedValues = [...(content.values || []), { title: '', description: '' }];
    onChange({
      ...content,
      values: updatedValues,
    });
  };

  const removeValue = (index: number) => {
    const updatedValues = (content.values || []).filter((_, i) => i !== index);
    onChange({
      ...content,
      values: updatedValues,
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label>Mission Statement</Label>
          <Textarea
            value={content.mission || ''}
            onChange={(e) => handleFieldChange('mission', e.target.value)}
            className="min-h-[100px]"
            placeholder="Your company's mission statement..."
          />
        </div>

        <div>
          <Label>Company Culture</Label>
          <Textarea
            value={content.culture || ''}
            onChange={(e) => handleFieldChange('culture', e.target.value)}
            className="min-h-[100px]"
            placeholder="Describe your company culture..."
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base">Company Values</Label>

        {(content.values || []).map((value, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Value {index + 1}</Label>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeValue(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={value.title}
                    onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                    placeholder="Value title (e.g., Innovation)"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={value.description}
                    onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                    placeholder="Describe this value..."
                  />
                </div>
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
