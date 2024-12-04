import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';
import { SectionEditorProps } from '.';
import { ContactContent } from '../../types';

export function ContactEditor({ content, onChange }: SectionEditorProps<ContactContent>) {
  const addSocialLink = () => {
    const newLinks = [...(content.socialLinks || []), { platform: '', url: '' }];
    onChange({ ...content, socialLinks: newLinks });
  };

  const updateSocialLink = (index: number, updates: Partial<{ platform: string; url: string }>) => {
    const newLinks =
      content.socialLinks?.map((link, i) => (i === index ? { ...link, ...updates } : link)) || [];
    onChange({ ...content, socialLinks: newLinks });
  };

  const removeSocialLink = (index: number) => {
    const newLinks = content.socialLinks?.filter((_, i) => i !== index) || [];
    onChange({ ...content, socialLinks: newLinks });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={content.email}
            onChange={(e) => onChange({ ...content, email: e.target.value })}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <Label>Phone (optional)</Label>
          <Input
            type="tel"
            value={content.phone || ''}
            onChange={(e) => onChange({ ...content, phone: e.target.value })}
            placeholder="+1 234 567 8900"
          />
        </div>

        <div>
          <Label>Location</Label>
          <Input
            value={content.location || ''}
            onChange={(e) => onChange({ ...content, location: e.target.value })}
            placeholder="City, Country"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Social Links</Label>
        </div>

        {content.socialLinks?.map((link, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Social Link {index + 1}</Label>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeSocialLink(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label>Platform</Label>
                  <Input
                    value={link.platform}
                    onChange={(e) => updateSocialLink(index, { platform: e.target.value })}
                    placeholder="e.g., LinkedIn, Twitter, GitHub"
                  />
                </div>
                <div>
                  <Label>URL</Label>
                  <Input
                    value={link.url}
                    onChange={(e) => updateSocialLink(index, { url: e.target.value })}
                    placeholder="https://"
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Button type="button" variant="outline" className="w-full" onClick={addSocialLink}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Social Link
        </Button>
      </div>
    </div>
  );
}
