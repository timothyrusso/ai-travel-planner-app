import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import { fonts } from '@/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  button: {
    width: '60%',
    position: 'absolute',
    bottom: 0,
    marginBottom: dimensions.Double,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: dimensions.separator80,
  },
  calendar: {
    borderWidth: dimensions.Minimal,
    width: '100%',
    padding: dimensions.TripleAndHalf,
    borderRadius: dimensions.Double,
  },
  calendarText: {
    fontFamily: fonts.interMedium,
  },
  calendarDayText: {
    color: colors.primaryWhite,
  },
  subtitle: {
    marginVertical: dimensions.Fourfold,
    fontSize: dimensions.Fourfold,
    fontFamily: fonts.interMedium,
  },
});
