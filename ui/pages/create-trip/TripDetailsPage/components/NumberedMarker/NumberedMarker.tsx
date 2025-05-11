import CustomText from '@/ui/components/basic/CustomText/CustomText';
import type { FC } from 'react';
import { View } from 'react-native';
import { styles } from './NumberedMarket.style';

type NumberedMarkerProps = {
  number: number;
};

export const NumberedMarker: FC<NumberedMarkerProps> = ({ number }) => {
  return (
    <View style={styles.container}>
      <CustomText text={number.toString()} style={styles.number} />
    </View>
  );
};
