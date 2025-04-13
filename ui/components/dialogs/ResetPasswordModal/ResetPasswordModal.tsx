import ModalTemplate from '../ModalTemplate/ModalTemplate';
import { useResetPasswordModalLogic } from './ResetPasswordModal.logic';
import { ResetPasswordModalBody } from './components/ResetPasswordModalBody/ResetPasswordModalBody';

export const ResetPasswordModal = () => {
  const { isVisible, closeModal, handleResetPasswordButton, email, setEmail } = useResetPasswordModalLogic();

  return (
    <ModalTemplate isVisible={isVisible}>
      <ModalTemplate.Container>
        <ModalTemplate.Header title={'SIGNIN.RESET_PASSWORD_TITLE'} action={closeModal} />
        <ModalTemplate.Content>
          <ModalTemplate.Body>
            <ResetPasswordModalBody email={email} setEmail={setEmail} />
          </ModalTemplate.Body>
          <ModalTemplate.FixedFooter
            primaryButtonTitle={'GLOBAL.BUTTON.CONFIRM'}
            primaryAction={handleResetPasswordButton}
            secondaryAction={closeModal}
            secondaryButtonTitle="GLOBAL.BUTTON.CANCEL"
          />
        </ModalTemplate.Content>
      </ModalTemplate.Container>
    </ModalTemplate>
  );
};
