import { type FC, type PropsWithChildren, useRef } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { ScrollView, View } from 'react-native';

import useKeyboardEffect from '@/ui/hooks/useKeyboardEffect';
import { styles } from './CustomScrollView.style';

type CustomScrollViewProps = {
  isDarkThemed?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  childrenStyle?: StyleProp<ViewStyle>;
  resetScroll?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollEventThrottle?: number;
};

const CustomScrollView: FC<PropsWithChildren<CustomScrollViewProps>> = ({
  style,
  contentContainerStyle,
  childrenStyle,
  children,
  resetScroll = false,
  onScroll,
  scrollEventThrottle,
}) => {
  const { paddingHeight } = useKeyboardEffect();

  const scrollViewRef = useRef<ScrollView | null>(null);

  const scrollToTop = () => {
    if (resetScroll && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={scrollToTop}
      style={[styles.basicScrollView, style]}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps={'never'}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
    >
      <View style={[styles.basicView, styles.childrenContainer, childrenStyle]}>{children}</View>

      <View style={{ height: paddingHeight }} />
    </ScrollView>
  );
};

export default CustomScrollView;
