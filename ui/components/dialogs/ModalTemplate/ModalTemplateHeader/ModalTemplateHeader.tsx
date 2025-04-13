import type { StyleProp, TextStyle } from 'react-native';
import { View } from 'react-native';

import CustomIconButton from '@/ui/components/basic/CustomIconButton/CustomIconButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import { styles } from './ModalTemplateHeader.style';

const ModalHeader = ({
  title = '',
  titleStyle = undefined,
  action,
  preventClosing = false,
}: {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  action: () => void;
  preventClosing?: boolean;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        {!preventClosing && (
          <CustomIconButton
            icon={icons.close}
            iconSize={spacing.Fourfold}
            style={styles.cancelIcon}
            onPress={() => {
              if (action) action();
            }}
          />
        )}
      </View>
      {title && <CustomText style={titleStyle ? titleStyle : styles.title} text={title} />}
    </View>
  );
};

export default ModalHeader;
