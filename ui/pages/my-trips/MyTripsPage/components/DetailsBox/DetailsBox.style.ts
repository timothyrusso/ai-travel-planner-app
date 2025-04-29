import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  detailsContainer: {
    position: 'absolute',
    bottom: spacing.Fourfold,
    left: spacing.Fourfold,
    right: spacing.Fourfold,
    borderRadius: spacing.Fourfold,
    overflow: 'hidden',
    padding: spacing.Fourfold,
  },
  location: {
    color: colors.primaryWhite,
    fontFamily: fonts.interBold,
    fontSize: spacing.Triple,
    alignSelf: 'flex-start',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: spacing.Single,
  },
  detailsButton: {
    marginTop: spacing.Triple,
  },
});
