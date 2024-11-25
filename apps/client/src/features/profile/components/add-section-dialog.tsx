import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Roles } from '@/types/globals';
import { SECTION_CONFIGS, SectionType } from '../lib/profile';

interface AddSectionDialogProps {
  role: Roles;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (type: SectionType) => void;
}

export function AddSectionDialog({ role, open, onOpenChange, onAdd }: AddSectionDialogProps) {
  const availableSections = SECTION_CONFIGS[role];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 p-4">
          {availableSections.map((section) => (
            <Button
              key={section.type}
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => onAdd(section.type)}
            >
              {section.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
