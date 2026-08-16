import {
  Custom3DButton,
  type Custom3DButtonProps,
} from '@/features/core/design-system/components/basic/Custom3DButton/Custom3DButton';
import { raisedButtonSizes } from '@/features/core/design-system/style/dimensions/components';

export function Custom3DButtonSmall(props: Custom3DButtonProps) {
  return <Custom3DButton {...props} size={raisedButtonSizes.small} />;
}
