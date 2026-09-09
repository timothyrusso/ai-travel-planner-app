import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

/**
 * Component-scoped on purpose: the glyph is always half its box, a ratio the shared `spacing` ladder
 * cannot express, and the 2px ring is a stroke width only the checkbox asks for.
 */
export const checkboxSizes = {
  medium: {
    box: spacing.separator40,
    glyph: spacing.TripleAndHalf,
    strokeWidth: spacing.Minimal,
  },
  large: {
    box: spacing.Sextuple,
    glyph: spacing.Fourfold,
    strokeWidth: spacing.Minimal,
  },
} as const;

export type CheckboxSizeName = keyof typeof checkboxSizes;

export type CheckboxSize = (typeof checkboxSizes)[CheckboxSizeName];
