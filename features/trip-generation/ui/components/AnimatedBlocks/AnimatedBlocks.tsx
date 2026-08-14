import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { colors, rotate } from '@/features/core/design-system';
import { styles } from '@/features/trip-generation/ui/components/AnimatedBlocks/AnimatedBlocks.style';

const COLORS = [colors.purple500, colors.purple300, colors.lime500, colors.cyan500, colors.red300];
const BOXES_ANIMATION_DURATION = 300;

export const AnimatedBlocks = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {COLORS.map((color, id) => (
          <Animated.View
            key={color}
            style={[
              styles.box,
              {
                backgroundColor: color,
                animationName: rotate,
                animationDuration: BOXES_ANIMATION_DURATION * id + BOXES_ANIMATION_DURATION,
                animationIterationCount: 'infinite',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};
