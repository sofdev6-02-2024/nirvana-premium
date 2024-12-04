import { Font, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter_18pt-Regular.ttf' },
    { src: '/fonts/Inter-18pt-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/Inter-18pt-Bold.ttf', fontWeight: 700 },
  ],
});

export const baseStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Inter',
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});
