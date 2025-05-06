import { colors } from '@/ui/constants/style/colors';
import { components } from '@/ui/constants/style/dimensions/components';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginVertical: spacing.Fourfold,
  },
  avatar: {
    width: components.profileImageHeight,
    height: components.profileImageHeight,
    borderRadius: components.profileImageHeight / 2,
    overflow: 'hidden',
    backgroundColor: colors.secondaryPink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: spacing.Fourfold,
    fontFamily: fonts.interBold,
    textAlign: 'center',
  },
  email: {
    fontSize: spacing.Double,
    fontFamily: fonts.interRegular,
    textAlign: 'center',
    paddingTop: spacing.Triple,
    paddingBottom: spacing.Fourfold,
  },
  userDataContainer: {
    paddingVertical: spacing.Triple,
    paddingHorizontal: spacing.Double,
    borderRadius: spacing.Fourfold,
    backgroundColor: colors.primaryGreen,
    marginHorizontal: spacing.Fourfold,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userDataLabel: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interMedium,
    textAlign: 'center',
  },
  userDataValue: {
    fontSize: spacing.Double,
    fontFamily: fonts.interBold,
    textAlign: 'center',
    paddingTop: spacing.Triple,
    color: colors.primaryBlack,
  },
  settingsContainer: {
    marginHorizontal: spacing.Fourfold,
    marginTop: spacing.Quintuple,
    rowGap: spacing.Triple,
  },
  divider: {
    width: 2,
    backgroundColor: colors.primaryBlack,
    height: '100%',
  },
  userDataItem: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    paddingBottom: spacing.separator80,
  },
});
