import type React from 'react';
import type { FC } from 'react';
import { SafeAreaView, type StyleProp, View, type ViewStyle } from 'react-native';
import { styles } from './BasicView.style';

type BasicViewProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isFullScreen?: boolean;
};
const BasicView: FC<BasicViewProps> = ({ children, style, isFullScreen }) => {
  const _viewStyle = styles(isFullScreen);

  if (isFullScreen) {
    return <View style={[_viewStyle.viewContainer, style]}>{children}</View>;
  }

  return (
    <SafeAreaView style={_viewStyle.container}>
      <View style={[_viewStyle.viewContainer, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default BasicView;
