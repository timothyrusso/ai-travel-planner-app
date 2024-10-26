import { dimensions } from '@/constants/style/dimensions';
import { Platform, StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    padding: dimensions.Fourfold,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
