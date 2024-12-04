import { Text, View } from '@react-pdf/renderer';
import { sectionStyles } from '.';
import { ContactContent } from '../../types';

export function PDFContactSection({ content }: { content: ContactContent }) {
  return (
    <View style={sectionStyles.section}>
      <Text style={sectionStyles.heading}>Contact</Text>
      <View style={{ gap: 4 }}>
        <Text style={sectionStyles.content}>{content.email}</Text>
        {content.phone && <Text style={sectionStyles.content}>{content.phone}</Text>}
        {content.location && <Text style={sectionStyles.content}>{content.location}</Text>}
        {content.socialLinks && content.socialLinks?.length > 0 && (
          <View style={{ marginTop: 8 }}>
            {content.socialLinks.map((link, index) => (
              <Text key={index} style={[sectionStyles.content, { color: '#2563eb' }]}>
                {link.platform}: {link.url}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
