import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { validateTheme } from '../../lib/theme-validations';
import { CompanyTemplate, ProfileTheme, Section } from '../../types';
import { ColorPicker } from '../ui/color-picker';
import { LayoutControls } from '../ui/layout-controls';
import { TemplateSelector } from '../ui/template-selector';

interface ThemeCustomizerProps {
  theme: ProfileTheme;
  sections?: Section[];
  onChange: (theme: ProfileTheme) => void;
}
export function ThemeCustomizer({ theme, sections = [], onChange }: ThemeCustomizerProps) {
  const [activeTab, setActiveTab] = useState<'template' | 'colors' | 'layout'>('template');
  const validation = useMemo(() => validateTheme(theme, sections), [theme, sections]);

  const handleTemplateChange = (templateName: CompanyTemplate, templateTheme: ProfileTheme) => {
    onChange({
      ...templateTheme,
      template: templateName,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="template">Template</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="template">
          <TemplateSelector currentTemplate={theme.template} onSelect={handleTemplateChange} />
        </TabsContent>

        <TabsContent value="colors">
          <ColorPicker value={theme.colors} onChange={(colors) => onChange({ ...theme, colors })} />
        </TabsContent>

        <TabsContent value="layout">
          <LayoutControls
            value={theme.layout}
            onChange={(layout) => onChange({ ...theme, layout })}
          />
        </TabsContent>
      </Tabs>

      {validation.warnings.length > 0 && (
        <div className="rounded-lg border border-warning bg-warning/10 p-4">
          <div className="flex items-center gap-2 text-warning mb-2">
            <AlertTriangle className="h-4 w-4" />
            <h4 className="font-medium">Theme Validation Warnings</h4>
          </div>
          <ul className="space-y-1 text-sm text-warning/80">
            {validation.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {validation.errors.length > 0 && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
          <div className="flex items-center gap-2 text-destructive mb-2">
            <AlertCircle className="h-4 w-4" />
            <h4 className="font-medium">Theme Validation Errors</h4>
          </div>
          <ul className="space-y-1 text-sm text-destructive/80">
            {validation.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
