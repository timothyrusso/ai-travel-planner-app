import { auth, db } from '@/configs/firebaseConfig';
import { routes } from '@/constants/routes';
import { colors } from '@/constants/style/colors';
import { icons } from '@/constants/style/icons';
import type { UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import LottieAnimation from '@/ui/components/basic/LottieAnimation/LottieAnimation';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import MyTripContainer from '@/ui/pages/MyTripPage/components/MyTripContainer/MyTripContainer';
import StartNewTripCard from '@/ui/pages/MyTripPage/components/MyTripContainer/StartNewTripCard/StartNewTripCard';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { style } from './MyTripPage.style';
import { UserTripList } from './components/UserTripList/UserTripList';

const MyTripPage = () => {
  const [userTrips, setUserTrips] = useState<UserTrips[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const animation = require('../../assets/lottie/trip_animation.json');
  const user = auth.currentUser;

  const router = useRouter();

  useEffect(() => {
    getMyTrips();
  }, [user]);

  const getMyTrips = async () => {
    if (!user) return;

    setIsLoading(true);

    setUserTrips([]);

    const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      setUserTrips(prev => [...prev, doc.data()]);
    });

    setIsLoading(false);
  };

  return (
    <>
      <BasicView>
        <CustomHeader title="MYTRIP.TITLE" icon={icons.addCircle} onPress={() => router.push(routes.searchPlace)} />

        <MyTripContainer>
          {isLoading && <ActivityIndicator size="large" color={colors.primary} />}
          {userTrips.length === 0 && !isLoading ? <StartNewTripCard /> : <UserTripList userTrips={userTrips} />}
        </MyTripContainer>
      </BasicView>
      {userTrips.length === 0 && <LottieAnimation animationPath={animation} style={style.animation} />}
    </>
  );
};

export default MyTripPage;
