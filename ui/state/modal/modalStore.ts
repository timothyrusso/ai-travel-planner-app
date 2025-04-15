import { immer } from 'zustand/middleware/immer';

import { create } from '../shared/createStore';
import type { ModalActions, ModalState } from './types';

const initialState: ModalState = {
  resetPasswordModal: {
    isVisible: false,
    modal: {
      headerTitle: undefined,
      primaryAction: () => {},
      secondaryAction: () => {},
      primaryButtonTitle: 'GLOBAL.BUTTON.CONFIRM',
      secondaryButtonTitle: 'GLOBAL.BUTTON.CANCEL',
    },
  },
  infoModal: {
    isVisible: false,
    modal: {},
  },
  actionModal: {
    isVisible: false,
    modal: {
      headerTitle: undefined,
      primaryAction: () => {},
      secondaryAction: () => {},
      primaryButtonTitle: 'GLOBAL.BUTTON.CONFIRM',
      secondaryButtonTitle: 'GLOBAL.BUTTON.CANCEL',
    },
  },
};

export const useModalStore = create<ModalState & ModalActions>()(
  immer(set => ({
    ...initialState,
    actions: {
      showResetPasswordModal: modal =>
        set({
          resetPasswordModal: {
            isVisible: true,
            modal,
          },
        }),
      hideResetPasswordModal: () =>
        set(state => ({
          resetPasswordModal: {
            isVisible: false,
            modal: state.resetPasswordModal.modal,
          },
        })),
      showInfoModal: modal =>
        set({
          infoModal: {
            isVisible: true,
            modal,
          },
        }),
      hideInfoModal: () =>
        set(state => ({
          infoModal: {
            isVisible: false,
            modal: state.infoModal.modal,
          },
        })),
      showActionModal: modal =>
        set({
          actionModal: {
            isVisible: true,
            modal,
          },
        }),
      hideActionModal: () =>
        set(state => ({
          actionModal: {
            isVisible: false,
            modal: state.actionModal.modal,
          },
        })),
      resetModal: () => set(initialState),
    },
  })),
);
