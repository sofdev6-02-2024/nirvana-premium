import { Card } from '@/components/ui/card';
import { Badge } from 'lucide-react';

interface SkillsViewerProps {
  content: SkillContent;
}

export function SkillsViewer({ content }: SkillsViewerProps) {
  const { selectedSkills } = content;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {selectedSkills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
    </Card>
  );
}
