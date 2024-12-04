'use client';

import Badge from '@/components/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface FiltersProps {
  searchParams: { [key: string]: string | undefined };
  onFilterChange: (key: string, value: string | undefined) => void;
  skills: Array<{ id: string; name: string }>;
  specializations: Array<{ id: string; name: string }>;
  languages: Array<{ id: string; name: string }>;
}

export function DeveloperFilters({
  searchParams,
  onFilterChange,
  skills,
  specializations,
  languages,
}: FiltersProps) {
  return (
    <Card className="w-full sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Filters
          {Object.keys(searchParams).length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = '/developers')}
            >
              Clear all
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Specialization</label>
          <Select
            value={searchParams.specialization}
            onValueChange={(value) => onFilterChange('specialization', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec.id} value={spec.id}>
                  {spec.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Experience (years)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              min="0"
              value={searchParams.minExperience || ''}
              onChange={(e) => onFilterChange('minExperience', e.target.value || undefined)}
              className="w-24"
            />
            <span className="self-center">to</span>
            <Input
              type="number"
              placeholder="Max"
              min="0"
              value={searchParams.maxExperience || ''}
              onChange={(e) => onFilterChange('maxExperience', e.target.value || undefined)}
              className="w-24"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Hourly Rate ($)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              min="0"
              value={searchParams.minRate || ''}
              onChange={(e) => onFilterChange('minRate', e.target.value || undefined)}
              className="w-24"
            />
            <span className="self-center">to</span>
            <Input
              type="number"
              placeholder="Max"
              min="0"
              value={searchParams.maxRate || ''}
              onChange={(e) => onFilterChange('maxRate', e.target.value || undefined)}
              className="w-24"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Skills</label>
          <Select onValueChange={(value) => onFilterChange('skill', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>
            <SelectContent>
              {skills.map((skill) => (
                <SelectItem key={skill.id} value={skill.id}>
                  {skill.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {searchParams.skill && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              <Badge variant="secondary" className="flex gap-1 items-center">
                {skills.find((s) => s.id === searchParams.skill)?.name}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onFilterChange('skill', undefined)}
                />
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Spoken Languages</label>
          <Select onValueChange={(value) => onFilterChange('skill', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Languages" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {searchParams.lannguage && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              <Badge variant="secondary" className="flex gap-1 items-center">
                {languages.find((s) => s.id === searchParams.language)?.name}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onFilterChange('skill', undefined)}
                />
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input
            placeholder="Enter location"
            value={searchParams.location || ''}
            onChange={(e) => onFilterChange('location', e.target.value || undefined)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
