import type { Roles } from '@/types/globals';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { defaultStyles } from '../../lib/setup-pdf';
import type { ProfileData, Section } from '../../types';
import {
  PDFAboutSection,
  PDFBenefitsSection,
  PDFContactSection,
  PDFCultureSection,
  PDFExperienceSection,
  PDFMissionSection,
  PDFProjectsSection,
  PDFSkillsSection,
  PDFTeamSection,
} from '../sections';
import {
  isAboutSection,
  isBenefitsSection,
  isContactSection,
  isCultureSection,
  isExperienceSection,
  isMissionSection,
  isProjectsSection,
  isSkillsSection,
  isTeamSection,
} from '../sections/pdf-section-types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Inter',
  },
  section: {
    marginBottom: 20,
  },
  text: defaultStyles.text,
  heading: defaultStyles.heading,
});

interface PDFDocumentProps {
  data: ProfileData;
  role: Roles;
}

export function ProfilePDFDocument({ data, role }: PDFDocumentProps) {
  const renderSection = (section: Section) => {
    if (isAboutSection(section)) {
      return <PDFAboutSection content={section.content} />;
    }

    if (isContactSection(section)) {
      return <PDFContactSection content={section.content} />;
    }

    // Developer sections
    if (role === 'developer') {
      if (isSkillsSection(section)) {
        return <PDFSkillsSection content={section.content} />;
      }
      if (isExperienceSection(section)) {
        return <PDFExperienceSection content={section.content} />;
      }
      if (isProjectsSection(section)) {
        return <PDFProjectsSection content={section.content} />;
      }
    }

    // Recruiter sections
    if (role === 'recruiter') {
      if (isMissionSection(section)) {
        return <PDFMissionSection content={section.content} />;
      }
      if (isBenefitsSection(section)) {
        return <PDFBenefitsSection content={section.content} />;
      }
      if (isTeamSection(section)) {
        return <PDFTeamSection content={section.content} />;
      }
      if (isCultureSection(section)) {
        return <PDFCultureSection content={section.content} />;
      }
    }

    return null;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>
            {role === 'developer' ? 'Developer Profile' : 'Company Profile'}
          </Text>
          {data.sections.map((section) => (
            <View key={section.id} style={styles.section}>
              <Text style={styles.heading}>
                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
              </Text>
              <View key={section.id}>{renderSection(section)}</View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
