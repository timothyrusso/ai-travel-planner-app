import { StyleSheet } from 'react-native';
import { components, SCREEN_WIDTH, spacing } from '@/features/core/design-system';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    // `flexGrow` lets the empty state stretch to the remaining height so its card stays centred.
    flexGrow: 1,
    paddingHorizontal: spacing.Triple,
    paddingVertical: spacing.separator40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnWrapper: {
    gap: spacing.Triple,
    paddingBottom: spacing.Triple,
  },
  skeleton: {
    width: (SCREEN_WIDTH - spacing.Triple * 3) / 2,
    height: components.tripCardImageHeight,
    borderRadius: spacing.Double,
  },
});
