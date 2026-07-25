import type { ErrorBoundaryProps } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useGenericCrashViewLogic } from '@/features/core/error/ui/components/GenericCrashView/GenericCrashView.logic';
import { styles } from '@/features/core/error/ui/components/GenericCrashView/GenericCrashView.style';
import type { NavigationHref } from '@/features/core/navigation';

type GenericCrashViewProps = ErrorBoundaryProps & {
  redirectTo: NavigationHref;
};

export const GenericCrashView = (props: GenericCrashViewProps) => {
  const { state, effects } = useGenericCrashViewLogic(props);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{state.message}</Text>
      <Pressable style={styles.button} onPress={effects.handleRetry}>
        <Text style={styles.buttonText}>{state.t('ERRORS.BUTTONS.TRY_AGAIN')}</Text>
      </Pressable>
    </View>
  );
};
