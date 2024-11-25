import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import type { Benefit, CompanyBenefitsContent } from '@/features/profile/lib/types';
import { PlusCircle, X } from 'lucide-react';

interface CompanyBenefitsEditorProps {
  content: CompanyBenefitsContent;
  onChange: (content: CompanyBenefitsContent) => void;
}

export function CompanyBenefitsEditor({ content, onChange }: CompanyBenefitsEditorProps) {
  const handleFieldChange = (index: number, field: keyof Benefit, value: string) => {
    const updatedBenefits = [...(content.benefits || [])];
    if (!updatedBenefits[index]) {
      updatedBenefits[index] = {
        title: '',
        description: '',
        icon: '',
      };
    }
    updatedBenefits[index] = {
      ...updatedBenefits[index],
      [field]: value,
    };
    onChange({ benefits: updatedBenefits });
  };

  const addBenefit = () => {
    const updatedBenefits = [
      ...(content.benefits || []),
      {
        title: '',
        description: '',
        icon: '',
      },
    ];
    onChange({ benefits: updatedBenefits });
  };

  const removeBenefit = (index: number) => {
    const updatedBenefits = (content.benefits || []).filter((_, i) => i !== index);
    onChange({ benefits: updatedBenefits });
  };

  return (
    <div className="space-y-6">
      {(content.benefits || []).map((benefit, index) => (
        <Card key={index} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Benefit {index + 1}</h3>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeBenefit(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={benefit.title || ''}
                onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                placeholder="Benefit title (e.g., Flexible Hours)"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={benefit.description || ''}
                onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                placeholder="Describe this benefit..."
              />
            </div>

            <div>
              <Label>Icon (optional)</Label>
              <Input
                value={benefit.icon || ''}
                onChange={(e) => handleFieldChange(index, 'icon', e.target.value)}
                placeholder="Icon name or emoji"
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
