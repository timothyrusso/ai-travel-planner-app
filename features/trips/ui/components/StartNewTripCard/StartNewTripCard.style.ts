import { StyleSheet } from 'react-native';
import { fontFamily, fontSize, spacing } from '@/features/core/design-system';

export const style = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: spacing.Triple,
  },
  title: {
    fontFamily: fontFamily.interMedium,
    fontSize: fontSize.XL2,
  },
  button: {
    width: '60%',
  },
});
