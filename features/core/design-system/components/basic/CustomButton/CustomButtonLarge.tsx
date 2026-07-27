import {
  BaseButton,
  type CustomButtonProps,
} from '@/features/core/design-system/components/basic/CustomButton/BaseButton';
import { components } from '@/features/core/design-system/style/dimensions/components';

export function CustomButtonLarge(props: CustomButtonProps) {
  return <BaseButton {...props} size={components.buttonLargeHeight} />;
}
