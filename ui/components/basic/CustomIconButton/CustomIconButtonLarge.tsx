import { components } from '@/ui/constants/style/dimensions/components';
import { BaseIconButton, type CustomIconButtonProps } from './BaseIconButton';

export function CustomIconButtonLarge(props: CustomIconButtonProps) {
  return <BaseIconButton {...props} size={props.size ?? components.buttonLargeHeight} />;
}
