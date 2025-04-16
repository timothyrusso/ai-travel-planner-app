import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { StyleSheet } from 'react-native';

export const styles = (paddingTop: number) =>
  StyleSheet.create({
    basicContainer: {
      paddingTop,
      position: 'relative',
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: spacing.Triple,
      paddingHorizontal: spacing.Fourfold,
      marginBottom: spacing.Quintuple,
    },
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '100%',
    },
    containerViewStyle: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primaryWhite,
    },
  });
