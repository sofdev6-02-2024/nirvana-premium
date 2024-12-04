import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Roles } from '@/types/globals';
import { getSectionsByRole, Section, SECTION_CONSTRAINTS, SectionType } from '../../types';

interface AddSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (type: SectionType) => void;
  role: Roles;
  existingSections: Section[];
}

export function AddSectionDialog({
  open,
  onOpenChange,
  onAdd,
  role,
  existingSections,
}: AddSectionDialogProps) {
  const availableSections = getSectionsByRole(role);

  const canAddSection = (type: SectionType) => {
    const existingCount = existingSections.filter((s) => s.type === type).length;
    const maxAllowed = SECTION_CONSTRAINTS[type].max;
    return existingCount < maxAllowed;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Section</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {availableSections.map((type) => (
            <Button
              key={type}
              onClick={() => onAdd(type)}
              variant="outline"
              className="h-24 flex flex-col gap-2"
              disabled={!canAddSection(type)}
            >
              <span className="text-sm font-medium">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
              {!canAddSection(type) && (
                <span className="text-xs text-muted-foreground">Maximum limit reached</span>
              )}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
