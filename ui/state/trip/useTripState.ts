import { createSelectors } from '../shared/createSelectors';
import { useTripStore } from './tripStore';

export const useTripState = () => {
  const tripStore = createSelectors(useTripStore);

  const { actions, ...tripSelectors } = tripStore.use;

  return {
    tripActions: actions(),
    tripSelectors: { ...tripSelectors },
  };
};
