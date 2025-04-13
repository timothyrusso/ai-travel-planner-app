import { createSelectors } from '../shared/createSelectors';
import { useModalStore } from './modalStore';

export const useModalState = () => {
  const modalState = createSelectors(useModalStore);

  const { actions, ...stateSelectors } = modalState.use;

  return {
    modalActions: actions(),
    modalSelectors: { ...stateSelectors },
  };
};
