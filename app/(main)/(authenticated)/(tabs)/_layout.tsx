import { CustomTabButton } from '@/ui/components/composite/CustomTabButton/CustomTabButton';
import { CustomTabButtonWithText } from '@/ui/components/composite/CustomTabButtonWithText/CustomTabButtonWithText';
import { Routes, Stacks } from '@/ui/constants/routes';
import { icons } from '@/ui/constants/style/icons';
import { useRouter } from 'expo-router';
import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { tabsStyle } from './tabs.style';

const TabLayout = () => {
  const router = useRouter();
  const searchRoute = `/${Stacks.CreateTrip}/${Routes.Search}`;
  const handlePress = () => {
    router.push(searchRoute);
  };

  return (
    <Tabs>
      <TabSlot />
      <TabList style={tabsStyle.tabList}>
        <TabTrigger name="home" href="/my-trips" style={tabsStyle.tabTrigger} asChild>
          <CustomTabButtonWithText icon={icons.location}>My Trips</CustomTabButtonWithText>
        </TabTrigger>
        <TabTrigger name="add-trip" href={searchRoute} style={tabsStyle.tabTrigger} asChild>
          <CustomTabButton icon={icons.add} onPress={handlePress} />
        </TabTrigger>
        <TabTrigger name="profile" href="/profile" style={tabsStyle.tabTrigger} asChild>
          <CustomTabButtonWithText icon={icons.personCircleOutline}>Profile</CustomTabButtonWithText>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
};

export default TabLayout;
