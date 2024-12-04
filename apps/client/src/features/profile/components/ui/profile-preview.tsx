import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Roles } from '@/types/globals';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { useState } from 'react';
import type { PreviewSize, ProfileData } from '../../types';
import { SectionRenderer } from '../sections/section-renderer';

interface ProfilePreviewProps {
  data: ProfileData;
  role: Roles;
  isBuilder?: boolean;
  className?: string;
}

export function ProfilePreview({ data, role, isBuilder = false, className }: ProfilePreviewProps) {
  const [previewSize, setPreviewSize] = useState<PreviewSize>('desktop');

  return (
    <div className="space-y-4">
      {isBuilder && (
        <div className="flex gap-2 justify-end">
          <Button
            variant={previewSize === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewSize('mobile')}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
          <Button
            variant={previewSize === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewSize('tablet')}
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={previewSize === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPreviewSize('desktop')}
          >
            <Monitor className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div
        className={cn(
          'mx-auto transition-all duration-300',
          {
            'max-w-[375px]': isBuilder && previewSize === 'mobile',
            'max-w-[768px]': isBuilder && previewSize === 'tablet',
            'max-w-none': !isBuilder || previewSize === 'desktop',
          },
          className,
        )}
      >
        <div className="space-y-6">
          {data.sections
            .sort((a, b) => a.layout.order - b.layout.order)
            .map((section) => (
              <SectionRenderer
                key={section.id}
                section={section}
                role={role}
                className={cn('transition-all duration-300', {
                  'grid gap-6': section.layout.columns > 1,
                  'grid-cols-1':
                    section.layout.columns === 1 || (isBuilder && previewSize === 'mobile'),
                  'grid-cols-2':
                    section.layout.columns === 2 && (!isBuilder || previewSize !== 'mobile'),
                  'grid-cols-3':
                    section.layout.columns === 3 && (!isBuilder || previewSize !== 'mobile'),
                })}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
