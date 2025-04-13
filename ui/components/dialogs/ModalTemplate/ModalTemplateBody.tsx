import type { FC, PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';

import { styles } from './ModalTemplate.style';

const ModalBody: FC<PropsWithChildren<ViewProps>> = ({ children, ...props }) => (
  <View style={styles.body} {...props}>
    {children}
  </View>
);

export default ModalBody;
