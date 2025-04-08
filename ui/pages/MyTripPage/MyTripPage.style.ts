import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  animation: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: spacing.tripAnimationHeight,
    bottom: 0,
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 0,
    justifyContent: 'center',
  },
});
