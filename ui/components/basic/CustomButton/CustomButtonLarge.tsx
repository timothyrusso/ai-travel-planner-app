import { components } from '@/ui/constants/style/dimensions/components';
import { BaseButton, type CustomButtonProps } from './BaseButton';

export function CustomButtonLarge(props: CustomButtonProps) {
  return <BaseButton {...props} size={components.buttonLargeHeight} />;
}
