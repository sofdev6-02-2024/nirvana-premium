import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Roles } from '@/types/globals';
import { Draggable } from '@hello-pangea/dnd';
import { Columns, Columns2, Columns3, GripVertical, Trash2 } from 'lucide-react';
import type { ProfileSection } from '../lib/types';

import { SectionEditor } from './sections';

interface ProfileSectionProps {
  section: ProfileSection;
  index: number;
  role: Roles;
  onUpdate: (updates: Partial<ProfileSection>) => void;
  onDelete: () => void;
}

export function ProfileSection({ section, index, role, onUpdate, onDelete }: ProfileSectionProps) {
  const handleLayoutChange = (columns: 1 | 2 | 3) => {
    onUpdate({
      layout: {
        ...section.layout,
        columns,
      },
    });
  };
  return (
    <Draggable draggableId={section.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div {...provided.dragHandleProps} className="cursor-move hover:text-primary">
                <GripVertical className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <Button
                    variant={section.layout.columns === 1 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleLayoutChange(1)}
                  >
                    <Columns className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={section.layout.columns === 2 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleLayoutChange(2)}
                  >
                    <Columns2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={section.layout.columns === 3 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleLayoutChange(3)}
                  >
                    <Columns3 className="w-4 h-4" />
                  </Button>
                </div>

                <Button variant="destructive" size="sm" onClick={onDelete}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <SectionEditor
              type={section.type}
              content={section.content}
              role={role}
              onChange={(content) => onUpdate({ content })}
            />
          </Card>
        </div>
      )}
    </Draggable>
  );
}
