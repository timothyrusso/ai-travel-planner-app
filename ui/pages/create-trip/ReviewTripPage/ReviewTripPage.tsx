import CustomText from '@/ui/components/basic/CustomText/CustomText';
import CardWithImage from '@/ui/components/composite/CardWithImage/CardWithImage';
import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { FlatList, View } from 'react-native';
import { type TripRecap, useReviewTripPageLogic } from './ReviewTripPage.logic';
import { style } from './ReviewTripPage.style';

const separatorItem = () => <View style={style.separator} />;

const ReviewTripPage = () => {
  const { handleButtonPress, tripData } = useReviewTripPageLogic();

  const item = ({ item }: { item: TripRecap }) =>
    item.value !== null ? <CardWithImage title={item.title} description={item.value} icon={item.icon} /> : null;

  return (
    <BasicView
      nameView={Routes.ReviewTrip}
      statusBarStyle="dark"
      bottomButtonTitle="REVIEW_TRIP.BUILD_TRIP"
      bottomButtonPress={handleButtonPress}
    >
      <CustomText text="REVIEW_TRIP.DESCRIPTION" style={style.subtitle} />
      <FlatList
        data={tripData}
        keyExtractor={item => item.value}
        ItemSeparatorComponent={separatorItem}
        renderItem={item}
        style={style.list}
      />
    </BasicView>
  );
};

export default ReviewTripPage;
