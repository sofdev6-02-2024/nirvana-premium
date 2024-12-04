import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Edit2, Eye, Loader2, Palette, Plus, Save } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { profileService } from '../../lib/profile-service';

import { generateSectionId } from '../../lib/section';
import { createDefaultContent, createDefaultProfileData } from '../../lib/utils';
import {
  ProfileBuilderProps,
  ProfileData,
  ProfileTheme,
  Section,
  SECTION_CONSTRAINTS,
  SectionType,
} from '../../types';
import { ThemeCustomizer } from '../theme/theme-customizer';
import { AddSectionDialog } from '../ui/add-section-dialog';
import { ProfilePreview } from '../ui/profile-preview';
import { SectionEditor } from '../ui/section-editor';

export function ProfileBuilder({ userId, role }: ProfileBuilderProps) {
  const [data, setData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [isAddingSectionOpen, setIsAddingSectionOpen] = useState(false);
  const [isCustomizingTheme, setIsCustomizingTheme] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const draft = await profileService.getDraft(userId);
        if (draft) {
          setData(draft);
          toast({
            title: 'Draft loaded',
            description: 'Continuing from your last saved draft.',
          });
          return;
        }

        const profile = await profileService.getProfile(userId);
        setData(profile || createDefaultProfileData());
      } catch (error) {
        console.error('Failed to load profile:', error);
        toast({
          variant: 'destructive',
          title: 'Error loading profile',
          description: 'Failed to load your profile. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [userId, toast]);

  useEffect(() => {
    if (!data) return;

    const saveDraft = async () => {
      try {
        await profileService.saveDraft(userId, data);
      } catch (error) {
        console.error('Failed to save draft:', error);
      }
    };

    const timeoutId = setTimeout(saveDraft, 1000);
    return () => clearTimeout(timeoutId);
  }, [data, userId]);

  const handleAddSection = useCallback(
    (type: SectionType) => {
      if (!data) return;

      const existingSection = data.sections.find((section) => section.type === type);
      const constraint = SECTION_CONSTRAINTS[type];

      if (existingSection && constraint.max === 1) {
        toast({
          variant: 'destructive',
          title: 'Section limit reached',
          description: `Only one ${type} section is allowed.`,
        });
        return;
      }

      const newSection: Section = {
        id: generateSectionId(),
        type,
        content: createDefaultContent(type),
        layout: {
          columns: constraint.allowedColumns[0],
          order: data.sections.length,
        },
      };

      setData((prev) =>
        prev
          ? {
              ...prev,
              sections: [...prev.sections, newSection],
              metadata: {
                ...prev.metadata,
                lastUpdated: new Date().toISOString(),
              },
            }
          : null,
      );
      setIsAddingSectionOpen(false);
    },
    [data, toast],
  );

  const handleSaveAndPublish = async () => {
    if (!data) return;

    try {
      setIsSaving(true);
      const published = await profileService.publishProfile(userId, data);
      setData(published);
      await profileService.deleteDraft(userId);
      toast({
        title: 'Profile published',
        description: 'Your profile has been saved and published successfully.',
      });
    } catch (error) {
      console.error('Failed to publish profile:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to publish',
        description: 'There was an error publishing your profile. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination || !data) return;

      const sections = Array.from(data.sections);
      const [reorderedSection] = sections.splice(result.source.index, 1);
      sections.splice(result.destination.index, 0, reorderedSection);

      const updatedSections = sections.map((section, index) => ({
        ...section,
        layout: { ...section.layout, order: index },
      }));

      setData((prev) =>
        prev
          ? {
              ...prev,
              sections: updatedSections,
              metadata: {
                ...prev.metadata,
                lastUpdated: new Date().toISOString(),
              },
            }
          : null,
      );
    },
    [data],
  );

  const handleThemeChange = useCallback((newTheme: ProfileTheme) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            theme: newTheme,
            metadata: {
              ...prev.metadata,
              lastUpdated: new Date().toISOString(),
            },
          }
        : null,
    );
  }, []);

  const handleUpdateSection = useCallback((sectionId: string, updates: Partial<Section>) => {
    setData((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === sectionId ? { ...section, ...updates } : section,
        ),
        metadata: {
          ...prev.metadata,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  }, []);

  const handleDeleteSection = useCallback((sectionId: string) => {
    setData((prev) => {
      if (!prev) return null;

      const updatedSections = prev.sections
        .filter((section) => section.id !== sectionId)
        .map((section, index) => ({
          ...section,
          layout: { ...section.layout, order: index },
        }));

      return {
        ...prev,
        sections: updatedSections,
        metadata: {
          ...prev.metadata,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Error loading profile</h2>
          <p className="text-muted-foreground">Please refresh the page to try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {role === 'developer' ? 'Portfolio Builder' : 'Company Profile'}
        </h1>

        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setIsCustomizingTheme(true)}>
            <Palette className="w-4 h-4 mr-2" />
            Customize Theme
          </Button>

          <Tabs
            value={isEditing ? 'edit' : 'preview'}
            onValueChange={(v) => setIsEditing(v === 'edit')}
          >
            <TabsList>
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

          <Button onClick={handleSaveAndPublish} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Dialog open={isCustomizingTheme} onOpenChange={setIsCustomizingTheme}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Customize Theme</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-[300px,1fr] gap-6">
            <ThemeCustomizer
              theme={data.theme}
              sections={data.sections}
              onChange={handleThemeChange}
            />
            <div className="overflow-auto max-h-[600px]">
              <ProfilePreview data={data} role={role} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {isEditing ? (
        <>
          <Button onClick={() => setIsAddingSectionOpen(true)} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {data.sections
                    .sort((a, b) => a.layout.order - b.layout.order)
                    .map((section, index) => (
                      <SectionEditor
                        key={section.id}
                        section={section}
                        index={index}
                        onUpdate={(updates) => handleUpdateSection(section.id, updates)}
                        onDelete={() => handleDeleteSection(section.id)}
                      />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      ) : (
        <ProfilePreview data={data} role={role} isBuilder={true} />
      )}

      <AddSectionDialog
        open={isAddingSectionOpen}
        onOpenChange={setIsAddingSectionOpen}
        onAdd={handleAddSection}
        role={role}
        existingSections={data.sections}
      />
    </div>
  );
}
