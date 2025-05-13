import { components } from '@/ui/constants/style/dimensions/components';
import { BaseButton, type CustomButtonProps } from './BaseButton';

export function CustomButtonMedium(props: CustomButtonProps) {
  return <BaseButton {...props} size={components.buttonMediumHeight} />;
}
