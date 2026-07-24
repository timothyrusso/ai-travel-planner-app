import type { FC } from 'react';
import { Pressable, View } from 'react-native';
import { CustomImage, CustomText } from '@/features/core/ui';
import type { TypicalDish } from '@/features/trips/domain/entities/TypicalDish';
import { useDishItemLogic } from '@/features/trips/ui/components/FoodCard/components/DishItem/DishItem.logic';
import { styles } from '@/features/trips/ui/components/FoodCard/components/DishItem/DishItem.style';

type DishItemProps = { dish: TypicalDish; onPress: () => void };

export const DishItem: FC<DishItemProps> = ({ dish, onPress }) => {
  const { state, derived } = useDishItemLogic(dish);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={state.name}
    >
      <View>
        <CustomImage
          source={typeof state.image === 'string' ? { uri: state.image } : state.image}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <CustomText text={state.name} style={styles.title} numberOfLines={1} ellipsizeMode="tail" />
        <CustomText
          text={state.description}
          style={styles.description}
          numberOfLines={derived.hasBadge ? 2 : 3}
          ellipsizeMode="tail"
        />
        {derived.hasBadge && (
          <View style={styles.badgeContainer}>
            {state.isGlutenFree && (
              <CustomImage
                source={state.glutenFreeImage}
                style={styles.badge}
                accessibilityLabel={state.glutenFreeLabel}
              />
            )}
            {state.isVegan && (
              <CustomImage source={state.veganImage} style={styles.badge} accessibilityLabel={state.veganLabel} />
            )}
            {state.isVegetarian && (
              <CustomImage
                source={state.vegetarianImage}
                style={styles.badge}
                accessibilityLabel={state.vegetarianLabel}
              />
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};
