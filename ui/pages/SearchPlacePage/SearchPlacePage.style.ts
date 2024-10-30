import { dimensions } from '@/constants/style/dimensions';
import { fonts } from '@/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.interBold,
    fontSize: dimensions.Fourfold,
  },
  subtitle: {
    marginVertical: dimensions.Fourfold,
    fontSize: dimensions.Fourfold,
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
    height: dimensions.searchAnimationHeight,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: '60%',
  },
});
