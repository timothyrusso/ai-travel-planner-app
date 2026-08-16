import { match } from 'ts-pattern';

import { colors } from '@/features/core/design-system/style/colors';

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
  // Disabled `Main` is `purple300`, not the neutral `primaryGrey` a disabled `Primary` uses: the
  // brand CTA has to stay recognisable as the brand CTA when it is unavailable, otherwise the two
  // disabled buttons are the same pill.
  const getButtonStyles = (buttonType: ButtonType, buttonState: ButtonState) => {
    const isDisabled = buttonState === ButtonState.Disabled;

    return match({ buttonType, isDisabled })
      .with({ buttonType: ButtonType.Main, isDisabled: true }, () => ({
        backgroundColor: colors.purple300,
        borderColor: colors.purple300,
        textColor: colors.primaryWhite,
      }))
      .with({ buttonType: ButtonType.Main, isDisabled: false }, () => ({
        backgroundColor: colors.purple500,
        borderColor: colors.purple500,
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

  // A disabled `Main`/`Primary` glyph sits on a filled pill whose whole disabled cue is the fill,
  // so it stays `primaryWhite` — as legible as the label beside it, which `getButtonStyles` already
  // draws in `primaryWhite`.
  const styleIconColor = (buttonType: ButtonType, buttonState: ButtonState) => {
    const isDisabled = buttonState === ButtonState.Disabled;

    return match({ buttonType, isDisabled })
      .with({ buttonType: ButtonType.Main, isDisabled: true }, () => colors.primaryWhite)
      .with({ buttonType: ButtonType.Main, isDisabled: false }, () => colors.primaryWhite)
      .with({ buttonType: ButtonType.Primary, isDisabled: true }, () => colors.primaryWhite)
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
