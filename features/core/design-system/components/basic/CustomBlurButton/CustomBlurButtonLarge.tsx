import {
  CustomBlurButton,
  type CustomBlurButtonProps,
} from '@/features/core/design-system/components/basic/CustomBlurButton/CustomBlurButton';
import { components } from '@/features/core/design-system/style/dimensions/components';

export function CustomBlurButtonLarge(props: CustomBlurButtonProps) {
  return <CustomBlurButton {...props} size={components.buttonLargeHeight} />;
}
