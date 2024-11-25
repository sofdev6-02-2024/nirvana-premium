import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ContactContent } from '@/features/profile/lib/types';
import { PlusCircle, X } from 'lucide-react';

interface ContactEditorProps {
  content: ContactContent;
  onChange: (content: ContactContent) => void;
}

export function ContactEditor({ content, onChange }: ContactEditorProps) {
  const handleFieldChange = (field: keyof ContactContent, value: string) => {
    onChange({
      ...content,
      [field]: value,
    });
  };

  const handleSocialLinkChange = (index: number, field: 'platform' | 'url', value: string) => {
    const updatedLinks = [...(content.socialLinks || [])];
    if (!updatedLinks[index]) {
      updatedLinks[index] = { platform: '', url: '' };
    }
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    };
    onChange({
      ...content,
      socialLinks: updatedLinks,
    });
  };

  const addSocialLink = () => {
    const updatedLinks = [...(content.socialLinks || []), { platform: '', url: '' }];
    onChange({
      ...content,
      socialLinks: updatedLinks,
    });
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = (content.socialLinks || []).filter((_, i) => i !== index);
    onChange({
      ...content,
      socialLinks: updatedLinks,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={content.email || ''}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <Label>Phone (optional)</Label>
          <Input
            type="tel"
            value={content.phone || ''}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            placeholder="+1 234 567 8900"
          />
        </div>

        <div>
          <Label>Location</Label>
          <Input
            value={content.location || ''}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            placeholder="City, Country"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-base">Social Links</Label>
        </div>

        {(content.socialLinks || []).map((link, index) => (
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
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Platform</Label>
                  <Input
                    value={link.platform}
                    onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                    placeholder="Platform (e.g., LinkedIn)"
                  />
                </div>
                <div>
                  <Label>URL</Label>
                  <Input
                    value={link.url}
                    onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
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
