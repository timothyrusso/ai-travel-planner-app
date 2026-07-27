import { StyleSheet, type TextStyle } from 'react-native';
import { components } from '@/features/core/design-system/style/dimensions/components';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';

export const styles = (labelColor: TextStyle['color']) =>
  StyleSheet.create({
    card: {
      height: components.buttonNumberHeight,
      width: components.buttonNumberHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },

    label: {
      fontFamily: fontFamily.interBold,
      fontSize: fontSize.LG,
      color: labelColor,
    },
  });
