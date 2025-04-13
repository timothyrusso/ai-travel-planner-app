import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.interBold,
    fontSize: spacing.Fourfold,
  },
  emailContainer: {
    paddingTop: spacing.Triple,
  },
  passwordContainer: {
    paddingVertical: spacing.Triple,
    rowGap: spacing.Triple,
  },
  label: {
    marginBottom: spacing.Single,
  },
  inputContainer: {
    paddingTop: spacing.Triple,
  },
  buttonContainer: {
    paddingTop: spacing.separator40,
    rowGap: spacing.Triple,
  },
  subtitle: {
    fontFamily: fonts.interRegular,
    fontSize: spacing.Triple,
    marginTop: spacing.Double,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
