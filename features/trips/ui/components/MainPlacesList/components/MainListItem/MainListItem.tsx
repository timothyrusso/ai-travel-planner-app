import type { FC } from 'react';
import { View } from 'react-native';
import { CustomIcon, CustomImage, colors, icons, spacing } from '@/features/core/ui';
import { useMainListItemLogic } from '@/features/trips/ui/components/MainPlacesList/components/MainListItem/MainListItem.logic';
import { styles } from '@/features/trips/ui/components/MainPlacesList/components/MainListItem/MainListItem.style';

type MainListItemProps = {
  index: number;
  photoResourceName?: string;
};

export const MainListItem: FC<MainListItemProps> = ({ index, photoResourceName }) => {
  const { state, derived } = useMainListItemLogic(photoResourceName);

  return index === state.MIN_MAIN_LIST_ITEM_INDEX ? (
    <View style={styles.lastItem}>
      <CustomIcon name={icons.star} size={spacing.Triple} color={colors.primaryBlack} />
    </View>
  ) : (
    <CustomImage
      source={typeof derived.data === 'string' ? { uri: derived.data } : derived.data}
      style={styles.image}
    />
  );
};
