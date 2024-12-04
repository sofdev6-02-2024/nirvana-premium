export type CompanyTemplate = 'google' | 'microsoft' | 'amazon' | 'apple' | 'modern';

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
  };
}

export interface LayoutConfig {
  spacing: 'compact' | 'comfortable' | 'spacious';
  style: 'card' | 'flat' | 'minimal';
  maxWidth: number;
}

export interface ProfileTheme {
  template: CompanyTemplate;
  colors: ColorScheme;
  layout: {
    spacing: 'compact' | 'comfortable' | 'spacious';
    style: 'card' | 'minimal' | 'flat';
    maxWidth: number;
  };
}

export const COMPANY_TEMPLATES: Record<string, ProfileTheme> = {
  google: {
    template: 'google',
    colors: {
      primary: '#4285F4',
      secondary: '#34A853',
      accent: '#EA4335',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: {
        primary: '#202124',
        secondary: '#5F6368',
      },
    },
    layout: {
      spacing: 'comfortable',
      style: 'minimal',
      maxWidth: 1200,
    },
  },
  microsoft: {
    template: 'microsoft',
    colors: {
      primary: '#0078D4',
      secondary: '#50E6FF',
      accent: '#FFB900',
      background: '#FFFFFF',
      surface: '#F5F5F5',
      text: {
        primary: '#323130',
        secondary: '#605E5C',
      },
    },
    layout: {
      spacing: 'spacious',
      style: 'card',
      maxWidth: 1200,
    },
  },
  amazon: {
    template: 'amazon',
    colors: {
      primary: '#232F3E',
      secondary: '#FF9900',
      accent: '#37475A',
      background: '#FFFFFF',
      surface: '#F8F8F8',
      text: {
        primary: '#0F1111',
        secondary: '#565959',
      },
    },
    layout: {
      spacing: 'compact',
      style: 'minimal',
      maxWidth: 1000,
    },
  },
  apple: {
    template: 'apple',
    colors: {
      primary: '#000000',
      secondary: '#86868B',
      accent: '#0066CC',
      background: '#FFFFFF',
      surface: '#FAFAFA',
      text: {
        primary: '#1D1D1F',
        secondary: '#86868B',
      },
    },
    layout: {
      spacing: 'spacious',
      style: 'minimal',
      maxWidth: 1000,
    },
  },
  modern: {
    template: 'modern',
    colors: {
      primary: '#2563EB',
      secondary: '#4B5563',
      accent: '#10B981',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: {
        primary: '#111827',
        secondary: '#6B7280',
      },
    },
    layout: {
      spacing: 'comfortable',
      style: 'card',
      maxWidth: 1200,
    },
  },
};

export const DEFAULT_THEME: ProfileTheme = {
  template: 'modern',
  colors: {
    primary: '#000000',
    secondary: '#666666',
    accent: '#0066cc',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  layout: {
    spacing: 'comfortable',
    style: 'card',
    maxWidth: 1200,
  },
};

export type ThemeTab = 'template' | 'colors' | 'layout';
