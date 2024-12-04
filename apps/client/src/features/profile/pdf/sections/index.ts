import { StyleSheet } from '@react-pdf/renderer';

export const sectionStyles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2563eb',
  },
  content: {
    fontSize: 11,
    lineHeight: 1.5,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f1f5f9',
    padding: '4 8',
    borderRadius: 4,
    fontSize: 10,
  },
  itemContainer: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'medium',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 11,
    lineHeight: 1.4,
  },
});

export { PDFAboutSection } from './pdf-about-section';
export { PDFContactSection } from './pdf-contact-section';
export { PDFExperienceSection } from './pdf-experience-section';
export { PDFProjectsSection } from './pdf-projects-section';
export { PDFSkillsSection } from './pdf-skills-section';

export { PDFBenefitsSection } from './pdf-benefits-section';
export { PDFCultureSection } from './pdf-culture-section';
export { PDFMissionSection } from './pdf-mission-section';
export { PDFTeamSection } from './pdf-team-section';
