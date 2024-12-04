import { Text, View } from '@react-pdf/renderer';
import { sectionStyles } from '.';
import { MissionContent } from '../../types';

export function PDFMissionSection({ content }: { content: MissionContent }) {
  return (
    <View style={sectionStyles.section}>
      <Text style={sectionStyles.heading}>Mission & Values</Text>

      <View style={sectionStyles.itemContainer}>
        <Text style={sectionStyles.itemTitle}>Our Mission</Text>
        <Text style={sectionStyles.itemDescription}>{content.mission}</Text>
      </View>

      {content.values.length > 0 && (
        <View style={[sectionStyles.itemContainer, { marginTop: 12 }]}>
          <Text style={sectionStyles.itemTitle}>Our Values</Text>
          <View style={{ gap: 8 }}>
            {content.values.map((value) => (
              <View key={value.id} style={{ marginTop: 4 }}>
                <Text style={[sectionStyles.itemTitle, { fontSize: 11 }]}>{value.title}</Text>
                <Text style={sectionStyles.itemDescription}>{value.description}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
