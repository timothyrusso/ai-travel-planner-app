import { Platform } from 'react-native';
import { PlatformOS } from '../../PlatformOS';

export const components = {
  tripContainerWidth: 300,
  tripContainerHeight: 500,
  tripImageHeight: 320,

  bottomMenuHeight: 90 + (Platform.OS.match(PlatformOS.ios) ? 20 : 0),
};
