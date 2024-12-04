import { ColorScheme } from '../types';

interface ColorPreset {
  name: string;
  description?: string;
  colors: ColorScheme;
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    name: 'Professional Blue',
    description: 'Clean and trustworthy',
    colors: {
      primary: '#1a73e8',
      secondary: '#5f6368',
      accent: '#ea4335',
      background: '#ffffff',
      surface: '#f8f9fa',
      text: {
        primary: '#202124',
        secondary: '#5f6368',
      },
    },
  },
  {
    name: 'Modern Dark',
    description: 'Bold and contemporary',
    colors: {
      primary: '#2d3436',
      secondary: '#636e72',
      accent: '#00b894',
      background: '#ffffff',
      surface: '#f5f6fa',
      text: {
        primary: '#2d3436',
        secondary: '#636e72',
      },
    },
  },
  {
    name: 'Creative Purple',
    description: 'Creative and innovative',
    colors: {
      primary: '#6c5ce7',
      secondary: '#a29bfe',
      accent: '#fd79a8',
      background: '#ffffff',
      surface: '#f8f7ff',
      text: {
        primary: '#2d3436',
        secondary: '#636e72',
      },
    },
  },
  {
    name: 'Nature Green',
    description: 'Fresh and organic',
    colors: {
      primary: '#00b894',
      secondary: '#55efc4',
      accent: '#fdcb6e',
      background: '#ffffff',
      surface: '#f0fff4',
      text: {
        primary: '#2d3436',
        secondary: '#636e72',
      },
    },
  },
  {
    name: 'Tech Minimal',
    description: 'Clean and focused',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#0066cc',
      background: '#ffffff',
      surface: '#fafafa',
      text: {
        primary: '#000000',
        secondary: '#666666',
      },
    },
  },
  {
    name: 'Warm Orange',
    description: 'Friendly and welcoming',
    colors: {
      primary: '#e17055',
      secondary: '#fab1a0',
      accent: '#0984e3',
      background: '#ffffff',
      surface: '#fff5f0',
      text: {
        primary: '#2d3436',
        secondary: '#636e72',
      },
    },
  },
];
