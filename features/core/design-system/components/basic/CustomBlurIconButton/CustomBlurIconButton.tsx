import type { RefObject } from 'react';
import { ActivityIndicator, type StyleProp, View, type ViewProps, type ViewStyle } from 'react-native';

import { BlurSurface } from '@/features/core/design-system/components/basic/CustomBlurButton/BlurSurface';
import { useCustomBlurButtonLogic } from '@/features/core/design-system/components/basic/CustomBlurButton/CustomBlurButton.logic';
import { styleBlurIconButton } from '@/features/core/design-system/components/basic/CustomBlurIconButton/CustomBlurIconButton.style';
import { CustomIcon, type IoniconsName } from '@/features/core/design-system/components/basic/CustomIcon/CustomIcon';
import { CustomPressable } from '@/features/core/design-system/components/basic/CustomPressable/CustomPressable';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

export type CustomBlurIconButtonProps = {
  onPress: () => void;
  iconName: IoniconsName;
  style?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: number;
  iconSize?: number;
  iconStyle?: StyleProp<ViewStyle>;
  /** See `CustomBlurButton`: the `BlurTargetView` ancestor Android blurs. Ignored on iOS. */
  blurTargetRef?: RefObject<View | null>;
} & ViewProps;

export function CustomBlurIconButton({
  onPress,
  iconName,
  style,
  isDisabled = false,
  isLoading = false,
  size,
  iconSize = spacing.TripleAndHalf,
  iconStyle,
  blurTargetRef,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
}: CustomBlurIconButtonProps) {
  const { derived } = useCustomBlurButtonLogic({ isDisabled, hasBlurTarget: blurTargetRef !== undefined });

  const styles = styleBlurIconButton({ tintOpacity: derived.blurStyles.tintOpacity, size });

  return (
    <CustomPressable
      disabled={isDisabled || isLoading}
      onPress={onPress}
      style={[styles.button, style]}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
    >
      <BlurSurface
        intensity={derived.blurStyles.intensity}
        canBlur={derived.canBlur}
        surfaceStyle={styles.surface}
        maskStyle={styles.mask}
        blurTargetRef={blurTargetRef}
      >
        <View style={styles.tint} />
        <View style={styles.innerContainer}>
          {isLoading ? (
            <ActivityIndicator color={derived.blurStyles.contentColor} size={iconSize} />
          ) : (
            <CustomIcon name={iconName} size={iconSize} style={iconStyle} color={derived.blurStyles.contentColor} />
          )}
        </View>
      </BlurSurface>
    </CustomPressable>
  );
}
