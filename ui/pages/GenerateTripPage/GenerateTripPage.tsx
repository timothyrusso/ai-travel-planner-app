import CustomText from '@/ui/components/basic/CustomText/CustomText';
import LottieAnimation from '@/ui/components/basic/LottieAnimation/LottieAnimation';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import { useGenerateTripPageLogic } from './GenerateTripPage.logic';
import { style } from './GenerateTripPage.style';

const GenerateTripPage = () => {
  const animation = require('../../assets/lottie/loading_animation.json');
  const { generateAiTrip } = useGenerateTripPageLogic();

  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log(generateAiTrip);

  return (
    <BasicView>
      <CustomText text="GENERATE_TRIP.TITLE" style={style.title} />
      <CustomText text="GENERATE_TRIP.DESCRIPTION" style={style.subtitle} />
      <LottieAnimation animationPath={animation} style={style.animation} />
    </BasicView>
  );
};

export default GenerateTripPage;
