import { Section } from '../../types';

export interface SectionRendererProps {
  section: Section;
  className?: string;
}

export function assertSectionContent<T>(
  content: unknown,
  validator: (content: unknown) => content is T,
): asserts content is T {
  if (!validator(content)) {
    throw new Error('Invalid section content');
  }
}
