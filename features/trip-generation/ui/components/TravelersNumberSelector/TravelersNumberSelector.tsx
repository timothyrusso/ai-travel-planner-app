import { FlatList, View } from 'react-native';
import { CardType, CustomNumberButton } from '@/features/core/ui';
import { useTravelersNumberSelectorLogic } from '@/features/trip-generation/ui/components/TravelersNumberSelector/TravelersNumberSelector.logic';
import { styles } from '@/features/trip-generation/ui/components/TravelersNumberSelector/TravelersNumberSelector.style';

const Separator = () => <View style={styles.separator} />;

export const TravelersNumberSelector = () => {
  const { state, effects } = useTravelersNumberSelectorLogic();

  const renderItem = ({ item }: { item: number }) => (
    <CustomNumberButton
      cardType={CardType.Secondary}
      label={item.toString()}
      selected={state.travelersNumber === item}
      onPress={() => effects.handleCardPress(item)}
    />
  );

  return (
    <FlatList
      data={state.data}
      renderItem={renderItem}
      keyExtractor={item => item.toString()}
      showsHorizontalScrollIndicator={false}
      horizontal
      ItemSeparatorComponent={Separator}
      style={styles.list}
    />
  );
};
