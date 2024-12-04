import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter_18pt-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Inter_18pt-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/Inter_18pt-Bold.ttf', fontWeight: 700 },
  ],
});

export const defaultStyles = {
  text: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 1.5,
  },
  heading: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
  },
};
