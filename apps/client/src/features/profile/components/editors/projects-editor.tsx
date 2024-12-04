import Badge from '@/components/badge';
import { FileUpload } from '@/components/forms/file-upload';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import { Plus, PlusCircle, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { SectionEditorProps } from '.';
import { ProjectContent } from '../../types';

export function ProjectsEditor({ content, onChange }: SectionEditorProps<ProjectContent>) {
  const [newTech, setNewTech] = useState<Record<string, string>>({});
  const [newHighlight, setNewHighlight] = useState<Record<string, string>>({});

  const addProject = () => {
    const newProject = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      technologies: [],
      highlights: [],
    };

    onChange({
      projects: [...content.projects, newProject],
    });
  };

  const updateProject = (id: string, updates: Partial<ProjectContent['projects'][0]>) => {
    onChange({
      projects: content.projects.map((project) =>
        project.id === id ? { ...project, ...updates } : project,
      ),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      projects: content.projects.filter((project) => project.id !== id),
    });
  };

  const addTechnology = (projectId: string) => {
    const tech = newTech[projectId]?.trim();
    if (!tech) return;

    const project = content.projects.find((p) => p.id === projectId);
    if (!project) return;

    updateProject(projectId, {
      technologies: [...(project.technologies || []), tech],
    });

    setNewTech((prev) => ({
      ...prev,
      [projectId]: '',
    }));
  };

  const addHighlight = (projectId: string) => {
    const highlight = newHighlight[projectId]?.trim();
    if (!highlight) return;

    const project = content.projects.find((p) => p.id === projectId);
    if (!project) return;

    updateProject(projectId, {
      highlights: [...(project.highlights || []), highlight],
    });

    setNewHighlight((prev) => ({
      ...prev,
      [projectId]: '',
    }));
  };

  return (
    <div className="space-y-6">
      {content.projects.map((project, index) => (
        <Card key={project.id} className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Project {index + 1}</h3>
            <Button size="icon" variant="destructive" onClick={() => removeProject(project.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <Label>Project Image</Label>
              <FileUpload
                field={{
                  value: project.imageUrl || '',
                  onChange: (url: string) => updateProject(project.id, { imageUrl: url }),
                }}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Title</Label>
                <Input
                  value={project.title}
                  onChange={(e) => updateProject(project.id, { title: e.target.value })}
                  placeholder="Project title"
                />
              </div>

              <div>
                <Label>Link</Label>
                <Input
                  value={project.link}
                  onChange={(e) => updateProject(project.id, { link: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                placeholder="Describe your project..."
              />
            </div>

            <div className="space-y-2">
              <Label>Technologies</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies?.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="secondary" className="flex items-center gap-2">
                    {tech}
                    <button
                      onClick={() =>
                        updateProject(project.id, {
                          technologies: project.technologies?.filter((_, i) => i !== techIndex),
                        })
                      }
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTech[project.id] || ''}
                  onChange={(e) =>
                    setNewTech((prev) => ({
                      ...prev,
                      [project.id]: e.target.value,
                    }))
                  }
                  placeholder="Add a technology..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology(project.id);
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addTechnology(project.id)}
                  disabled={!newTech[project.id]?.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Highlights</Label>
              <div className="space-y-2">
                {project.highlights?.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-center gap-2">
                    <Input value={highlight} readOnly className="flex-1" />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() =>
                        updateProject(project.id, {
                          highlights: project.highlights?.filter((_, i) => i !== highlightIndex),
                        })
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="flex gap-2">
                  <Input
                    value={newHighlight[project.id] || ''}
                    onChange={(e) =>
                      setNewHighlight((prev) => ({
                        ...prev,
                        [project.id]: e.target.value,
                      }))
                    }
                    placeholder="Add a highlight..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addHighlight(project.id);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addHighlight(project.id)}
                    disabled={!newHighlight[project.id]?.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Button type="button" variant="outline" className="w-full" onClick={addProject}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
