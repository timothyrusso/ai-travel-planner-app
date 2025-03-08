import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.interBold,
    fontSize: spacing.Fourfold,
  },
  subtitle: {
    marginVertical: spacing.Fourfold,
    fontSize: spacing.Fourfold,
    fontFamily: fonts.interMedium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 1,
    position: 'relative',
  },
  autoCompleteContainer: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },
  animation: {
    width: '100%',
    height: spacing.searchAnimationHeight,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: '60%',
    position: 'absolute',
    bottom: 0,
    marginBottom: spacing.Double,
  },
});
