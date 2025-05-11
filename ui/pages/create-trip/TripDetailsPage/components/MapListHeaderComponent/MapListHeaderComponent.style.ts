import { components } from '@/ui/constants/style/dimensions/components';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mapContainer: {
    height: components.mapHeight,
    marginHorizontal: spacing.Fourfold,
    borderRadius: spacing.Triple,
    overflow: 'hidden',
    marginBottom: spacing.Double,
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
