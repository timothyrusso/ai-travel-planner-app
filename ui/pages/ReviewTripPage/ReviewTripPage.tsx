import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CardWithImage from '@/ui/components/composite/CardWithImage/CardWithImage';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import { icons } from '@/ui/constants/style/icons';
import { FlatList, View } from 'react-native';
import { type TripRecap, useReviewTripPageLogic } from './ReviewTripPage.logic';
import { style } from './ReviewTripPage.style';

const ReviewTripPage = () => {
  const { handleBackPress, handleButtonPress, tripData } = useReviewTripPageLogic();

  const item = ({ item }: { item: TripRecap }) =>
    item.value !== null ? <CardWithImage title={item.title} description={item.value} icon={item.icon} /> : null;

  const separatorItem = () => <View style={style.separator} />;

  return (
    <BasicView>
      <CustomHeader title="REVIEW_TRIP.TITLE" icon={icons.arrowBack} onPress={handleBackPress} />
      <CustomText text="REVIEW_TRIP.DESCRIPTION" style={style.subtitle} />
      <FlatList
        data={tripData}
        keyExtractor={item => item.value}
        ItemSeparatorComponent={separatorItem}
        renderItem={item}
      />
      <View style={style.buttonContainer}>
        <CustomButton title="REVIEW_TRIP.BUILD_TRIP" onPress={handleButtonPress} style={style.button} />
      </View>
    </BasicView>
  );
};

export default ReviewTripPage;
