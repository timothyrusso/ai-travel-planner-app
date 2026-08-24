import { CustomProgressBar } from '@/features/core/design-system/components/basic/CustomProgressBar/CustomProgressBar';
import type { CustomProgressBarProps } from '@/features/core/design-system/components/basic/CustomProgressBar/CustomProgressBar.logic';
import { progressBarSizes } from '@/features/core/design-system/style/dimensions/progressBar';

export function CustomProgressBarMedium(props: CustomProgressBarProps) {
  return <CustomProgressBar {...props} size={progressBarSizes.medium} />;
}
