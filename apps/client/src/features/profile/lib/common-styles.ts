import { ProfileTheme } from '../types';

export const createSectionStyles = (theme: ProfileTheme) => ({
  container: {
    backgroundColor: theme.layout.style === 'card' ? theme.colors.surface : theme.colors.background,
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
});
