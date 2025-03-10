import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  button: {
    width: '60%',
    position: 'absolute',
    bottom: 0,
    marginBottom: spacing.Double,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: spacing.separator80,
  },
  calendar: {
    borderWidth: spacing.Minimal,
    width: '100%',
    padding: spacing.TripleAndHalf,
    borderRadius: spacing.Double,
  },
  calendarText: {
    fontFamily: fonts.interMedium,
  },
  calendarDayText: {
    color: colors.primaryWhite,
  },
  subtitle: {
    marginVertical: spacing.Fourfold,
    fontSize: spacing.Fourfold,
    fontFamily: fonts.interMedium,
  },
});
