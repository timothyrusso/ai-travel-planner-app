import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { dimensions } from '@/constants/dimensions';

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
    fontFamily: 'inter-semibold',
    fontSize: dimensions.Triple,
  },
  pressed: {
    opacity: 0.8,
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
