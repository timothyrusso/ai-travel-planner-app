import { CustomIcon, type IoniconsName } from '@/ui/components/basic/CustomIcon/CustomIcon';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import type { FC } from 'react';
import { Pressable, View } from 'react-native';
import { style } from './ButtonsContainer.style';

type ButtonsContainerProps = {
  firstTitle: string;
  firstOnPress: () => void;
  firstIcon: IoniconsName;
  secondTitle: string;
  secondOnPress: () => void;
  secondIcon: IoniconsName;
  thirdTitle: string;
  thirdOnPress: () => void;
  thirdIcon: IoniconsName;
};

export const ButtonsContainer: FC<ButtonsContainerProps> = ({
  firstTitle,
  firstOnPress,
  firstIcon,
  secondTitle,
  secondOnPress,
  secondIcon,
  thirdTitle,
  thirdOnPress,
  thirdIcon,
}) => {
  return (
    <View style={style.container}>
      <Pressable style={({ pressed }) => [style.button, pressed && style.pressed]} onPress={firstOnPress}>
        <View style={style.titleContainer}>
          <CustomIcon name={firstIcon} size={spacing.TripleAndHalf} color={colors.primaryBlack} />
          <CustomText text={firstTitle} style={style.title} />
        </View>
        <CustomIcon name={icons.arrowRight} size={spacing.TripleAndHalf} color={colors.primaryBlack} />
      </Pressable>
      <Pressable
        style={({ pressed }) => [style.button, style.topBorder, pressed && style.pressed]}
        onPress={secondOnPress}
      >
        <View style={style.titleContainer}>
          <CustomIcon name={secondIcon} size={spacing.TripleAndHalf} color={colors.primaryBlack} />
          <CustomText text={secondTitle} style={style.title} />
        </View>
        <CustomIcon name={icons.arrowRight} size={spacing.TripleAndHalf} color={colors.primaryBlack} />
      </Pressable>
      <Pressable
        style={({ pressed }) => [style.button, style.topBorder, pressed && style.pressed]}
        onPress={thirdOnPress}
      >
        <View style={style.titleContainer}>
          <CustomIcon name={thirdIcon} size={spacing.TripleAndHalf} color={colors.primaryBlack} />
          <CustomText text={thirdTitle} style={style.title} />
        </View>
        <CustomIcon name={icons.arrowRight} size={spacing.TripleAndHalf} color={colors.primaryBlack} />
      </Pressable>
    </View>
  );
};
