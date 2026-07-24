import { AuthView } from '@clerk/expo/native';
import { useSignInOrUpPageLogic } from '@/features/auth/ui/pages/SignInOrUpPage/SignInOrUpPage.logic';

export const SignInOrUpPage = () => {
  useSignInOrUpPageLogic();

  return <AuthView mode="signInOrUp" />;
};
