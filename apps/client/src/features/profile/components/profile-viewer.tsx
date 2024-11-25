import { cn } from '@/lib/utils';
import { Roles } from '@/types/globals';
import { LayoutConfig, layoutConfigs } from '../lib/layout';
import { ProfileSection } from '../lib/types';
import { SectionViewer } from './section-viewer';
import { useLayoutStyles } from './use-layout-styles';

interface ProfileViewerProps {
  profileText: string;
  role: Roles;
  layoutConfig?: LayoutConfig;
  className?: string;
}

export function ProfileViewer({
  profileText,
  role,
  layoutConfig = layoutConfigs.default,
  className,
}: ProfileViewerProps) {
  const styles = useLayoutStyles(layoutConfig);
  const profile = JSON.parse(profileText) as { sections: ProfileSection[] };

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.sectionsGrid}>
        {profile.sections
          .sort((a, b) => a.layout.order - b.layout.order)
          .map((section) => (
            <div
              key={section.id}
              className={cn(
                styles.section,
                styles.columnClasses[section.layout.columns as 1 | 2 | 3],
              )}
              data-section-type={section.type}
            >
              <SectionViewer section={section} role={role} />
            </div>
          ))}
      </div>
    </div>
  );
}
