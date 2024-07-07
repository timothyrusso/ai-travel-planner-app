import { View, Text, SafeAreaView, StyleProp, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { styles } from './BasicView.style';

type BasicViewProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};
const BasicView: FC<BasicViewProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.viewContainer, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default BasicView;
