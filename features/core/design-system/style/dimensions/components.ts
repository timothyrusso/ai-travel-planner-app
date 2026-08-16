import { Platform } from 'react-native';
import { PlatformOS } from '@/features/core/design-system/PlatformOS';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

export const components = {
  tripImageHeight: 320,
  activityImageHeight: 250,
  bottomMenuHeight: 90 + (Platform.OS.match(PlatformOS.ios) ? 20 : 0),
  modalFooterHeight: 90,
  tripCardImageHeight: 200,
  profileImageHeight: 100,
  mapHeight: 300,
  mapCalloutWidth: 200,
  buttonExtraLargeHeight: 60,
  buttonLargeHeight: 50,
  buttonMediumHeight: 40,
  buttonSmallHeight: 30,
  headerHeight: 70,
  homeBoxSkeletonHeight: 200,
  textIconCard: 136,
  reviewPageAnimationHeight: 300,
  cardHeight: 100,
  tripAnimationHeight: 250,
  searchAnimationHeight: 250,
  welcomePageBackgroundTextHeight: 50,
  welcomeLogoHeight: 150,
  customInputHeight: 40,
  buttonNumberHeight: 30,
  animatedWordsHeight: 30,
  carouselImageSize: 200,
  badgeCircleSize: 80,
  badgeCheckSize: 22,
  welcomeCardHeightSmall: 130,
  welcomeCardHeightMedium: 180,
  welcomeCardHeightLarge: 230,
  welcomeCardWidthSmall: 100,
  welcomeCardWidthMedium: 150,
  welcomeCardWidthLarge: 200,
} as const;

/**
 * Per-size geometry of the raised 3D button, component-scoped on purpose: the raise depths 3/5/9,
 * the 7px radius and the 11/13 label sizes are one-off values only this button asks for, and adding
 * them to the shared `spacing`/`fontSize` ladders would offer every other component a step it must
 * never use. Every value the shared scales already carry is reused from them rather than repeated.
 */
export const raisedButtonSizes = {
  small: {
    height: components.buttonSmallHeight,
    raiseLevel: 3,
    radius: spacing.Single,
    fontSize: 11,
    iconSize: spacing.Double,
  },
  medium: {
    height: components.buttonMediumHeight,
    raiseLevel: 5,
    radius: 7,
    fontSize: 13,
    iconSize: spacing.Triple,
  },
  large: {
    height: components.buttonLargeHeight,
    raiseLevel: spacing.Single,
    radius: spacing.SingleAndHalf,
    fontSize: fontSize.MD,
    iconSize: spacing.Triple,
  },
  extraLarge: {
    height: components.buttonExtraLargeHeight,
    raiseLevel: 9,
    radius: spacing.SingleAndHalf,
    fontSize: fontSize.MD,
    iconSize: spacing.Triple,
  },
} as const;

export type RaisedButtonSize = (typeof raisedButtonSizes)[keyof typeof raisedButtonSizes];
