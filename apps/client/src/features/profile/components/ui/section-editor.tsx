import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Draggable } from '@hello-pangea/dnd';
import { Columns, Columns2, Columns3, GripVertical, Trash2 } from 'lucide-react';
import { Section, SECTION_CONSTRAINTS, SectionType } from '../../types';
import {
  AboutEditor,
  BenefitsEditor,
  ContactEditor,
  CultureEditor,
  ExperienceEditor,
  MissionEditor,
  ProjectsEditor,
  SkillsEditor,
  TeamEditor,
} from '../editors';

interface SectionEditorProps {
  section: Section;
  index: number;
  onUpdate: (updates: Partial<Section>) => void;
  onDelete: () => void;
}

const SECTION_EDITORS: Record<SectionType, React.ComponentType<any>> = {
  about: AboutEditor,
  skills: SkillsEditor,
  experience: ExperienceEditor,
  projects: ProjectsEditor,
  contact: ContactEditor,
  mission: MissionEditor,
  benefits: BenefitsEditor,
  team: TeamEditor,
  culture: CultureEditor,
};

export function SectionEditor({ section, index, onUpdate, onDelete }: SectionEditorProps) {
  const Editor = SECTION_EDITORS[section.type];
  const constraint = SECTION_CONSTRAINTS[section.type];

  const handleLayoutChange = (columns: 1 | 2 | 3) => {
    if (constraint.allowedColumns.includes(columns)) {
      onUpdate({ layout: { ...section.layout, columns } });
    }
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
                  {constraint.allowedColumns.includes(1) && (
                    <Button
                      variant={section.layout.columns === 1 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleLayoutChange(1)}
                    >
                      <Columns className="w-4 h-4" />
                    </Button>
                  )}
                  {constraint.allowedColumns.includes(2) && (
                    <Button
                      variant={section.layout.columns === 2 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleLayoutChange(2)}
                    >
                      <Columns2 className="w-4 h-4" />
                    </Button>
                  )}
                  {constraint.allowedColumns.includes(3) && (
                    <Button
                      variant={section.layout.columns === 3 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleLayoutChange(3)}
                    >
                      <Columns3 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <Button variant="destructive" size="sm" onClick={onDelete}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Editor content={section.content} onChange={(content) => onUpdate({ content })} />
          </Card>
        </div>
      )}
    </Draggable>
  );
}
