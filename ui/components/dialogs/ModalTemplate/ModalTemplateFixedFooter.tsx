import { View } from 'react-native';

import CustomButton from '../../basic/CustomButton/CustomButton';
import { styles } from './ModalTemplate.style';

const ModalFixedFooter = ({
  primaryAction,
  secondaryAction,
  primaryButtonTitle = 'GLOBAL.BUTTON.CONFIRM',
  // primaryButtonDisabled = false,
  secondaryButtonTitle = 'GLOBAL.BUTTON.CANCEL',
}: {
  primaryAction: () => void;
  secondaryAction?: () => void;
  primaryButtonTitle?: string;
  primaryButtonDisabled?: boolean;
  secondaryButtonTitle?: string;
  preventClosing?: boolean;
}) => {
  return (
    <View style={[styles.footer, styles.fixedFooterContainer]}>
      {secondaryAction ? (
        <View style={styles.buttonContainer}>
          <CustomButton
            title={secondaryButtonTitle}
            onPress={() => {
              if (secondaryAction) secondaryAction();
            }}
            style={styles.button}
            // isSecondary={true}
          />
        </View>
      ) : null}
      <View style={styles.buttonContainer}>
        <CustomButton
          // disabled={primaryButtonDisabled}
          title={primaryButtonTitle}
          onPress={primaryAction}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default ModalFixedFooter;
