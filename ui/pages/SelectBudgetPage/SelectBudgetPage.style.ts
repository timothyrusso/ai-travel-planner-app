import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  subtitle: {
    marginVertical: spacing.Fourfold,
    fontSize: spacing.Fourfold,
    fontFamily: fonts.interMedium,
  },
  button: {
    width: '60%',
    position: 'absolute',
    bottom: 0,
    marginBottom: spacing.Double,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    height: spacing.TripleAndHalf,
  },
});
