import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { StyleSheet } from 'react-native';

export const tabsStyle = StyleSheet.create({
  tabList: {
    display: 'flex',
    position: 'absolute',
    bottom: spacing.Quintuple,
    left: spacing.Fourfold,
    right: spacing.Fourfold,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondaryGrey,
    paddingVertical: spacing.Double,
    paddingHorizontal: spacing.separator40,
    borderRadius: spacing.Quintuple,
    height: spacing.separator40 + spacing.TripleAndHalf,
  },
  tabTrigger: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
