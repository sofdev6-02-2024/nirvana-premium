import { Loader2 } from 'lucide-react';

export function PDFLoading() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="w-8 h-8 animate-spin mb-4" />
      <p className="text-muted-foreground">Preparing PDF...</p>
    </div>
  );
}
