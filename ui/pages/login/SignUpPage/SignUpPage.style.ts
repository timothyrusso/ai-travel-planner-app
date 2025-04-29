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
    width: '100%',
    paddingHorizontal: spacing.Fourfold,
  },
  buttonContainer: {
    paddingTop: spacing.separator40,
    width: '100%',
    paddingHorizontal: spacing.Fourfold,
    paddingBottom: spacing.Fourfold,
  },
  subtitle: {
    fontFamily: fonts.interRegular,
    fontSize: spacing.Triple,
    marginTop: spacing.Double,
    paddingHorizontal: spacing.Fourfold,
    alignSelf: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
  },
});
