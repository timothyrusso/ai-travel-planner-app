import { colors } from '@/ui/constants/style/colors';
import { components } from '@/ui/constants/style/dimensions/components';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  callout: {
    width: components.mapCalloutWidth,
  },
  calloutContent: {
    padding: spacing.Double,
    backgroundColor: colors.primaryWhite,
    borderRadius: spacing.Triple,
  },
  calloutTitle: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interBold,
    color: colors.primaryBlack,
    marginBottom: spacing.Single,
  },
  calloutDescription: {
    fontSize: spacing.Double,
    fontFamily: fonts.interRegular,
    color: colors.primaryGrey,
    marginBottom: spacing.Double,
  },
  calloutButton: {
    fontSize: spacing.Double,
    fontFamily: fonts.interMedium,
    color: colors.primary,
    textAlign: 'center',
  },
});
