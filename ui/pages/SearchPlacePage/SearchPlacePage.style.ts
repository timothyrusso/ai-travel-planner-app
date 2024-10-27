import { dimensions } from '@/constants/style/dimensions';
import { fonts } from '@/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.interBold,
    fontSize: dimensions.Fourfold,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 1,
    marginTop: dimensions.separator40,
    rowGap: dimensions.Triple,
    position: 'relative',
  },
  autoCompleteContainer: {
    flex: 1,
    position: 'absolute',
    top: dimensions.separator40,
    zIndex: 1,
    width: '100%',
  },
  description: {
    fontFamily: fonts.interMedium,
    fontSize: dimensions.Triple,
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
