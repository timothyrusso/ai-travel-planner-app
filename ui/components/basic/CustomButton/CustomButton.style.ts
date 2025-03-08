import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: spacing.customButtonHeight,
    backgroundColor: colors.primaryBlack,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing.Triple,
  },
  text: {
    color: colors.primaryWhite,
    fontFamily: fonts.interBold,
    fontSize: spacing.Triple,
  },
  pressed: {
    opacity: 0.6,
  },
  outline: {
    backgroundColor: colors.primaryWhite,
    borderWidth: spacing.ThreeQuarterMinimal,
    borderColor: colors.primaryBlack,
  },
  textOutline: {
    color: colors.primaryBlack,
  },
  disabled: {
    backgroundColor: colors.primaryGrey,
  },
});
