import { StyleSheet } from 'react-native';
import { fontFamily, fontSize, spacing } from '@/features/core/design-system';

export const style = StyleSheet.create({
  container: {
    // Load-bearing, not redundant: the parent (EmptyListContainer's `newTripContainer`) centers its
    // children with `alignItems`, which sizes this card to its content. Without a definite width
    // here, `button`'s `width: '60%'` below resolves against an indefinite base and the button
    // renders undersized with its label pushed flush right — on iOS and Android alike.
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: spacing.Triple,
  },
  title: {
    fontFamily: fontFamily.interMedium,
    fontSize: fontSize.XL2,
  },
  button: {
    width: '60%',
  },
});
