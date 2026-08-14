import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/features/core/design-system';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: spacing.Fourfold,
    borderRadius: spacing.Triple,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.secondaryGrey,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    padding: spacing.Double,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerText: {
    // Black, not white: the header gradient is now a light cyan pair, which white text disappears
    // into. Black on it is ~11:1, the same way every other light surface in the app carries content.
    color: colors.primaryBlack,
    fontFamily: fontFamily.interBold,
  },
  subtitle: {
    color: colors.primaryGrey,
    fontFamily: fontFamily.interMedium,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.Single,
    paddingHorizontal: spacing.Double,
    paddingTop: spacing.Double,
    paddingBottom: spacing.MinimalDouble,
  },
  contentValue: {
    fontFamily: fontFamily.interMedium,
    color: colors.primaryBlack,
    paddingHorizontal: spacing.Quintuple + spacing.Minimal,
  },
  temperatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnContainer: {
    flex: 1,
  },
  horizontalSeparator: {
    height: 1,
    backgroundColor: colors.secondaryGrey,
    marginHorizontal: spacing.Double,
    marginVertical: spacing.Double,
  },
  title: {
    fontFamily: fontFamily.interMedium,
    color: colors.primaryBlack,
    paddingHorizontal: spacing.Double,
    fontSize: fontSize.MD,
  },
  contentContainer: {
    paddingBottom: spacing.Double,
  },
});
