import { ScrollView, View } from 'react-native';
import { Badge, BottomSheetHeader, CustomImage, CustomText, colors } from '@/features/core/design-system';
import { IngredientsList } from '@/features/trips/ui/components/IngredientsList/IngredientsList';
import { useDishDetailsModalPageLogic } from '@/features/trips/ui/pages/DishDetailsModalPage/DishDetailsModalPage.logic';
import { styles } from '@/features/trips/ui/pages/DishDetailsModalPage/DishDetailsModalPage.style';

export const DishDetailsModalPage = () => {
  const { state, effects } = useDishDetailsModalPageLogic();

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <BottomSheetHeader title={state.dishName} onClose={effects.handleClose} />
      <View style={styles.bodyContainer}>
        <CustomImage
          source={typeof state.image === 'string' ? { uri: state.image } : state.image}
          style={styles.image}
          onError={effects.retryDishImage}
        />
        <IngredientsList title="MY_TRIP.INGREDIENTS" ingredients={state.dishIngredients} />
      </View>
      <CustomText text={state.dishDescription} style={styles.description} />
      <View style={styles.badgesContainer}>
        <Badge
          label="MY_TRIP.GLUTEN_FREE"
          image={state.glutenFreeImage}
          backgroundColor={colors.lime700}
          active={state.isGlutenFree}
        />
        <Badge label="MY_TRIP.VEGAN" image={state.veganImage} backgroundColor={colors.lime700} active={state.isVegan} />
        <Badge
          label="MY_TRIP.VEGETARIAN"
          image={state.vegetarianImage}
          backgroundColor={colors.lime700}
          active={state.isVegetarian}
        />
      </View>
    </ScrollView>
  );
};
