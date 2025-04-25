import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
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
          <View style={styles.buttonContainer}>
            <CustomText text="WELCOME.TITLE" style={styles.title} />
            <CustomButton title="WELCOME.BUTTON" onPress={handlePress} style={styles.button} />
          </View>
        </View>
      </CustomScrollView>
    </BasicView>
  );
};

export default WelcomePage;
