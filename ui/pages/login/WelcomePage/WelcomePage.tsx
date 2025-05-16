import { ButtonType } from '@/ui/components/basic/CustomButton/CustomButton.logic';
import { CustomButtonLarge } from '@/ui/components/basic/CustomButton/CustomButtonLarge';
import { LinearGradientText } from '@/ui/components/basic/LinearGradientText/LinearGradientText';
import LottieAnimation from '@/ui/components/basic/LottieAnimation/LottieAnimation';
import CustomScrollView from '@/ui/components/composite/CustomScrollView/CustomScrollView';
import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { components } from '@/ui/constants/style/dimensions/components';
import { View } from 'react-native';
import { useWelcomePageLogic } from './WelcomePage.logic';
import { styles } from './WelcomePage.style';

const WelcomePage = () => {
  const { handlePress, animation, welcomeTextBackground } = useWelcomePageLogic();

  return (
    <BasicView nameView={Routes.Welcome}>
      <CustomScrollView>
        <View style={styles.container}>
          <LottieAnimation style={styles.animation} animationPath={animation} />
          <LinearGradientText
            text="WELCOME.TITLE"
            imageSource={welcomeTextBackground}
            height={components.welcomePageBackgroundTextHeight}
          />
          <CustomButtonLarge
            title="WELCOME.BUTTON"
            onPress={handlePress}
            style={styles.button}
            buttonType={ButtonType.Main}
          />
        </View>
      </CustomScrollView>
    </BasicView>
  );
};

export default WelcomePage;
