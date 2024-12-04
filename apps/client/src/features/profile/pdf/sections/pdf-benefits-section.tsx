import { Text, View } from '@react-pdf/renderer';
import { sectionStyles } from '.';
import { BenefitsContent } from '../../types';

export function PDFBenefitsSection({ content }: { content: BenefitsContent }) {
  return (
    <View style={sectionStyles.section}>
      <Text style={sectionStyles.heading}>Benefits</Text>
      <View style={{ gap: 12 }}>
        {content.benefits.map((benefit) => (
          <View key={benefit.id} style={sectionStyles.itemContainer}>
            <Text style={sectionStyles.itemTitle}>
              {benefit.icon} {benefit.title}
            </Text>
            <Text style={sectionStyles.itemDescription}>{benefit.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
