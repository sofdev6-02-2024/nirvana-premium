export const generateSectionId = (): string => {
  return `section_${crypto.randomUUID()}`;
};
