import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { style } from './MyTripContainer.style';

interface MyTripContainerProps {
  children: ReactNode;
}

const MyTripContainer: FC<MyTripContainerProps> = ({ children }) => {
  return <View style={style.container}>{children}</View>;
};

export default MyTripContainer;
