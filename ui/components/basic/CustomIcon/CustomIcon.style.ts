import { StyleSheet } from 'react-native';

import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';

export const styles = (circleSize = dimensions.separator40) =>
  StyleSheet.create({
    icon: {
      alignItems: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    iconSize: {
      lineHeight: circleSize,
    },
    iconOutline: {
      height: circleSize,
      width: circleSize,
      backgroundColor: colors.primaryWhite,
      borderRadius: circleSize,
    },
  });
