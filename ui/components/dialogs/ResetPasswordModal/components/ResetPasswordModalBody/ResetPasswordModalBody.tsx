import CustomTextInput from '@/ui/components/basic/CustomTextInput/CustomTextInput';
import type { FC } from 'react';
import { View } from 'react-native';
import { styles } from './ResetPasswordModalBody.style';

type ResetPasswordModalBodyProps = {
  email: string;
  setEmail: (email: string) => void;
};

export const ResetPasswordModalBody: FC<ResetPasswordModalBodyProps> = ({ email, setEmail }) => {
  return (
    <View style={styles.container}>
      <CustomTextInput placeholder="Email" value={email} onChangeText={setEmail} />
    </View>
  );
};
