import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { match } from 'ts-pattern';

import { ButtonState } from '@/features/core/design-system/components/basic/CustomButton/CustomButton.logic';
import { PlatformOS } from '@/features/core/design-system/PlatformOS';
import { blur } from '@/features/core/design-system/style/blur';
import { colors } from '@/features/core/design-system/style/colors';
import { opacity } from '@/features/core/design-system/style/opacity';

export type BlurButtonStyles = {
  intensity: number;
  tintOpacity: number;
  contentColor: string;
};

type UseCustomBlurButtonLogicParams = {
  isDisabled: boolean;
  hasBlurTarget: boolean;
};

export const useCustomBlurButtonLogic = ({ isDisabled, hasBlurTarget }: UseCustomBlurButtonLogicParams) => {
  const { t } = useTranslation();

  // Loading keeps the active look here too — only `isDisabled` dims the surface.
  const buttonState = isDisabled ? ButtonState.Disabled : ButtonState.Active;

  // `expo-blur` can only sample the pixels behind it on Android when it is handed a `blurTarget`
  // ancestor, which a reusable button cannot own: without one from the screen, there is no blur to
  // render at all.
  const canBlur = Platform.OS !== PlatformOS.android || hasBlurTarget;

  // The tint is what makes bold white text readable over an arbitrary photo, so when the blur is
  // unavailable it has to carry the contrast on its own and gets heavier. Both are press/backdrop
  // effects rather than resting fills, which is why they are opacities over a palette black.
  const blurStyles: BlurButtonStyles = match({ buttonState, canBlur })
    .with({ buttonState: ButtonState.Active, canBlur: true }, () => ({
      intensity: blur.intensity30,
      tintOpacity: opacity.opacity25,
      contentColor: colors.primaryWhite,
    }))
    .with({ buttonState: ButtonState.Active, canBlur: false }, () => ({
      intensity: blur.intensity30,
      tintOpacity: opacity.opacity60,
      contentColor: colors.primaryWhite,
    }))
    .with({ buttonState: ButtonState.Disabled, canBlur: true }, () => ({
      intensity: blur.intensity15,
      tintOpacity: opacity.opacity10,
      contentColor: colors.primaryWhiteDisabled,
    }))
    .with({ buttonState: ButtonState.Disabled, canBlur: false }, () => ({
      intensity: blur.intensity15,
      tintOpacity: opacity.opacity40,
      contentColor: colors.primaryWhiteDisabled,
    }))
    .exhaustive();

  return {
    // The title is an i18n key — `CustomText` translates it on render — so the accessible name has
    // to be translated here before it reaches the pressable.
    state: {
      t,
    },
    derived: {
      canBlur,
      blurStyles,
    },
  };
};
