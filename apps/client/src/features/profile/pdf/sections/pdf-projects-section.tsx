import { Text, View } from '@react-pdf/renderer';
import { sectionStyles } from '.';
import { ProjectContent } from '../../types';

export function PDFProjectsSection({ content }: { content: ProjectContent }) {
  return (
    <View style={sectionStyles.section}>
      <Text style={sectionStyles.heading}>Projects</Text>
      {content.projects.map((project) => (
        <View key={project.id} style={sectionStyles.itemContainer}>
          <Text style={sectionStyles.itemTitle}>{project.title}</Text>
          <Text style={sectionStyles.itemDescription}>{project.description}</Text>
          {project.technologies && (
            <View style={[sectionStyles.grid, { marginTop: 4 }]}>
              {project.technologies.map((tech, index) => (
                <View key={index} style={sectionStyles.tag}>
                  <Text>{tech}</Text>
                </View>
              ))}
            </View>
          )}
          {project.link && (
            <Text style={[sectionStyles.itemDescription, { color: '#2563eb', marginTop: 4 }]}>
              {project.link}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
