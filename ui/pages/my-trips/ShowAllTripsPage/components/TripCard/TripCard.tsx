import type { UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import { CustomIcon } from '@/ui/components/basic/CustomIcon/CustomIcon';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import { Image, Pressable, View } from 'react-native';
import { useTripCardLogic } from './TripCard.logic';
import { styles } from './TripCard.style';

export const TripCard = ({ item }: { item: UserTrips }) => {
  const { image, location, onCardPress, isFavorite } = useTripCardLogic(item);

  return (
    <Pressable style={({ pressed }) => [styles.container, pressed ? styles.pressed : {}]} onPress={onCardPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.iconContainer}>
        <CustomIcon
          name={isFavorite ? icons.heartOutline : icons.hearth}
          size={spacing.TripleAndHalf}
          color={colors.primaryWhite}
        />
      </View>
      <CustomText text={location} style={styles.title} />
    </Pressable>
  );
};
