import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButtonLarge } from '@/features/core/design-system/components/basic/CustomButton/CustomButtonLarge';
import type { BasicViewProps } from '@/features/core/design-system/components/view/BasicView/BasicView.logic';
import { useBasicViewLogic } from '@/features/core/design-system/components/view/BasicView/BasicView.logic';

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
    isFullScreen = false,
    statusBarStyle = 'light',
    hasHeader = true,
  } = props;

  const { derived } = useBasicViewLogic(props);

  const Container = isFullScreen || hasHeader ? View : SafeAreaView;

  return (
    <Container
      style={[derived.componentStyle.containerViewStyle, derived.componentStyle.basicContainer, containerStyle]}
    >
      <StatusBar style={statusBarStyle} />
      <View style={[derived.componentStyle.containerViewStyle, viewStyle]}>
        {topGradientColor && bottomGradientColor && (
          <LinearGradient
            colors={[topGradientColor, bottomGradientColor]}
            style={derived.componentStyle.gradient}
            locations={[0.5, 0.5]}
          />
        )}
        {children}
        {bottomButtonTitle && bottomButtonPress && (
          <View style={derived.componentStyle.buttonContainer}>
            <CustomButtonLarge
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
