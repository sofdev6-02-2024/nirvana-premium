import { cn } from '@/lib/utils';
import { LayoutConfig, layoutStyles } from '../lib/layout';

export function useLayoutStyles(config: LayoutConfig) {
  return {
    container: cn(
      'w-full transition-all duration-300',
      layoutStyles.spacing[config.spacing].container,
      layoutStyles.background[config.background],
    ),
    sectionsGrid: cn('grid grid-cols-12', layoutStyles.spacing[config.spacing].sections),
    section: cn('transition-all duration-300', layoutStyles.sectionStyle[config.sectionStyle]),
    columnClasses: {
      1: 'col-span-12',
      2: 'col-span-12 md:col-span-6',
      3: 'col-span-12 md:col-span-6 lg:col-span-4',
    },
  };
}
