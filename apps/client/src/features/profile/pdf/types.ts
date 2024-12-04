export type PDFTemplate = 'modern' | 'classic' | 'technical' | 'creative';

export interface PDFExportOptions {
  template: PDFTemplate;
  pageSize: 'A4' | 'LETTER';
  colorScheme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  font?: 'inter' | 'roboto' | 'poppins';
  margins?: number;
}
