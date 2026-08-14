import { View } from 'react-native';
import { LottieAnimation } from '@/features/core/design-system';
import { styles } from '@/features/trips/ui/components/EmptyListContainer/EmptyListContainer.style';
import { StartNewTripCard } from '@/features/trips/ui/components/StartNewTripCard/StartNewTripCard';

const animation = require('@/features/core/design-system/assets/lottie/trip_animation.json');

export const EmptyListContainer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.newTripContainer}>
        <StartNewTripCard />
      </View>
      <LottieAnimation animationPath={animation} style={styles.animation} />
    </View>
  );
};
