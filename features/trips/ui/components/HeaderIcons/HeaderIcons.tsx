import { View } from 'react-native';
import { ButtonType, CustomIconButtonMedium, icons, spacing } from '@/features/core/design-system';
import { useHeaderIconsLogic } from '@/features/trips/ui/components/HeaderIcons/HeaderIcons.logic';
import { heartPulseStyle, styles } from '@/features/trips/ui/components/HeaderIcons/HeaderIcons.style';

export const HeaderIcons = () => {
  const { state, effects } = useHeaderIconsLogic();

  return (
    <View style={styles.container}>
      <CustomIconButtonMedium
        iconName={icons.arrowBack}
        iconSize={spacing.Fourfold}
        onPress={effects.goBackHandler}
        style={styles.backIcon}
        buttonType={ButtonType.Quaternary}
      />
      <CustomIconButtonMedium
        iconName={!state.isFavorite ? icons.hearth : icons.heartOutline}
        iconSize={spacing.Fourfold}
        onPress={effects.addToFavoritesHandler}
        style={styles.favoriteIcon}
        buttonType={ButtonType.Quaternary}
        animatedIconStyle={state.shouldAnimate ? heartPulseStyle : undefined}
        noPressedStyle
      />
      <CustomIconButtonMedium
        iconName={icons.remove}
        iconSize={spacing.Fourfold}
        onPress={effects.handleDeleteTrip}
        style={styles.removeIcon}
        buttonType={ButtonType.Quaternary}
      />
    </View>
  );
};
