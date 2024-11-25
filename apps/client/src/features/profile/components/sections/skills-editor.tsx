import Badge from '@/components/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getSkills } from '@/lib/developer-api';
import { Skill } from '@/types/dev';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { skillsSchema } from '../../lib/validations';

interface SkillsEditorProps {
  content: { selectedSkills?: string[] };
  onChange: (content: { selectedSkills: string[] }) => void;
}

export function SkillsEditor({ content, onChange }: SkillsEditorProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const { toast } = useToast();

  const selectedSkills = content?.selectedSkills ?? [];

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const skillsData = await getSkills();
        setSkills(skillsData ?? []);
        setFilteredSkills(skillsData ?? []);
      } catch (error) {
        console.error('Error loading skills:', error);
        toast({
          variant: 'destructive',
          title: 'Error loading skills',
          description: 'Please try again later',
        });
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, [toast]);

  useEffect(() => {
    const filtered = skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredSkills(filtered);
  }, [searchTerm, skills]);

  const handleSelect = (skillName: string) => {
    try {
      const newSkills = selectedSkills.includes(skillName)
        ? selectedSkills.filter((name) => name !== skillName)
        : [...selectedSkills, skillName];

      skillsSchema.parse({ selectedSkills: newSkills });
      onChange({ selectedSkills: newSkills });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Invalid selection',
        description: 'Please select at least one skill',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {selectedSkills.length ? `${selectedSkills.length} selected` : 'Select skills...'}
        </Button>

        {showDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
            <div className="p-2">
              <Input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className={`px-4 py-2 cursor-pointer hover:bg-accent ${
                    selectedSkills.includes(skill.name) ? 'bg-accent' : ''
                  }`}
                  onClick={() => {
                    handleSelect(skill.name);
                    setSearchTerm('');
                  }}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill.name)}
                      onChange={() => {}}
                      className="mr-2"
                    />
                    {skill.name}
                  </div>
                </div>
              ))}
              {filteredSkills.length === 0 && (
                <div className="px-4 py-2 text-gray-500">No skills found</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedSkills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => handleSelect(skill)}
          >
            {skill}
            <span className="ml-1">×</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
