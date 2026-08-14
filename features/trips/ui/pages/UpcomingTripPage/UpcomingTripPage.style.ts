import { StyleSheet } from 'react-native';
import { shadows, spacing } from '@/features/core/design-system';

export const styles = (addTripButtonTop: number, detailsBoxMarginBottom: number) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
    },
    addTripButton: {
      position: 'absolute',
      top: addTripButtonTop,
      right: spacing.Fourfold,
      zIndex: 1,
      boxShadow: shadows.mediumShadow,
    },
    detailsBox: {
      marginBottom: detailsBoxMarginBottom,
      boxShadow: shadows.highShadow,
    },
    skeleton: {
      width: '100%',
      flex: 1,
    },
  });
