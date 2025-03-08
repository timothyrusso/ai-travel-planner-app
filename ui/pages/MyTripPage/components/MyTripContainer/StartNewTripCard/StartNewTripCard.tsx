import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { routes } from '@/ui/constants/routes';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { style } from './StartNewTripCard.style';

const StartNewTripCard = () => {
  const router = useRouter();

  return (
    <View style={style.container}>
      <Ionicons name={icons.location} size={spacing.Quintuple} color={colors.primaryBlack} />
      <CustomText text="MYTRIP.NO_TRIPS_PLANNED" style={style.title} />
      <CustomButton
        title="MYTRIP.START_NEW_TRIP"
        onPress={() => router.push(routes.searchPlace)}
        style={style.button}
      />
    </View>
  );
};

export default StartNewTripCard;
