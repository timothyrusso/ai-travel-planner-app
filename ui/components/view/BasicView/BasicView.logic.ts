import { Platform, StatusBar } from 'react-native';
import { match } from 'ts-pattern';

import { PlatformOS } from '@/ui/constants/PlatformOS';
import type { BasicViewProps } from './BasicView';
import { styles } from './BasicView.style';

export const useBasicViewLogic = ({ nameView, isFullScreen }: BasicViewProps) => {
  console.debug('+++++++++++++++ Render view:', nameView, ' +++++++++++++++');

  const paddingTop = match({ isFullScreen, platform: Platform.OS })
    .with({ isFullScreen: true, platform: PlatformOS.android }, () => StatusBar.currentHeight ?? 0)
    .otherwise(() => 0);

  const componentStyle = styles(paddingTop);

  return {
    componentStyle,
  };
};

export default useBasicViewLogic;
