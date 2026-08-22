import { StyleSheet } from 'react-native';

import {
  type ChipColors,
  chipIconOnlyPadding,
} from '@/features/core/design-system/components/basic/CustomChip/CustomChip.logic';
import { colors } from '@/features/core/design-system/style/colors';
import type { ChipSize } from '@/features/core/design-system/style/dimensions/chip';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';
import { opacity } from '@/features/core/design-system/style/opacity';

type ChipStyleParams = {
  chipSize: ChipSize;
  chipColors: ChipColors;
  isIconOnly: boolean;
};

export const styleChip = ({ chipSize, chipColors, isIconOnly }: ChipStyleParams) => {
  const iconOnlyPadding = chipIconOnlyPadding(chipSize);

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      justifyContent: 'center',
      gap: chipSize.gap,
      height: chipSize.height,
      width: isIconOnly ? chipSize.height : undefined,
      paddingHorizontal: isIconOnly ? iconOnlyPadding : chipSize.paddingHorizontal,
      borderRadius: chipSize.radius,
      backgroundColor: chipColors.background,
      overflow: 'hidden',
    },
    surface: {
      position: 'absolute',
      top: spacing.Zero,
      left: spacing.Zero,
      right: spacing.Zero,
      bottom: spacing.Zero,
    },
    mask: {
      flex: 1,
      borderRadius: chipSize.radius,
      backgroundColor: colors.primaryBlack,
    },
    tint: {
      flex: 1,
      backgroundColor: colors.primaryBlack,
      opacity: opacity.opacity25,
    },
    border: {
      position: 'absolute',
      top: spacing.Zero,
      left: spacing.Zero,
      right: spacing.Zero,
      bottom: spacing.Zero,
      borderWidth: spacing.HalfMinimal,
      borderColor: colors.primaryWhite,
      borderRadius: chipSize.radius,
      opacity: opacity.opacity50,
    },
    title: {
      color: chipColors.content,
      fontFamily: fontFamily.interBold,
      fontSize: chipSize.fontSize,
      letterSpacing: chipSize.letterSpacing,
      textAlign: 'center',
    },
    titleUppercase: {
      textTransform: 'uppercase',
    },
  });
};
