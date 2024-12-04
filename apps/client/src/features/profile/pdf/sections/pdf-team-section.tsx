import { Text, View } from '@react-pdf/renderer';
import { sectionStyles } from '.';
import { TeamContent } from '../../types';

export function PDFTeamSection({ content }: { content: TeamContent }) {
  return (
    <View style={sectionStyles.section}>
      <Text style={sectionStyles.heading}>Our Team</Text>
      <View style={{ gap: 12 }}>
        {content.members.map((member) => (
          <View key={member.id} style={sectionStyles.itemContainer}>
            <Text style={sectionStyles.itemTitle}>{member.name}</Text>
            <Text style={sectionStyles.itemSubtitle}>{member.position}</Text>
            {member.description && (
              <Text style={sectionStyles.itemDescription}>{member.description}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
