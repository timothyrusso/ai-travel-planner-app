import { StyleSheet } from 'react-native';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';

export const styles = StyleSheet.create({
  text: {
    fontFamily: fontFamily.interRegular,
    fontSize: fontSize.SM,
  },
});
