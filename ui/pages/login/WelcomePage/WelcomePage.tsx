import { ButtonType } from '@/ui/components/basic/CustomButton/CustomButton.logic';
import { CustomButtonLarge } from '@/ui/components/basic/CustomButton/CustomButtonLarge';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import LottieAnimation from '@/ui/components/basic/LottieAnimation/LottieAnimation';
import CustomScrollView from '@/ui/components/composite/CustomScrollView/CustomScrollView';
import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { View } from 'react-native';
import { useWelcomePageLogic } from './WelcomePage.logic';
import { styles } from './WelcomePage.style';
const WelcomePage = () => {
  const { handlePress, animation } = useWelcomePageLogic();

  return (
    <BasicView nameView={Routes.Welcome}>
      <CustomScrollView>
        <View style={styles.container}>
          <LottieAnimation style={styles.animation} animationPath={animation} />
          <CustomText text="WELCOME.TITLE" style={styles.title} />
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
