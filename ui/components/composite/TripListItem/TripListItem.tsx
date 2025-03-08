import type { TripAiResp, UserTripData } from '@/modules/trip/domain/dto/UserTripsDTO';
import { routes } from '@/ui/constants/routes';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { FC } from 'react';
import { Image, Pressable, View } from 'react-native';
import CustomIcon from '../../basic/CustomIcon/CustomIcon';
import CustomText from '../../basic/CustomText/CustomText';
import { styles } from './TripListItem.style';

type TripListItemProps = {
  tripItem: TripAiResp & UserTripData & { image: string };
};

export const TripListItem: FC<TripListItemProps> = ({ tripItem }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push({ pathname: routes.tripDetails, params: { trip: JSON.stringify(tripItem) } })}
      style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}]}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: tripItem.image,
          }}
          style={styles.image}
        />
        <CustomText style={{ fontSize: 20, paddingVertical: 10 }} text={tripItem.location} numberOfLines={1} />
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, columnGap: 5 }}>
          <CustomIcon<typeof FontAwesome> name="hotel" size={12} IconComponent={FontAwesome} />
          <CustomText style={{ fontSize: 12 }} text={tripItem.days} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, columnGap: 5 }}>
          <CustomIcon<typeof FontAwesome5> name="money-bill-alt" size={12} IconComponent={FontAwesome5} />
          <CustomText style={{ fontSize: 12 }} text={tripItem?.tripDetails?.budget} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, columnGap: 5 }}>
          <CustomIcon<typeof Ionicons> name="people" size={12} IconComponent={Ionicons} />
          <CustomText style={{ fontSize: 12 }} text={tripItem.tripDetails?.travelers.toString()} />
        </View>
      </View>
    </Pressable>
  );
};
