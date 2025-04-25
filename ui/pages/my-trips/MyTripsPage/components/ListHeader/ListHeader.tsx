import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import type { FC } from 'react';
import { View } from 'react-native';
import { useListHeaderLogic } from './ListHeader.logic';
import { styles } from './ListHeader.style';

type ListHeaderProps = {
  userTrips: number;
};

export const ListHeader: FC<ListHeaderProps> = ({ userTrips }) => {
  const { goToShowAllTrips } = useListHeaderLogic();

  return userTrips > 0 ? (
    <View style={styles.header}>
      <CustomText style={styles.title} text="MY_TRIP.NEWEST_DESTINATIONS" />
      <CustomButton
        title="GLOBAL.VIEW_ALL"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={goToShowAllTrips}
      />
    </View>
  ) : null;
};
