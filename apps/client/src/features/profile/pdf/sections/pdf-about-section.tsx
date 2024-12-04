import { Text, View } from '@react-pdf/renderer';
import { sectionStyles } from '.';
import type { AboutContent } from '../../types';

export function PDFAboutSection({ content }: { content: AboutContent }) {
  return (
    <View style={sectionStyles.section}>
      <Text style={sectionStyles.heading}>About</Text>
      {content.headline && (
        <Text style={[sectionStyles.content, { marginBottom: 8 }]}>{content.headline}</Text>
      )}
      <Text style={sectionStyles.content}>{content.text}</Text>
    </View>
  );
}
