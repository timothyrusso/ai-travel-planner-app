import {
  CustomBlurIconButton,
  type CustomBlurIconButtonProps,
} from '@/features/core/design-system/components/basic/CustomBlurIconButton/CustomBlurIconButton';
import { components } from '@/features/core/design-system/style/dimensions/components';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

export function CustomBlurIconButtonMedium(props: CustomBlurIconButtonProps) {
  return <CustomBlurIconButton {...props} size={components.buttonMediumHeight} iconSize={spacing.TripleAndHalf} />;
}
