import CustomText from '@/ui/components/basic/CustomText/CustomText';
import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { style } from './TravelersCard.style';

type TravelersCardProps = {
  id: number;
  title: string;
  description: string;
  icon: string;
  onPress: (id: number) => void;
  isSelected: boolean;
};
const TravelersCard: FC<TravelersCardProps> = ({
  id,
  title,
  description,
  icon,
  onPress,
  isSelected,
}) => {
  return (
    <Pressable
      onPress={() => onPress(id)}
      style={({ pressed }) => [
        style.container,
        pressed && style.pressed,
        isSelected && style.selected,
      ]}
    >
      <View style={style.textContainer}>
        <CustomText text={title} style={style.title} />
        <CustomText text={description} style={style.description} />
      </View>
      <CustomText text={icon} style={style.icon} />
    </Pressable>
  );
};

export default TravelersCard;
