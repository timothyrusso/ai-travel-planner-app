import { StyleSheet } from 'react-native';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.Double,
    marginBottom: spacing.Fourfold,
  },
  title: {
    fontFamily: fontFamily.interExtraBold,
    fontSize: fontSize.XL2,
    maxWidth: '90%',
  },
});
