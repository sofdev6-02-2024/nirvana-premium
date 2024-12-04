import { Text, View } from 'lucide-react';
import { sectionStyles } from '.';
import { SkillContent } from '../../types';

export function PDFSkillsSection({ content }: { content: SkillContent }) {
  return (
    <View style={sectionStyles.section}>
      <Text style={sectionStyles.heading}>Skills</Text>
      <View style={sectionStyles.grid}>
        {content.skills.map((skill) => (
          <View key={skill.id} style={sectionStyles.tag}>
            <Text>{skill.name}</Text>
            {skill.level && <Text style={{ color: '#64748b' }}> • {skill.level}</Text>}
          </View>
        ))}
      </View>
    </View>
  );
}
