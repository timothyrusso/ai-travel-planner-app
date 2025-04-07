import CustomIconButton from '@/ui/components/basic/CustomIconButton/CustomIconButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomScrollView from '@/ui/components/composite/CustomScrollView/CustomScrollView';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import { FlatList, Image, View } from 'react-native';
import { useTripDetailPageLogic } from './TripDetailPage.logic';
import { styles } from './TripDetailPage.style';
import { DayItem } from './components/DayItem/DayItem';

const separator = () => <View style={styles.separator} />;

export const TripDetailPage = () => {
  const { goBackHandler, _tripData, _tripDays, isFavorite, addToFavoritesHandler, handleDeleteTrip } =
    useTripDetailPageLogic();

  return (
    <BasicView style={styles.basicViewContainer} isFullScreen>
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
      <Image
        source={{
          uri: _tripData.image,
        }}
        style={styles.image}
      />
      <CustomScrollView style={styles.container}>
        <CustomText text={_tripData.location} style={styles.title} />
        <CustomText text={_tripDays} style={styles.subTitle} />
        <CustomText style={styles.people} text={`🫂 ${_tripData.tripDetails.travelers.toString()}`} />

        <FlatList
          data={_tripData.dayPlans}
          keyExtractor={item => item.day.toString()}
          renderItem={({ item }) => <DayItem dayPlan={item} />}
          scrollEnabled={false}
          contentContainerStyle={styles.dayPlans}
          ItemSeparatorComponent={separator}
        />
      </CustomScrollView>
    </BasicView>
  );
};
