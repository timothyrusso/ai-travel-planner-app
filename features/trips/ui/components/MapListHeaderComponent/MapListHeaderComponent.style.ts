import { StyleSheet } from 'react-native';
import { components, spacing } from '@/features/core/design-system';

export const styles = StyleSheet.create({
  mapContainer: {
    height: components.mapHeight,
    marginHorizontal: spacing.Fourfold,
    borderRadius: spacing.Triple,
    overflow: 'hidden',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
