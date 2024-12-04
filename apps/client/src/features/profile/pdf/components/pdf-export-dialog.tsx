import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Roles } from '@/types/globals';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';
import { Download, Eye, Loader2 } from 'lucide-react';
import { useState } from 'react';
import type { ProfileData } from '../../types';
import { ProfilePDFDocument } from './pdf-document';

interface PDFExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ProfileData;
  role: Roles;
}

export function PDFExportDialog({ open, onOpenChange, data, role }: PDFExportDialogProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(true);

  const pdfDocument = <ProfilePDFDocument data={data} role={role} />;
  const fileName = `${role}-profile.pdf`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-lg max-h-screen overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Export Profile</DialogTitle>
          <DialogDescription>Preview your profile and download it as a PDF file</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <Button
            variant={isPreviewMode ? 'default' : 'outline'}
            onClick={() => setIsPreviewMode(true)}
            size="sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <BlobProvider document={pdfDocument}>
            {({ blob, url, loading, error }) => (
              <Button
                variant={!isPreviewMode ? 'default' : 'outline'}
                onClick={() => {
                  if (url) {
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = fileName;
                    link.click();
                  }
                  setIsPreviewMode(false);
                }}
                disabled={loading || !url || !!error}
                size="sm"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Download PDF
              </Button>
            )}
          </BlobProvider>
        </div>

        <div className="flex-1 min-h-0 bg-muted rounded-lg p-4">
          {isPreviewMode ? (
            <div className="h-full relative">
              <PDFViewer width="100%" height="100%" style={{ border: 'none', borderRadius: '8px' }}>
                {pdfDocument}
              </PDFViewer>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Ready to Download</h3>
                <p className="text-muted-foreground mb-4">
                  Click the Download PDF button above to save your profile
                </p>
                <BlobProvider document={pdfDocument}>
                  {({ blob, url, loading, error }) => (
                    <Button
                      onClick={() => {
                        if (url) {
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = fileName;
                          link.click();
                        }
                      }}
                      disabled={loading || !url || !!error}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      Download PDF
                    </Button>
                  )}
                </BlobProvider>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
