import { ScrollView } from 'react-native';
import { TypicalDishesList } from '@/features/trips/ui/components/TypicalDishesList/TypicalDishesList';
import { TypicalDishesModalHeader } from '@/features/trips/ui/components/TypicalDishesModalHeader/TypicalDishesModalHeader';
import { useTypicalDishesModalPageLogic } from '@/features/trips/ui/pages/TypicalDishesModalPage/TypicalDishesModalPage.logic';
import { styles } from '@/features/trips/ui/pages/TypicalDishesModalPage/TypicalDishesModalPage.style';

export const TypicalDishesModalPage = () => {
  const { state, derived, effects } = useTypicalDishesModalPageLogic();

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <TypicalDishesModalHeader
        location={derived.location}
        dishNumber={derived.dishNumber}
        onClose={effects.handleClose}
      />
      <TypicalDishesList dishItems={state.dishItems} onDishPress={effects.handleDishPress} />
    </ScrollView>
  );
};
