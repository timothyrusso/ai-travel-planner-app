import type { UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import { TripListItem } from '@/ui/components/composite/TripListItem/TripListItem';
import { colors } from '@/ui/constants/style/colors';
import type { FC } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { EmptyListContainer } from '../EmptyListContainer/EmptyListContainer';
import { ListHeader } from '../ListHeader/ListHeader';
import { styles } from './UserTripList.style';
type UserTripListProps = {
  userTrips: UserTrips[] | [];
  isLoading: boolean;
};

const separator = () => <View style={styles.separator} />;

const renderItem = ({ item }: { item: UserTrips }) => {
  const _userTripData = item.userTripData ? JSON.parse(item.userTripData) : {};

  return (
    <View style={styles.itemContainer}>
      <TripListItem
        tripItem={{
          ...item.tripAiResp,
          ..._userTripData,
          image: item.userTripData ? JSON.parse(item.userTripData).imageUrl : undefined,
          id: item.docId,
          isFavorite: item.isFavorite,
        }}
      />
    </View>
  );
};

export const UserTripList: FC<UserTripListProps> = ({ userTrips, isLoading }) => {
  return isLoading ? (
    <ActivityIndicator size="large" color={colors.primary} />
  ) : (
    <FlatList
      data={userTrips}
      keyExtractor={item => item.docId}
      renderItem={renderItem}
      ItemSeparatorComponent={separator}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyListContainer />}
      ListHeaderComponent={() => <ListHeader userTrips={userTrips.length} />}
      style={styles.container}
    />
  );
};
