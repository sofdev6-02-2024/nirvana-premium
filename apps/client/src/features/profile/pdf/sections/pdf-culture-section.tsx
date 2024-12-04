import { Text, View } from '@react-pdf/renderer';
import { sectionStyles } from '.';
import { CultureContent } from '../../types';

export function PDFCultureSection({ content }: { content: CultureContent }) {
  return (
    <View style={sectionStyles.section}>
      <Text style={sectionStyles.heading}>Company Culture</Text>

      <Text style={[sectionStyles.itemDescription, { marginBottom: 12 }]}>
        {content.description}
      </Text>

      <View style={sectionStyles.itemContainer}>
        <Text style={sectionStyles.itemTitle}>Our Principles</Text>
        <View style={{ gap: 8 }}>
          {content.principles.map((principle) => (
            <View key={principle.id} style={{ marginTop: 4 }}>
              <Text style={[sectionStyles.itemTitle, { fontSize: 11 }]}>{principle.title}</Text>
              <Text style={sectionStyles.itemDescription}>{principle.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
