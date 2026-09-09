import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import {
  type CustomCheckboxProps,
  useCustomCheckboxLogic,
} from '@/features/core/design-system/components/basic/CustomCheckbox/CustomCheckbox.logic';
import { customCheckboxStyles } from '@/features/core/design-system/components/basic/CustomCheckbox/CustomCheckbox.style';
import { CustomIcon } from '@/features/core/design-system/components/basic/CustomIcon/CustomIcon';
import { CustomPressable } from '@/features/core/design-system/components/basic/CustomPressable/CustomPressable';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * A circular checkbox. The ring is an SVG stroke rather than a border, because React Native renders
 * `borderStyle: 'dashed'` solid on iOS as soon as the radius is rounded, which would drop the
 * `empty` state's only distinguishing feature.
 */
export const CustomCheckbox = (props: CustomCheckboxProps) => {
  const { derived, effects } = useCustomCheckboxLogic(props);

  const { style, accessibilityLabel } = props;

  const styles = customCheckboxStyles({ box: derived.box });

  const glyph = <CustomIcon name={derived.glyphName} size={derived.glyph} color={derived.glyphColor} />;

  const content = (
    <>
      <Svg width={derived.box} height={derived.box} style={styles.ring} pointerEvents="none">
        {/* The static props are what a non-animating runtime falls back to, never a second source of truth. */}
        <AnimatedCircle
          cx={derived.center}
          cy={derived.center}
          r={derived.radius}
          fill="none"
          stroke={derived.neutralRingColor}
          strokeWidth={derived.strokeWidth}
          strokeDasharray={derived.dashArray}
          animatedProps={derived.ringAnimatedProps}
        />
        {derived.hasNeutralOutline && (
          <Circle
            cx={derived.center}
            cy={derived.center}
            r={derived.radius}
            fill="none"
            stroke={derived.neutralRingColor}
            strokeWidth={derived.strokeWidth}
          />
        )}
      </Svg>
      <View aria-hidden accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {derived.isEmpty ? glyph : <Animated.View style={derived.checkmarkAnimatedStyle}>{glyph}</Animated.View>}
      </View>
    </>
  );

  if (!derived.isInteractive) {
    return (
      <View
        style={[styles.container, style]}
        // A role alone never makes a native view an accessibility element, so the static checkbox
        // would be skipped entirely without this.
        accessible
        accessibilityRole="checkbox"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={derived.accessibilityState}
        // react-native-web drops the `accessibilityState` object form, so the flat ARIA props are
        // passed alongside it; React Native merges them back into `accessibilityState` on device.
        aria-checked={derived.isChecked}
        aria-disabled
      >
        {content}
      </View>
    );
  }

  return (
    <CustomPressable
      style={[styles.container, style]}
      onPress={effects.onPress}
      hitSlop={derived.hitSlop}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={derived.accessibilityState}
      aria-checked={derived.isChecked}
    >
      {content}
    </CustomPressable>
  );
};
