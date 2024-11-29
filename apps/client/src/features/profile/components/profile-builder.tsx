import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type {
  ProfileData,
  ProfileSection as ProfileSectionType,
} from '@/features/profile/lib/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Roles } from '@/types/globals';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Edit2, Eye, Laptop, Loader2, Plus, Save, Smartphone, Tablet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LayoutConfig, layoutConfigs } from '../lib/layout';
import { generateSectionId, parseProfile, SectionType, serializeProfile } from '../lib/profile';
import { profileDataSchema } from '../lib/validations';
import { AddSectionDialog } from './add-section-dialog';
import { ProfileSection } from './profile-section';
import { ProfileViewer } from './profile-viewer';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface ProfileBuilderProps {
  role: Roles;
  initialData?: string;
  onSave?: (data: string) => Promise<void>;
}

export function ProfileBuilder({ role, initialData, onSave }: ProfileBuilderProps) {
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    try {
      const draft = localStorage.getItem('profile-draft');
      if (draft) {
        const parsed = parseProfile(draft);
        profileDataSchema.parse(parsed);
        return parsed;
      }
      if (initialData) {
        const parsed = parseProfile(initialData);
        profileDataSchema.parse(parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Invalid stored/initial data:', error);
    }
    return { sections: [] };
  });

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [previewDevice, setPreviewDevice] = useState<DeviceType>('desktop');
  const [isAddingSectionOpen, setIsAddingSectionOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading] = useState(false);
  const { toast } = useToast();
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(layoutConfigs.default);

  useEffect(() => {
    try {
      profileDataSchema.parse(profileData);
      localStorage.setItem('profile-draft', serializeProfile(profileData));
    } catch (error) {
      console.error('Failed to save draft:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to save draft',
        description: 'There was an error saving your changes.',
      });
    }
  }, [profileData, toast]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    try {
      const sections = Array.from(profileData.sections);
      const [reorderedSection] = sections.splice(result.source.index, 1);
      sections.splice(result.destination.index, 0, {
        ...reorderedSection,
        layout: {
          ...reorderedSection.layout,
          order: result.destination.index,
        },
      });

      const updatedSections = sections.map((section, index) => ({
        ...section,
        layout: { ...section.layout, order: index },
      }));

      setProfileData({ sections: updatedSections });
    } catch (error) {
      console.error('Drag and drop error:', error);
      toast({
        variant: 'destructive',
        title: 'Error reordering sections',
        description: 'Failed to reorder sections. Please try again.',
      });
    }
  };

  const addSection = (type: SectionType) => {
    try {
      const sectionExists = profileData.sections.some((section) => section.type === type);

      if (sectionExists) {
        toast({
          variant: 'destructive',
          title: 'Section Limit Reached',
          description: `Only one ${type} section is allowed.`,
        });
        return;
      }

      const newSection: ProfileSectionType = {
        id: generateSectionId(),
        type,
        content: '{}',
        layout: {
          columns: 1,
          order: profileData.sections.length,
        },
      };

      setProfileData({
        ...profileData,
        sections: [...profileData.sections, newSection],
      });
      setIsAddingSectionOpen(false);
    } catch (error) {
      console.error('Failed to add section:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to add section',
        description: 'Please try again.',
      });
    }
  };

  const updateSection = (sectionId: string, updates: Partial<ProfileSectionType>) => {
    try {
      const updatedSections = profileData.sections.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section,
      );

      profileDataSchema.parse({ sections: updatedSections });
      setProfileData({ sections: updatedSections });
    } catch (error) {
      console.error('Failed to update section:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to update section',
        description: 'Please check your input and try again.',
      });
    }
  };

  const deleteSection = (sectionId: string) => {
    try {
      const updatedSections = profileData.sections
        .filter((section) => section.id !== sectionId)
        .map((section, index) => ({
          ...section,
          layout: { ...section.layout, order: index },
        }));

      setProfileData({ sections: updatedSections });
    } catch (error) {
      console.error('Failed to delete section:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to delete section',
        description: 'Please try again.',
      });
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      profileDataSchema.parse(profileData);
      const serializedData = serializeProfile(profileData);

      console.log('Formatted Profile Data:', JSON.stringify(JSON.parse(serializedData), null, 2));

      if (onSave) {
        await onSave(serializedData);
        localStorage.removeItem('profile-draft');

        toast({
          title: 'Profile saved successfully',
        });
      }
    } catch (error) {
      console.error('Save error:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to save profile',
        description: 'Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold">
          {role === 'Developer' ? 'Portfolio Builder' : 'Company Profile Builder'}
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as 'edit' | 'preview')}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {activeTab === 'edit' ? (
        <>
          <Button
            onClick={() => setIsAddingSectionOpen(true)}
            variant="outline"
            className="mb-6"
            disabled={isSaving}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                  {profileData.sections.map((section, index) => (
                    <ProfileSection
                      key={section.id}
                      section={section}
                      index={index}
                      role={role}
                      onUpdate={(updates) => updateSection(section.id, updates)}
                      onDelete={() => deleteSection(section.id)}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                onClick={() => setPreviewDevice('desktop')}
                className="flex-1 sm:flex-none"
              >
                <Laptop className="w-4 h-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                onClick={() => setPreviewDevice('tablet')}
                className="flex-1 sm:flex-none"
              >
                <Tablet className="w-4 h-4 mr-2" />
                Tablet
              </Button>
              <Button
                variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                onClick={() => setPreviewDevice('mobile')}
                className="flex-1 sm:flex-none"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full sm:w-auto">
                <Select
                  value={layoutConfig.sectionStyle}
                  onValueChange={(value: LayoutConfig['sectionStyle']) =>
                    setLayoutConfig((prev) => ({ ...prev, sectionStyle: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="bordered">Bordered</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={layoutConfig.spacing}
                  onValueChange={(value: LayoutConfig['spacing']) =>
                    setLayoutConfig((prev) => ({ ...prev, spacing: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Spacing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="relaxed">Relaxed</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={layoutConfig.background}
                  onValueChange={(value: LayoutConfig['background']) =>
                    setLayoutConfig((prev) => ({ ...prev, background: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="subtle">Subtle</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div
            className={cn('mx-auto transition-all duration-300', {
              'max-w-[375px]': previewDevice === 'mobile',
              'max-w-[768px]': previewDevice === 'tablet',
              'max-w-none': previewDevice === 'desktop',
            })}
          >
            <ProfileViewer
              profileText={serializeProfile(profileData)}
              role={role}
              layoutConfig={layoutConfig}
            />
          </div>
        </div>
      )}

      <AddSectionDialog
        role={role}
        open={isAddingSectionOpen}
        onOpenChange={setIsAddingSectionOpen}
        onAdd={addSection}
      />
    </div>
  );
}
