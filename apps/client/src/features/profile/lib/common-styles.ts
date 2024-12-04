import { ProfileTheme } from '../types';

const defaultTheme: ProfileTheme = {
  template: 'modern',
  layout: {
    spacing: 'comfortable',
    style: 'card',
    maxWidth: 1200,
  },
  colors: {
    primary: 'hsl(24.6 95% 53.1%)',
    secondary: 'hsl(60 4.8% 95.9%)',
    accent: 'hsl(60 4.8% 95.9%)',
    background: 'hsl(0 0% 100%)',
    surface: 'hsl(60 4.8% 95.9%)',
    text: {
      primary: 'hsl(20 14.3% 4.1%)',
      secondary: 'hsl(25 5.3% 44.7%)',
    },
  },
};

export const createSectionStyles = (themeInput?: Partial<ProfileTheme>) => {
  const theme: ProfileTheme = {
    ...defaultTheme,
    ...themeInput,
    layout: {
      ...defaultTheme.layout,
      ...(themeInput?.layout || {}),
    },
    colors: {
      ...defaultTheme.colors,
      ...(themeInput?.colors || {}),
      text: {
        ...defaultTheme.colors.text,
        ...(themeInput?.colors?.text || {}),
      },
    },
  };

  return {
    container: {
      backgroundColor:
        theme.layout.style === 'card' ? theme.colors.surface : theme.colors.background,
      border: theme.layout.style === 'card' ? `1px solid ${theme.colors.secondary}` : 'none',
      boxShadow: theme.layout.style === 'card' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
    },
    heading: {
      color: theme.colors.primary,
    },
    subheading: {
      color: theme.colors.secondary,
    },
    text: {
      color: theme.colors.text.primary,
    },
    secondaryText: {
      color: theme.colors.text.secondary,
    },
    accent: {
      color: theme.colors.accent,
    },
  };
};
