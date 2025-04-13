import type { FC, PropsWithChildren } from 'react';
import type { ScrollViewProps } from 'react-native';
import { ScrollView } from 'react-native';

const ModalContent: FC<PropsWithChildren<ScrollViewProps>> = ({ children, ...props }) => (
  <ScrollView {...props} keyboardShouldPersistTaps="handled">
    {children}
  </ScrollView>
);

export default ModalContent;
