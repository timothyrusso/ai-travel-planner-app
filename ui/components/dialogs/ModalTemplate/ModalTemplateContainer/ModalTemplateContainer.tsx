import type { FC, PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';
import { Animated } from 'react-native';

import { useModalTemplateContainerLogic } from './ModalTemplateContainer.logic';
import { styles } from './ModalTemplateContainer.style';

const ModalContainer: FC<PropsWithChildren<ViewProps>> = ({ children, ...props }) => {
  const { containerStyle } = useModalTemplateContainerLogic();

  return (
    <Animated.View style={[styles.container, containerStyle]} {...props}>
      {children}
    </Animated.View>
  );
};

export default ModalContainer;
