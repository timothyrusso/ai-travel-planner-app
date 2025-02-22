import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const dimensions = {
  Zero: 0,
  HalfMinimal: 1,
  ThreeQuarterMinimal: 1.5,
  Minimal: 2,
  MinimalDouble: 4,
  Single: 6,
  SingleAndHalf: 8,
  Double: 12,
  Triple: 16,
  TripleAndHalf: 20,
  Fourfold: 24,
  Quintuple: 32,
  Sextuple: 48,

  separator40: 40,
  separator80: 80,

  travelAnimationHeight: 350,
  searchAnimationHeight: 250,
  tripAnimationHeight: 250,
  mainLogoSize: 200,
  customButtonHeight: 50,
  customButtonWidth: 300,
  CardWithIconHeight: 100,
  calendarWidth: 350,
};
