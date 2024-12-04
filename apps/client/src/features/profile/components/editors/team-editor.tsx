import { FileUpload } from '@/components/forms/file-upload';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { TeamContent } from '../../types';

interface TeamEditorProps {
  content: TeamContent;
  onChange: (content: TeamContent) => void;
}

export function TeamEditor({ content, onChange }: TeamEditorProps) {
  const addTeamMember = () => {
    onChange({
      members: [
        ...content.members,
        {
          id: crypto.randomUUID(),
          name: '',
          position: '',
          imageUrl: '',
          description: '',
        },
      ],
    });
  };

  const updateMember = (id: string, updates: Partial<TeamContent['members'][0]>) => {
    onChange({
      members: content.members.map((member) =>
        member.id === id ? { ...member, ...updates } : member,
      ),
    });
  };

  const removeMember = (id: string) => {
    onChange({
      members: content.members.filter((member) => member.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {content.members.map((member, index) => (
        <Card key={member.id} className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Team Member {index + 1}</h3>
            <Button size="icon" variant="destructive" onClick={() => removeMember(member.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid gap-4">
            <div>
              <Label>Photo</Label>
              <Controller
                name={`members.${index}.imageUrl`}
                defaultValue={member.imageUrl}
                render={({ field }) => (
                  <FileUpload
                    field={field}
                    onUploadError={(error) => {
                      console.error('Upload error:', error);
                    }}
                  />
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Input
                  value={member.name}
                  onChange={(e) => updateMember(member.id, { name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label>Position</Label>
                <Input
                  value={member.position}
                  onChange={(e) => updateMember(member.id, { position: e.target.value })}
                  placeholder="Software Engineer"
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={member.description || ''}
                onChange={(e) => updateMember(member.id, { description: e.target.value })}
                placeholder="Brief description about the team member..."
              />
            </div>
          </div>
        </Card>
      ))}

      <Button type="button" variant="outline" className="w-full" onClick={addTeamMember}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Team Member
      </Button>
    </div>
  );
}
