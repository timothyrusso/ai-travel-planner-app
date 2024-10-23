import { dimensions } from '@/constants/dimensions';
import { fonts } from '@/constants/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.interBold,
    fontSize: dimensions.Fourfold,
  },
  emailContainer: {
    paddingTop: dimensions.Triple,
  },
  passwordContainer: {
    paddingVertical: dimensions.Triple,
  },
  label: {
    marginBottom: dimensions.Single,
  },
  inputContainer: {
    paddingTop: dimensions.Triple,
  },
  buttonContainer: {
    paddingTop: dimensions.separator40,
    rowGap: dimensions.Triple,
  },
  subtitle: {
    fontFamily: fonts.interRegular,
    fontSize: dimensions.Triple,
    marginTop: dimensions.Double,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
