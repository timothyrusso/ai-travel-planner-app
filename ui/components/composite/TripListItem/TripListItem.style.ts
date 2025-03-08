import { components } from '@/ui/constants/style/dimensions/components';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: spacing.TripleAndHalf,
    borderRadius: spacing.TripleAndHalf,
    width: components.tripContainerWidth,
    height: components.tripContainerHeight,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  image: {
    width: '100%',
    height: components.tripImageHeight,
    borderRadius: spacing.Triple,
    objectFit: 'cover',
  },
});
