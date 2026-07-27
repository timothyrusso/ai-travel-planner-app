import {
  BaseIconButton,
  type CustomIconButtonProps,
} from '@/features/core/design-system/components/basic/CustomIconButton/BaseIconButton';
import { components } from '@/features/core/design-system/style/dimensions/components';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

export function CustomIconButtonLarge(props: CustomIconButtonProps) {
  return (
    <BaseIconButton {...props} size={props.size ?? components.buttonLargeHeight} iconSize={spacing.TripleAndHalf} />
  );
}
