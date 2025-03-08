import CustomIcon from '@/ui/components/basic/CustomIcon/CustomIcon';
import CustomIconButton from '@/ui/components/basic/CustomIconButton/CustomIconButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomScrollView from '@/ui/components/composite/CustomScrollView/CustomScrollView';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import { Ionicons } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import { useTripDetailPageLogic } from './TripDetailPage.logic';
import { styles } from './TripDetailPage.style';

export const TripDetailPage = () => {
  const { goBackHandler, _tripData, _tripDays } = useTripDetailPageLogic();

  return (
    <BasicView style={styles.basicViewContainer} isFullScreen>
      <CustomIconButton
        icon={icons.arrowBackCircleOutline}
        iconSize={spacing.Quintuple}
        iconColor={colors.primaryBlack}
        onPress={goBackHandler}
        style={styles.icon}
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
        <View style={styles.iconAndText}>
          <CustomIcon<typeof Ionicons> name="people" size={12} IconComponent={Ionicons} color={colors.primaryGrey} />
          <CustomText style={styles.people} text={_tripData.tripDetails.travelers.toString()} />
        </View>

        <View>
          {_tripData.dayPlans.map((day, _index) => (
            <View key={day.day}>
              <CustomText text={`Day ${day.day.toString()}`} style={styles.title} />
              <CustomText text={day.theme} style={styles.title} />
            </View>
          ))}
        </View>
      </CustomScrollView>
    </BasicView>
  );
};
