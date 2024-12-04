import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import type { ProfileTheme } from '../../types';

interface LayoutControlsProps {
  value: ProfileTheme['layout'];
  onChange: (layout: ProfileTheme['layout']) => void;
}

export function LayoutControls({ value, onChange }: LayoutControlsProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-base font-semibold">Section Style</Label>
        <RadioGroup
          value={value.style}
          onValueChange={(newStyle) =>
            onChange({ ...value, style: newStyle as ProfileTheme['layout']['style'] })
          }
          className="grid grid-cols-1 gap-4"
        >
          <Label
            htmlFor="style-card"
            className={cn(
              'cursor-pointer rounded-lg border-2 p-4 hover:bg-accent/5',
              value.style === 'card' && 'border-primary',
            )}
          >
            <RadioGroupItem value="card" id="style-card" className="sr-only" />
            <div className="space-y-2">
              <p className="font-medium">Modern Card</p>
              <div className="rounded-md bg-muted/50 p-4 shadow-sm">
                <div className="space-y-2">
                  <div className="h-2 w-3/4 rounded-full bg-primary/20"></div>
                  <div className="h-2 w-1/2 rounded-full bg-primary/20"></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Elevated sections with shadows and rounded corners
              </p>
            </div>
          </Label>

          <Label
            htmlFor="style-bordered"
            className={cn(
              'cursor-pointer rounded-lg border-2 p-4 hover:bg-accent/5',
              value.style === 'bordered' && 'border-primary',
            )}
          >
            <RadioGroupItem value="bordered" id="style-bordered" className="sr-only" />
            <div className="space-y-2">
              <p className="font-medium">Clean Borders</p>
              <div className="rounded-md border-2 p-4">
                <div className="space-y-2">
                  <div className="h-2 w-3/4 rounded-full bg-primary/20"></div>
                  <div className="h-2 w-1/2 rounded-full bg-primary/20"></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Simple borders for a clean, professional look
              </p>
            </div>
          </Label>

          <Label
            htmlFor="style-minimal"
            className={cn(
              'cursor-pointer rounded-lg border-2 p-4 hover:bg-accent/5',
              value.style === 'minimal' && 'border-primary',
            )}
          >
            <RadioGroupItem value="minimal" id="style-minimal" className="sr-only" />
            <div className="space-y-2">
              <p className="font-medium">Minimalist</p>
              <div className="p-4">
                <div className="space-y-2">
                  <div className="h-2 w-3/4 rounded-full bg-primary/20"></div>
                  <div className="h-2 w-1/2 rounded-full bg-primary/20"></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Clean and simple without borders or shadows
              </p>
            </div>
          </Label>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">Content Layout</Label>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Section Spacing</Label>
            <RadioGroup
              value={value.spacing}
              onValueChange={(newSpacing) =>
                onChange({ ...value, spacing: newSpacing as ProfileTheme['layout']['spacing'] })
              }
              className="grid grid-cols-3 gap-4"
            >
              {[
                { value: 'compact', label: 'Compact', height: 'h-4' },
                { value: 'comfortable', label: 'Comfortable', height: 'h-8' },
                { value: 'spacious', label: 'Spacious', height: 'h-12' },
              ].map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`spacing-${option.value}`}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-lg border-2 p-4 hover:bg-accent/5',
                    value.spacing === option.value && 'border-primary',
                  )}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`spacing-${option.value}`}
                    className="sr-only"
                  />
                  <div className={cn('w-full bg-primary/10 rounded', option.height)} />
                  <span className="text-sm font-medium">{option.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Content Width</Label>
            <RadioGroup
              value={value.maxWidth.toString()}
              onValueChange={(newWidth) => onChange({ ...value, maxWidth: parseInt(newWidth) })}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { value: '680', label: 'Narrow', width: 'w-1/2' },
                { value: '920', label: 'Medium', width: 'w-3/4' },
                { value: '1200', label: 'Wide', width: 'w-full' },
              ].map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`width-${option.value}`}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-lg border-2 p-4 hover:bg-accent/5',
                    value.maxWidth.toString() === option.value && 'border-primary',
                  )}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`width-${option.value}`}
                    className="sr-only"
                  />
                  <div className="w-full h-8 flex justify-center items-center bg-muted rounded">
                    <div className={cn('h-2 bg-primary/20 rounded', option.width)} />
                  </div>
                  <span className="text-sm font-medium">{option.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
