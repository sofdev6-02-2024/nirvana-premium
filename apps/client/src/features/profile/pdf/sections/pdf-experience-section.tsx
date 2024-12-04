import { Text, View } from '@react-pdf/renderer';
import { sectionStyles } from '.';
import { ExperienceContent } from '../../types';

export function PDFExperienceSection({ content }: { content: ExperienceContent }) {
  return (
    <View style={sectionStyles.section}>
      <Text style={sectionStyles.heading}>Experience</Text>
      {content.positions.map((position) => (
        <View key={position.id} style={sectionStyles.itemContainer}>
          <Text style={sectionStyles.itemTitle}>{position.title}</Text>
          <Text style={sectionStyles.itemSubtitle}>
            {position.company} • {position.startDate} -{' '}
            {position.current ? 'Present' : position.endDate}
          </Text>
          <Text style={sectionStyles.itemDescription}>{position.description}</Text>
          {position.achievements && position.achievements?.length > 0 && (
            <View style={{ marginTop: 8 }}>
              {position.achievements.map((achievement, index) => (
                <Text key={index} style={[sectionStyles.itemDescription, { marginLeft: 12 }]}>
                  • {achievement}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
