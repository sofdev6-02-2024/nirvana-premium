import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { COMPANY_TEMPLATES, type CompanyTemplate, type ProfileTheme } from '../../types';

interface TemplateSelectorProps {
  currentTemplate: CompanyTemplate;
  onSelect: (template: CompanyTemplate, templateTheme: ProfileTheme) => void;
}

export function TemplateSelector({ currentTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {(Object.entries(COMPANY_TEMPLATES) as [CompanyTemplate, ProfileTheme][]).map(
        ([name, theme]) => (
          <Button
            key={name}
            variant={currentTemplate === name ? 'default' : 'outline'}
            className="h-auto p-4 flex flex-col items-start gap-2"
            onClick={() => onSelect(name, theme)}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-semibold capitalize">{name}</span>
              {currentTemplate === name && <Check className="h-4 w-4" />}
            </div>
            <div className="flex gap-2">
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: theme.colors.secondary }}
              />
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: theme.colors.accent }}
              />
            </div>
          </Button>
        ),
      )}
    </div>
  );
}
