import { CustomSteppedProgressBar } from '@/features/core/design-system/components/basic/CustomSteppedProgressBar/CustomSteppedProgressBar';
import type { CustomSteppedProgressBarProps } from '@/features/core/design-system/components/basic/CustomSteppedProgressBar/CustomSteppedProgressBar.logic';
import { steppedProgressBarSizes } from '@/features/core/design-system/style/dimensions/progressBar';

export function CustomSteppedProgressBarSmall(props: CustomSteppedProgressBarProps) {
  return <CustomSteppedProgressBar {...props} size={steppedProgressBarSizes.small} />;
}
