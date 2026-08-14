import type { ErrorBoundaryProps } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useRootAppCrashViewLogic } from '@/features/core/error/ui/components/RootAppCrashView/RootAppCrashView.logic';
import { styles } from '@/features/core/error/ui/components/RootAppCrashView/RootAppCrashView.style';

export const RootAppCrashView = (props: ErrorBoundaryProps) => {
  const { state, effects } = useRootAppCrashViewLogic(props);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{state.message}</Text>
      <Pressable style={styles.button} onPress={effects.retry}>
        <Text style={styles.buttonText}>{state.t('ERRORS.BUTTONS.TRY_AGAIN')}</Text>
      </Pressable>
    </View>
  );
};
