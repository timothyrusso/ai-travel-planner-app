import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { Platform, StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    padding: spacing.Fourfold,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
