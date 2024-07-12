import { colors } from '@/constants/colors';
import { dimensions } from '@/constants/dimensions';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    color: colors.primaryBlack,
    fontFamily: 'inter',
    fontSize: dimensions.Triple,
  },
  container: {
    borderWidth: dimensions.ThreeQuarterMinimal,
    borderColor: colors.primaryBlack,
    borderRadius: dimensions.Triple,
    padding: dimensions.Triple,
  },
});
