import type { TripDetails } from '@/modules/trip/domain/dto/UserTripsDTO';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { Image, View } from 'react-native';
import CustomIcon from '../../basic/CustomIcon/CustomIcon';
import CustomText from '../../basic/CustomText/CustomText';
import { styles } from './TripListItem.style';

type TripListItemProps = {
  tripItem: TripDetails;
};

export const TripListItem: FC<TripListItemProps> = ({ tripItem }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: tripItem.image,
        }}
        style={styles.image}
      />
      <CustomText style={{ fontSize: 20, paddingVertical: 10 }} text={tripItem.destination} numberOfLines={1} />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, columnGap: 5 }}>
        <CustomIcon<typeof FontAwesome> name="hotel" size={12} IconComponent={FontAwesome} />
        <CustomText style={{ fontSize: 12 }} text={tripItem.duration} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, columnGap: 5 }}>
        <CustomIcon<typeof FontAwesome5> name="money-bill-alt" size={12} IconComponent={FontAwesome5} />
        <CustomText style={{ fontSize: 12 }} text={tripItem.budget} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, columnGap: 5 }}>
        <CustomIcon<typeof Ionicons> name="people" size={12} IconComponent={Ionicons} />
        <CustomText style={{ fontSize: 12 }} text={tripItem.travelers} />
      </View>
    </View>
  );
};
