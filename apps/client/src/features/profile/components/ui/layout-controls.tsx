import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ProfileTheme } from '../../types';

interface LayoutControlsProps {
  value: ProfileTheme['layout'];
  onChange: (layout: ProfileTheme['layout']) => void;
}

export function LayoutControls({ value, onChange }: LayoutControlsProps) {
  if (!value) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Style</Label>
        <RadioGroup
          value={value.style}
          onValueChange={(val) =>
            onChange({ ...value, style: val as ProfileTheme['layout']['style'] })
          }
          className="grid grid-cols-3 gap-4"
        >
          <div>
            <RadioGroupItem value="card" id="style-card" className="peer sr-only" />
            <Label
              htmlFor="style-card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span>Card</span>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="minimal" id="style-minimal" className="peer sr-only" />
            <Label
              htmlFor="style-minimal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span>Minimal</span>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="flat" id="style-flat" className="peer sr-only" />
            <Label
              htmlFor="style-flat"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span>Flat</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Spacing</Label>
        <Select
          value={value.spacing}
          onValueChange={(val) =>
            onChange({ ...value, spacing: val as ProfileTheme['layout']['spacing'] })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select spacing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="comfortable">Comfortable</SelectItem>
            <SelectItem value="spacious">Spacious</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
