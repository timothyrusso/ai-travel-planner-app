import type { FC } from 'react';
import { View } from 'react-native';
import { CustomChip, CustomText, colors, icons } from '@/features/core/design-system';
import { styles } from '@/features/trips/ui/components/IngredientsList/IngredientsList.style';

type IngredientsListProps = {
  title: string;
  ingredients: string[];
};

export const IngredientsList: FC<IngredientsListProps> = ({ title, ingredients }) => (
  <View style={styles.container}>
    <CustomText text={title} style={styles.title} />
    <View style={styles.chipsRow}>
      {ingredients.map(ingredient => (
        <CustomChip
          key={ingredient}
          title={ingredient}
          color={colors.secondaryGrey}
          icon={icons.checkmark}
          uppercase={false}
        />
      ))}
    </View>
  </View>
);
