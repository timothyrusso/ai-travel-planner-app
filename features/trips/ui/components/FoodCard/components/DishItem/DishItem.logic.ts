import { useTranslation } from 'react-i18next';
import type { TypicalDish } from '@/features/trips/domain/entities/TypicalDish';

const glutenFreeImage = require('@/features/core/design-system/assets/images/gluten_free.png');
const veganImage = require('@/features/core/design-system/assets/images/vegan.png');
const vegetarianImage = require('@/features/core/design-system/assets/images/vegetarian.png');

export const useDishItemLogic = (dish: TypicalDish) => {
  const { t } = useTranslation();
  const hasBadge = dish.isGlutenFree || dish.isVegan || dish.isVegetarian;

  return {
    state: {
      name: dish.name,
      description: dish.description,
      image: dish.imageUrl,
      glutenFreeImage,
      veganImage,
      vegetarianImage,
      isGlutenFree: dish.isGlutenFree,
      isVegan: dish.isVegan,
      isVegetarian: dish.isVegetarian,
      glutenFreeLabel: t('MY_TRIP.GLUTEN_FREE'),
      veganLabel: t('MY_TRIP.VEGAN'),
      vegetarianLabel: t('MY_TRIP.VEGETARIAN'),
    },
    derived: {
      hasBadge,
    },
  };
};
