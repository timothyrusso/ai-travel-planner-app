import { Fragment } from 'react';
import Animated from 'react-native-reanimated';
import { colorBgPulse, colors } from '@/features/core/design-system';
import { styles } from '@/features/trip-generation/ui/components/AnimatedColorsBackground/AnimatedColorsBackground.style';

const COLORS = [colors.purple500, colors.purple300, colors.lime500, colors.cyan500, colors.red300];
const BORDER_CYCLE = 1000;

export const AnimatedColorsBackground = () => {
  return (
    <Fragment>
      {COLORS.map((color, i) => (
        <Animated.View
          key={color}
          style={[
            styles.colorBackground,
            {
              backgroundColor: color,
              animationName: colorBgPulse,
              animationDuration: BORDER_CYCLE,
              animationDelay: -(BORDER_CYCLE * i) / COLORS.length,
              animationIterationCount: 'infinite',
            },
          ]}
        />
      ))}
    </Fragment>
  );
};
