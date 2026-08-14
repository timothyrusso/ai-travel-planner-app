import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';
import { colors } from '@/features/core/design-system';
import { Routes, Stacks } from '@/features/core/navigation';

const TabLayout = () => {
  const { t } = useTranslation();

  return (
    // Only the tint is configured: every material prop (backgroundColor, blurEffect, shadowColor,
    // indicatorColor) stays at its platform default, otherwise iOS 26 silently drops liquid glass.
    // `rippleColor` is transparent to suppress Android's Material touch ripple on tab presses; the
    // native active-indicator pill is untouched and still animates in behind the selected tab.
    // `accessibilityLabel` is passed explicitly rather than inherited from the visible label: the
    // native side only re-applies the item's a11y label when that prop itself changes, so relying
    // on the inherited title can leave screen readers announcing a stale language after a switch.
    <NativeTabs
      iconColor={iconColor}
      labelStyle={labelStyle}
      minimizeBehavior="never"
      labelVisibilityMode="labeled"
      rippleColor="transparent"
    >
      <NativeTabs.Trigger name={Routes.HomePage} accessibilityLabel={t('HOME.TITLE')}>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          md={{ default: 'home', selected: 'home_filled' }}
        />
        <NativeTabs.Trigger.Label>{t('HOME.TITLE')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      {/* `airplane` has no filled SF Symbol variant, so Trips signals selection through tint alone. */}
      <NativeTabs.Trigger name={Routes.Trips} accessibilityLabel={t('TRIPS.TITLE')}>
        <NativeTabs.Trigger.Icon sf="airplane" md="flight" />
        <NativeTabs.Trigger.Label>{t('TRIPS.TITLE')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name={Routes.Activities} accessibilityLabel={t('ACTIVITIES.TITLE')}>
        <NativeTabs.Trigger.Icon sf={{ default: 'safari', selected: 'safari.fill' }} md="explore" />
        <NativeTabs.Trigger.Label>{t('ACTIVITIES.TITLE')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name={Stacks.Profile} accessibilityLabel={t('PROFILE.TITLE')}>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }}
          md="account_circle"
        />
        <NativeTabs.Trigger.Label>{t('PROFILE.TITLE')}</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabLayout;

const iconColor = { default: colors.primaryGrey, selected: colors.purple500 };

const labelStyle = {
  default: { color: colors.primaryGrey },
  selected: { color: colors.purple500 },
};
