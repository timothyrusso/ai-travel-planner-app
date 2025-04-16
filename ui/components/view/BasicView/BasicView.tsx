import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView, StatusBar, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../../basic/CustomButton/CustomButton';
import { useBasicViewLogic } from './BasicView.logic';

export type BasicViewProps = {
  isFullScreen?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  nameView: string;
  bottomButtonTitle?: string;
  bottomButtonPress?: () => void;
  bottomButtonDisabled?: boolean;
  bottomButtonLoading?: boolean;
  topGradientColor?: string;
  bottomGradientColor?: string;
};

export const BasicView = (props: PropsWithChildren<BasicViewProps>) => {
  const {
    containerStyle,
    viewStyle,
    children,
    bottomButtonTitle,
    bottomButtonPress,
    bottomButtonDisabled,
    bottomButtonLoading,
    topGradientColor,
    bottomGradientColor,
    isFullScreen,
  } = props;
  const { componentStyle } = useBasicViewLogic(props);

  const Container = isFullScreen ? View : SafeAreaView;

  return (
    <Container style={[componentStyle.containerViewStyle, componentStyle.basicContainer, containerStyle]}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={[componentStyle.containerViewStyle, viewStyle]}>
        {topGradientColor && bottomGradientColor && (
          <LinearGradient
            colors={[topGradientColor, bottomGradientColor]}
            style={componentStyle.gradient}
            locations={[0.5, 0.5]}
          />
        )}
        {children}
        {bottomButtonTitle && bottomButtonPress && (
          <View style={componentStyle.buttonContainer}>
            <CustomButton
              title={bottomButtonTitle}
              onPress={bottomButtonPress}
              isDisabled={bottomButtonDisabled}
              isLoading={bottomButtonLoading}
            />
          </View>
        )}
      </View>
    </Container>
  );
};
