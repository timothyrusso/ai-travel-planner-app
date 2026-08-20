import { CustomSegmentedControl } from '@/features/core/design-system/components/basic/CustomSegmentedControl/CustomSegmentedControl';
import type { CustomSegmentedControlProps } from '@/features/core/design-system/components/basic/CustomSegmentedControl/CustomSegmentedControl.logic';
import { segmentedControlSizes } from '@/features/core/design-system/style/dimensions/segmentedControl';

export function CustomSegmentedControlMedium(props: CustomSegmentedControlProps) {
  return <CustomSegmentedControl {...props} size={segmentedControlSizes.medium} />;
}
