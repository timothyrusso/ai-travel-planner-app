import { match } from 'ts-pattern';

import { colors } from '@/features/core/design-system/style/colors';
import { opacity } from '@/features/core/design-system/style/opacity';

/**
 * The palette has no disabled tint of its own: the Figma board states disabled controls with
 * opacity, so `Main` keeps its enabled fill and fades it. It is composed into an 8-digit hex rather
 * than applied as a container `opacity` on purpose, so only the fill fades. The label and icon go
 * black on this state because the lightened fill resolves to a pale purple that white cannot survive.
 */
const MAIN_DISABLED_FILL = `${colors.purple900}${Math.round(opacity.opacity40 * 0xff)
  .toString(16)
  .padStart(2, '0')}`;

// Define button states
export const ButtonState = { Active: 'active', Disabled: 'disabled' } as const;
export type ButtonState = (typeof ButtonState)[keyof typeof ButtonState];

export const ButtonType = {
  Main: 'main',
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Quaternary: 'quaternary',
  Ghost: 'ghost',
} as const;

export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];

export const useCustomButtonLogic = () => {
  const getButtonStyles = (buttonType: ButtonType, buttonState: ButtonState) => {
    const isDisabled = buttonState === ButtonState.Disabled;

    return match({ buttonType, isDisabled })
      .with({ buttonType: ButtonType.Main, isDisabled: true }, () => ({
        backgroundColor: MAIN_DISABLED_FILL,
        borderColor: MAIN_DISABLED_FILL,
        textColor: colors.primaryBlack,
      }))
      .with({ buttonType: ButtonType.Main, isDisabled: false }, () => ({
        backgroundColor: colors.purple900,
        borderColor: colors.purple900,
        textColor: colors.primaryWhite,
      }))
      .with({ buttonType: ButtonType.Primary, isDisabled: true }, () => ({
        backgroundColor: colors.primaryGrey,
        borderColor: colors.primaryGrey,
        textColor: colors.primaryWhite,
      }))
      .with({ buttonType: ButtonType.Primary, isDisabled: false }, () => ({
        backgroundColor: colors.primaryBlack,
        borderColor: colors.primaryBlack,
        textColor: colors.primaryWhite,
      }))
      .with({ buttonType: ButtonType.Secondary, isDisabled: true }, () => ({
        backgroundColor: colors.primaryWhiteDisabled,
        borderColor: colors.secondaryGrey,
        textColor: colors.primaryGrey,
      }))
      .with({ buttonType: ButtonType.Secondary, isDisabled: false }, () => ({
        backgroundColor: colors.primaryWhite,
        borderColor: colors.secondaryGrey,
        textColor: colors.primaryBlack,
      }))
      .with({ buttonType: ButtonType.Tertiary, isDisabled: true }, () => ({
        backgroundColor: colors.primaryWhiteDisabled,
        borderColor: colors.primaryWhiteDisabled,
        textColor: colors.primaryGrey,
      }))
      .with({ buttonType: ButtonType.Tertiary, isDisabled: false }, () => ({
        backgroundColor: colors.primaryWhite,
        borderColor: colors.primaryWhite,
        textColor: colors.primaryBlack,
      }))
      .with({ buttonType: ButtonType.Quaternary, isDisabled: true }, () => ({
        backgroundColor: colors.secondaryGrey,
        borderColor: colors.secondaryGrey,
        textColor: colors.primaryGrey,
      }))
      .with({ buttonType: ButtonType.Quaternary, isDisabled: false }, () => ({
        backgroundColor: colors.secondaryGrey,
        borderColor: colors.secondaryGrey,
        textColor: colors.primaryBlack,
      }))
      .with({ buttonType: ButtonType.Ghost, isDisabled: true }, () => ({
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        textColor: colors.primaryGrey,
      }))
      .with({ buttonType: ButtonType.Ghost, isDisabled: false }, () => ({
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        textColor: colors.primaryBlack,
      }))
      .exhaustive();
  };

  const styleIconColor = (buttonType: ButtonType, buttonState: ButtonState) => {
    const isDisabled = buttonState === ButtonState.Disabled;

    return match({ buttonType, isDisabled })
      .with({ buttonType: ButtonType.Main, isDisabled: true }, () => colors.primaryBlack)
      .with({ buttonType: ButtonType.Main, isDisabled: false }, () => colors.primaryWhite)
      .with({ buttonType: ButtonType.Primary, isDisabled: true }, () => colors.primaryWhiteDisabled)
      .with({ buttonType: ButtonType.Primary, isDisabled: false }, () => colors.primaryWhite)
      .with({ buttonType: ButtonType.Secondary, isDisabled: true }, () => colors.primaryGrey)
      .with({ buttonType: ButtonType.Secondary, isDisabled: false }, () => colors.primaryBlack)
      .with({ buttonType: ButtonType.Tertiary, isDisabled: true }, () => colors.primaryGrey)
      .with({ buttonType: ButtonType.Tertiary, isDisabled: false }, () => colors.primaryBlack)
      .with({ buttonType: ButtonType.Quaternary, isDisabled: true }, () => colors.primaryGrey)
      .with({ buttonType: ButtonType.Quaternary, isDisabled: false }, () => colors.primaryBlack)
      .with({ buttonType: ButtonType.Ghost, isDisabled: true }, () => colors.primaryGrey)
      .with({ buttonType: ButtonType.Ghost, isDisabled: false }, () => colors.primaryBlack)
      .exhaustive();
  };

  return {
    derived: {
      styleIconColor,
      getButtonStyles,
    },
  };
};
