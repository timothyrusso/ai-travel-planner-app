import { PlatformOS } from '@/ui/constants/PlatformOS';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { Platform, StatusBar, StyleSheet } from 'react-native';

export const styles = (isFullScreen = false) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primaryWhite,
    },
    viewContainer: {
      flex: 1,
      padding: spacing.Fourfold,
      paddingTop: Platform.OS === PlatformOS.android && !isFullScreen ? StatusBar.currentHeight : 0,
    },
  });
