import { CustomIcon } from '@/ui/components/basic/CustomIcon/CustomIcon';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { blur } from '@/ui/constants/style/blur';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import { BlurView } from 'expo-blur';
import { Pressable, View } from 'react-native';
import { useHomeCustomHeaderLogic } from './HomeCustomHeader.logic';
export const HomeCustomHeader = () => {
  const { styles, handleCreateTrip, handleShowAllTrips } = useHomeCustomHeaderLogic();

  return (
    <View style={styles.container}>
      <Pressable onPress={handleCreateTrip} style={({ pressed }) => pressed && styles.pressed}>
        <BlurView intensity={blur.default} style={styles.createTripContainer} experimentalBlurMethod="dimezisBlurView">
          <CustomText text="MY_TRIP.CREATE_NEW_TRIP" style={styles.createTripText} />
          <CustomIcon name={icons.addCircle} size={spacing.Triple} color={colors.primaryWhite} />
        </BlurView>
      </Pressable>
      <Pressable onPress={handleShowAllTrips} style={({ pressed }) => pressed && styles.pressed}>
        <BlurView
          intensity={blur.default}
          style={styles.showAllTripsContainer}
          experimentalBlurMethod="dimezisBlurView"
        >
          <CustomText text="MY_TRIP.SHOW_ALL_TRIPS" style={styles.showAllTripsText} />
          <CustomIcon name={icons.list} size={spacing.Triple} color={colors.primaryWhite} />
        </BlurView>
      </Pressable>
    </View>
  );
};
