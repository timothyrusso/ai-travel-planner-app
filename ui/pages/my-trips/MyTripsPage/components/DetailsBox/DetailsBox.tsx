import type { TripItem } from '@/modules/trip/domain/entities/TripItem';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import { CustomIcon } from '@/ui/components/basic/CustomIcon/CustomIcon';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { blur } from '@/ui/constants/style/blur';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import { BlurView } from 'expo-blur';
import type { FC } from 'react';
import { View } from 'react-native';
import { useDetailsBoxLogic } from './DetailsBox.logic';
import { styles } from './DetailsBox.style';

type DetailsBoxProps = {
  location: string;
  days: number;
  budget: string;
  travelers: number;
  tripItem: TripItem;
};

export const DetailsBox: FC<DetailsBoxProps> = ({ location, days, budget, travelers, tripItem }) => {
  const { handlePress, budgetLabel } = useDetailsBoxLogic(tripItem, budget);

  return (
    <BlurView intensity={blur.default} style={styles.detailsContainer} experimentalBlurMethod="dimezisBlurView">
      <View style={styles.locationContainer}>
        <CustomIcon name={icons.locationOutline} size={spacing.Triple} color={colors.primaryWhite} />
        <CustomText text={location} style={styles.location} />
      </View>
      <CustomText text={`${days} days`} style={styles.location} />
      <CustomText text={budgetLabel} style={styles.location} />
      <CustomText text={`${travelers} travelers`} style={styles.location} />
      <CustomButton title="MY_TRIP.TRIP_DETAILS" onPress={handlePress} style={styles.detailsButton} />
    </BlurView>
  );
};
