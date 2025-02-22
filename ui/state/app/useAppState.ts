import { createSelectors } from '../shared/createSelectors';
import { useAppStore } from './appStore';

export const useAppState = () => {
  const appStore = createSelectors(useAppStore);

  const { actions, ...appSelectors } = appStore.use;

  return {
    loading: appSelectors.loading(),
    setAppLoading: actions().setLoading,
    appActions: actions(),
    appSelectors: { ...appSelectors },
  };
};
