import type { ProfileTheme } from '../../types';
import { LayoutControls } from '../ui/layout-controls';

interface ThemeCustomizerProps {
  theme: ProfileTheme;
  onChange: (theme: ProfileTheme) => void;
}

export function ThemeCustomizer({ theme, onChange }: ThemeCustomizerProps) {
  return (
    <div className="space-y-4">
      <LayoutControls value={theme.layout} onChange={(layout) => onChange({ ...theme, layout })} />
    </div>
  );
}
