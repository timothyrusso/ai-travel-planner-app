import { Platform } from 'react-native';
import { PlatformOS } from '../../PlatformOS';

export const components = {
  tripImageHeight: 320,
  activityImageHeight: 250,
  bottomMenuHeight: 90 + (Platform.OS.match(PlatformOS.ios) ? 20 : 0),
  modalFooterHeight: 90,
  tripCardImageHeight: 200,
  profileImageHeight: 150,
  resetPasswordModalHeight: 284,
};
