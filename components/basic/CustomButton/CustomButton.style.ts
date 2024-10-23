import { colors } from '@/constants/colors';
import { dimensions } from '@/constants/dimensions';
import { fonts } from '@/constants/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: dimensions.customButtonHeight,
    backgroundColor: colors.primaryBlack,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dimensions.Triple,
  },
  text: {
    color: colors.primaryWhite,
    fontFamily: fonts.interMedium,
    fontSize: dimensions.Triple,
  },
  pressed: {
    opacity: 0.6,
  },
  outline: {
    backgroundColor: colors.primaryWhite,
    borderWidth: dimensions.ThreeQuarterMinimal,
    borderColor: colors.primaryBlack,
  },
  textOutline: {
    color: colors.primaryBlack,
  },
});
