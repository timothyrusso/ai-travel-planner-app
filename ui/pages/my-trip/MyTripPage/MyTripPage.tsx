import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { useMyTripPageLogic } from './MyTripPage.logic';
import { UserTripList } from './components/UserTripList/UserTripList';

const MyTripPage = () => {
  const { userTrips, isLoading } = useMyTripPageLogic();

  return (
    <BasicView nameView={Routes.MyTrip}>
      <UserTripList userTrips={userTrips ?? []} isLoading={isLoading} />
    </BasicView>
  );
};

export default MyTripPage;
