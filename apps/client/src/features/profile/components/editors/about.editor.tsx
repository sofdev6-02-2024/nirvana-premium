import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { SectionEditorProps } from '.';
import { AboutContent } from '../../types';

export function AboutEditor({ content, onChange }: SectionEditorProps<AboutContent>) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Headline (optional)</Label>
        <Input
          value={content.headline || ''}
          onChange={(e) => onChange({ ...content, headline: e.target.value })}
          placeholder="A brief headline about yourself or your role..."
        />
      </div>

      <div className="space-y-2">
        <Label>About</Label>
        <Textarea
          value={content.text}
          onChange={(e) => onChange({ ...content, text: e.target.value })}
          placeholder="Write about yourself, your experience, and what drives you..."
          className="min-h-[200px]"
        />
      </div>

      <div className="space-y-2">
        <Label>Specialization (optional)</Label>
        <Input
          value={content.specialization || ''}
          onChange={(e) => onChange({ ...content, specialization: e.target.value })}
          placeholder="Your main area of expertise..."
        />
      </div>
    </div>
  );
}
