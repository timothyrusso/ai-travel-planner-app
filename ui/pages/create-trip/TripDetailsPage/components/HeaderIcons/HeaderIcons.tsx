import { CustomIconButton } from '@/ui/components/basic/CustomIconButton/CustomIconButton';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import { View } from 'react-native';
import { useHeaderIconsLogic } from './HeaderIcons.logic';
import { styles } from './HeaderIcons.style';

export const HeaderIcons = () => {
  const { goBackHandler, addToFavoritesHandler, handleDeleteTrip, isFavorite } = useHeaderIconsLogic();

  return (
    <View style={styles.container}>
      <CustomIconButton
        icon={icons.arrowBack}
        iconSize={spacing.Quintuple}
        iconColor={colors.primaryBlack}
        onPress={goBackHandler}
        style={styles.backIcon}
      />
      <CustomIconButton
        icon={!isFavorite ? icons.hearth : icons.heartOutline}
        iconSize={spacing.Quintuple}
        iconColor={colors.primaryBlack}
        onPress={addToFavoritesHandler}
        style={styles.favoriteIcon}
      />
      <CustomIconButton
        icon={icons.remove}
        iconSize={spacing.Quintuple}
        iconColor={colors.primaryBlack}
        onPress={handleDeleteTrip}
        style={styles.removeIcon}
      />
    </View>
  );
};
