import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import { fonts } from '@/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    color: colors.primaryBlack,
    fontFamily: fonts.interRegular,
    fontSize: dimensions.Triple,
  },
  container: {
    borderWidth: dimensions.ThreeQuarterMinimal,
    borderColor: colors.primaryBlack,
    borderRadius: dimensions.Triple,
    padding: dimensions.Triple,
  },
});
