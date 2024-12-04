import { SECTION_CONSTRAINTS, type ProfileTheme, type Section } from '../types';
import { colorUtils } from './color-utils';

interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  errors: string[];
}

interface ColorHarmonyResult {
  isValid: boolean;
  warnings: string[];
}

function checkColorHarmony(colors: ProfileTheme['colors']): ColorHarmonyResult {
  const result: ColorHarmonyResult = { isValid: true, warnings: [] };

  try {
    const primaryHSL = colorUtils.RGBToHSL(colorUtils.hexToRGB(colors.primary));
    const secondaryHSL = colorUtils.RGBToHSL(colorUtils.hexToRGB(colors.secondary));
    const accentHSL = colorUtils.RGBToHSL(colorUtils.hexToRGB(colors.accent));

    const hueDiffPS = Math.abs(primaryHSL.h - secondaryHSL.h);
    const hueDiffPA = Math.abs(primaryHSL.h - accentHSL.h);

    if (hueDiffPS < 30) {
      result.warnings.push('Primary and secondary colors are too similar in hue');
    }

    if (Math.abs(primaryHSL.s - secondaryHSL.s) > 50) {
      result.warnings.push('Large saturation difference between primary and secondary colors');
    }

    if (hueDiffPA < 90) {
      result.warnings.push('Accent color might not provide enough contrast');
    }

    if (Math.abs(primaryHSL.l - secondaryHSL.l) < 10) {
      result.warnings.push('Primary and secondary colors have very similar brightness');
    }
  } catch (error) {
    result.warnings.push('Invalid color format detected');
    result.isValid = false;
  }

  return result;
}

export function validateTheme(theme: ProfileTheme, sections: Section[] = []): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    warnings: [],
    errors: [],
  };

  const textContrast = colorUtils.getContrastRatio(
    theme.colors.text.primary,
    theme.colors.background,
  );

  if (!colorUtils.isAccessible(theme.colors.text.primary, theme.colors.background)) {
    result.warnings.push('Text contrast ratio may be too low for accessibility standards');
  }

  if (!colorUtils.isAccessible(theme.colors.text.secondary, theme.colors.background, true)) {
    result.warnings.push('Secondary text contrast ratio may be too low');
  }

  const harmonyResult = checkColorHarmony(theme.colors);
  result.warnings.push(...harmonyResult.warnings);
  result.isValid = result.isValid && harmonyResult.isValid;

  if (sections && sections.length > 0) {
    sections.forEach((section) => {
      const constraints = SECTION_CONSTRAINTS[section.type];
      if (!constraints.allowedColumns.includes(section.layout.columns)) {
        result.errors.push(
          `Section "${section.type}" doesn't support ${section.layout.columns} column layout`,
        );
        result.isValid = false;
      }
    });
  }

  return result;
}
