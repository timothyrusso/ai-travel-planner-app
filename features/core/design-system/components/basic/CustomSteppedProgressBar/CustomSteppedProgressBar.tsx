import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ProgressBarColor } from '@/features/core/design-system/components/basic/CustomProgressBar/CustomProgressBar.logic';
import {
  type CustomSteppedProgressBarProps,
  useCustomSteppedProgressBarLogic,
} from '@/features/core/design-system/components/basic/CustomSteppedProgressBar/CustomSteppedProgressBar.logic';
import { customSteppedProgressBarStyles } from '@/features/core/design-system/components/basic/CustomSteppedProgressBar/CustomSteppedProgressBar.style';
import type { SteppedProgressBarSize } from '@/features/core/design-system/style/dimensions/progressBar';

type CustomSteppedProgressBarInternalProps = CustomSteppedProgressBarProps & {
  size: SteppedProgressBarSize;
};

export const CustomSteppedProgressBar = ({
  totalSteps,
  currentStep,
  color = ProgressBarColor.Purple,
  style,
  size,
}: CustomSteppedProgressBarInternalProps) => {
  const { derived } = useCustomSteppedProgressBarLogic({ totalSteps, currentStep, color });

  const styles = customSteppedProgressBarStyles({ size, segmentColors: derived.segmentColors });

  return (
    <View
      style={[styles.row, style]}
      // A role alone never makes a native view an accessibility element, so VoiceOver and TalkBack
      // would skip the bar entirely without this.
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={derived.accessibilityValue}
      // react-native-web drops the `accessibilityValue` object form, so the flat ARIA props are
      // passed alongside it; React Native folds them back into `accessibilityValue` on device.
      aria-valuemin={derived.accessibilityValue.min}
      aria-valuemax={derived.accessibilityValue.max}
      aria-valuenow={derived.accessibilityValue.now}
    >
      {derived.segments.map(segment => (
        <Animated.View key={segment.step} style={[styles.segment, styles[segment.state], derived.segmentTransition]} />
      ))}
    </View>
  );
};
