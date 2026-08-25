import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  type CustomProgressBarProps,
  ProgressBarColor,
  useCustomProgressBarLogic,
} from '@/features/core/design-system/components/basic/CustomProgressBar/CustomProgressBar.logic';
import { customProgressBarStyles } from '@/features/core/design-system/components/basic/CustomProgressBar/CustomProgressBar.style';
import type { ProgressBarSize } from '@/features/core/design-system/style/dimensions/progressBar';

type CustomProgressBarInternalProps = CustomProgressBarProps & {
  size: ProgressBarSize;
};

export const CustomProgressBar = ({
  progress,
  color = ProgressBarColor.Purple,
  style,
  size,
}: CustomProgressBarInternalProps) => {
  const { derived } = useCustomProgressBarLogic({ progress, color });

  const styles = customProgressBarStyles({ size, fillColor: derived.fillColor, fillWidth: derived.fillWidth });

  return (
    <View
      style={[styles.track, style]}
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={derived.accessibilityValue}
      aria-valuemin={derived.accessibilityValue.min}
      aria-valuemax={derived.accessibilityValue.max}
      aria-valuenow={derived.accessibilityValue.now}
    >
      <Animated.View style={[styles.fill, derived.fillTransition]} />
    </View>
  );
};
