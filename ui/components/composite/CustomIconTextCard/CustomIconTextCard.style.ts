import { components } from '@/ui/constants/style/dimensions/components';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

export const styles = (labelColor: TextStyle['color'], iconBackgroundColor: ViewStyle['backgroundColor']) =>
  StyleSheet.create({
    card: {
      height: components.textIconCard,
      justifyContent: 'space-between',
      padding: spacing.Triple,
    },
    icon: {
      alignSelf: 'flex-start',
      backgroundColor: iconBackgroundColor,
    },
    label: {
      fontFamily: fonts.interBold,
      fontSize: spacing.Fourfold,
      color: labelColor,
    },
  });
