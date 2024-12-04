'use client';

import LoadingScreen from '@/components/loading/loading-screen';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserStore } from '@/features/users/store/user-store';
import { useToast } from '@/hooks/use-toast';
import { Roles } from '@/types/globals';
import { useAuth } from '@clerk/nextjs';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Download, Edit2, Eye, Loader2, Palette, Plus, Save } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ThemeCustomizer } from '../components/theme/theme-customizer';
import { AddSectionDialog } from '../components/ui/add-section-dialog';
import { ProfilePreview } from '../components/ui/profile-preview';
import { SectionEditor } from '../components/ui/section-editor';
import { loadProfileData, saveProfileData } from '../lib/profile-service';
import { generateSectionId } from '../lib/section';
import { createDefaultContent } from '../lib/utils';
import { PDFExportDialog } from '../pdf/components/pdf-export-dialog';
import {
  SECTION_CONSTRAINTS,
  type ProfileData,
  type ProfileTheme,
  type Section,
  type SectionType,
} from '../types';

interface ProfileBuilderPageProps {
  role: Roles;
}

export default function ProfileBuilderPage({ role }: ProfileBuilderPageProps) {
  const [data, setData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [isAddingSectionOpen, setIsAddingSectionOpen] = useState(false);
  const [isCustomizingTheme, setIsCustomizingTheme] = useState(false);
  const [isPDFDialogOpen, setIsPDFDialogOpen] = useState(false);

  const { user } = useUserStore();
  const { toast } = useToast();
  const { getToken } = useAuth();

  const userId = role.toLowerCase() === 'developer' ? user?.developerId : user?.recruiterId;

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const loadedData = await loadProfileData(userId, role);

        if (
          loadedData &&
          typeof loadedData === 'object' &&
          'sections' in loadedData &&
          'theme' in loadedData &&
          'metadata' in loadedData
        ) {
          setData(loadedData as ProfileData);
        } else {
          setData(null);
          toast({
            title: 'Start building your profile',
            description: 'Create your profile from scratch.',
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setData(null);
        toast({
          title: 'Error loading existing profile',
          description: 'You can start building your profile from scratch.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [userId, role, toast]);

  const handleSaveAndPublish = async () => {
    if (!userId || !data) return;

    try {
      setIsSaving(true);
      const token = await getToken();
      if (!token) throw new Error('Authentication token not available');
      console.log('Token', token);
      console.log('Body', data);
      console.log('user id', userId);
      await saveProfileData(userId, role, data, token);
      toast({
        title: 'Profile saved',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error saving profile',
        description: 'Failed to save your profile changes.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSection = useCallback(
    (type: SectionType) => {
      if (!data) {
        const initialData: ProfileData = {
          sections: [],
          theme: {
            template: 'modern',
            layout: {
              spacing: 'comfortable',
              style: 'card',
              maxWidth: 1200,
            },
            colors: {
              primary: 'hsl(24.6 95% 53.1%)', // --primary
              secondary: 'hsl(60 4.8% 95.9%)', // --secondary
              accent: 'hsl(60 4.8% 95.9%)', // --accent
              background: 'hsl(0 0% 100%)', // --background
              surface: 'hsl(60 4.8% 95.9%)', // --muted
              text: {
                primary: 'hsl(20 14.3% 4.1%)', // --foreground
                secondary: 'hsl(25 5.3% 44.7%)', // --muted-foreground
              },
            },
          },
          metadata: {
            lastUpdated: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            isPublished: false,
            version: 1,
            isDraft: false,
          },
        };
        setData(initialData);
      }

      const newSection: Section = {
        id: generateSectionId(),
        type,
        content: createDefaultContent(type),
        layout: {
          columns: SECTION_CONSTRAINTS[type].allowedColumns[0],
          order: data?.sections.length || 0,
        },
      };

      setData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          sections: [...prev.sections, newSection],
          metadata: {
            ...prev.metadata,
            lastUpdated: new Date().toISOString(),
          },
        };
      });
      setIsAddingSectionOpen(false);
    },
    [data],
  );

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
    return <LoadingScreen />;
  }

  if (!userId) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">
          {role === 'developer' ? 'Developer profile not found.' : 'Recruiter profile not found.'}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {role === 'developer' ? 'CV Builder' : 'Company Profile'}
        </h1>

        <div className="flex items-center gap-4">
          {data && (
            <>
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

              <Button variant="outline" onClick={() => setIsPDFDialogOpen(true)}>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </>
          )}

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

      {!data ? (
        <div className="text-center space-y-4 py-12">
          <p className="text-muted-foreground">Get started by adding your first section</p>
          <Button onClick={() => setIsAddingSectionOpen(true)} className="mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Add First Section
          </Button>
        </div>
      ) : (
        <>
          {isEditing ? (
            <>
              <Button
                onClick={() => setIsAddingSectionOpen(true)}
                variant="outline"
                className="w-full"
              >
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
        </>
      )}

      <AddSectionDialog
        open={isAddingSectionOpen}
        onOpenChange={setIsAddingSectionOpen}
        onAdd={handleAddSection}
        role={role}
        existingSections={data?.sections || []}
      />

      {data && (
        <>
          <Dialog open={isCustomizingTheme} onOpenChange={setIsCustomizingTheme}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Customize Theme</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-[300px,1fr] gap-6">
                <ThemeCustomizer theme={data.theme} onChange={handleThemeChange} />
                <div className="overflow-auto max-h-[600px]">
                  <ProfilePreview data={data} role={role} isBuilder={true} />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <PDFExportDialog
            open={isPDFDialogOpen}
            onOpenChange={setIsPDFDialogOpen}
            data={data}
            role={role}
          />
        </>
      )}
    </div>
  );
}
