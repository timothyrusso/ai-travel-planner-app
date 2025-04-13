export type ModalType = {
  isVisible: boolean;
};

export type ModalState = {
  resetPasswordModal: ResetPasswordModalType;
};

export type ResetPasswordModalContentType = {
  headerTitle?: string;
  primaryAction: () => void;
  secondaryAction?: () => void;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
};

export type ResetPasswordModalType = ModalType & {
  modal: ResetPasswordModalContentType;
};

export type ModalActions = {
  actions: {
    showResetPasswordModal: (modal: ResetPasswordModalContentType) => void;
    hideResetPasswordModal: () => void;
    resetModal: () => void;
  };
};
