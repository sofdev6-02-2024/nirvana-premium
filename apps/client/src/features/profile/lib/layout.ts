export type SpacingType = 'compact' | 'normal' | 'relaxed';
export type SectionStyleType = 'card' | 'minimal' | 'bordered';
export type BackgroundType = 'solid' | 'subtle' | 'gradient';

export interface LayoutConfig {
  spacing: SpacingType;
  sectionStyle: SectionStyleType;
  background: BackgroundType;
}

export const layoutConfigs: Record<string, LayoutConfig> = {
  default: {
    spacing: 'normal',
    sectionStyle: 'card',
    background: 'solid',
  },
  modern: {
    spacing: 'relaxed',
    sectionStyle: 'minimal',
    background: 'gradient',
  },
  compact: {
    spacing: 'compact',
    sectionStyle: 'bordered',
    background: 'subtle',
  },
  clean: {
    spacing: 'normal',
    sectionStyle: 'minimal',
    background: 'solid',
  },
};

export const layoutStyles = {
  spacing: {
    compact: {
      container: 'space-y-4',
      sections: 'gap-4',
    },
    normal: {
      container: 'space-y-8',
      sections: 'gap-6',
    },
    relaxed: {
      container: 'space-y-12',
      sections: 'gap-8',
    },
  },
  sectionStyle: {
    card: 'bg-card shadow-md rounded-lg p-6 border',
    minimal: 'bg-background p-4',
    bordered: 'border border-border rounded-md p-6',
  },
  background: {
    solid: 'bg-background',
    subtle: 'bg-muted/50',
    gradient: 'bg-gradient-to-b from-background to-muted/50',
  },
};
