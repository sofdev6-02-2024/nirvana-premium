import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { ColorScheme } from '../../types';

interface ColorPickerProps {
  value: ColorScheme;
  onChange: (colors: ColorScheme) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  if (!value) return null;

  const handleColorChange = (key: keyof Omit<ColorScheme, 'text'>, colorValue: string) => {
    onChange({
      ...value,
      [key]: colorValue,
    });
  };

  const handleTextColorChange = (type: 'primary' | 'secondary', colorValue: string) => {
    onChange({
      ...value,
      text: {
        ...value.text,
        [type]: colorValue,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {(['primary', 'secondary', 'accent', 'background', 'surface'] as const).map((key) => (
          <div key={key} className="flex items-center gap-4">
            <Label className="w-24 capitalize">{key}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-14 h-8 p-0 border-2"
                  style={{ backgroundColor: value[key] }}
                >
                  <span className="sr-only">Pick {key} color</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <input
                    type="color"
                    value={value[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-full"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ))}

        <div className="space-y-2">
          <Label>Text Colors</Label>
          <div className="space-y-2">
            {(['primary', 'secondary'] as const).map((textType) => (
              <div key={textType} className="flex items-center gap-4">
                <Label className="w-24 capitalize">{textType}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-14 h-8 p-0 border-2"
                      style={{ backgroundColor: value.text[textType] }}
                    >
                      <span className="sr-only">Pick text color</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="space-y-2">
                      <input
                        type="color"
                        value={value.text[textType]}
                        onChange={(e) => handleTextColorChange(textType, e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
