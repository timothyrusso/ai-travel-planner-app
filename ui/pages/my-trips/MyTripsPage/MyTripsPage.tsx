import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { useMyTripsPageLogic } from './MyTripsPage.logic';
import { UserTripList } from './components/UserTripList/UserTripList';

const MyTripsPage = () => {
  const { userTrips, isLoading } = useMyTripsPageLogic();

  return (
    <BasicView nameView={Routes.MyTrips}>
      <UserTripList userTrips={userTrips ?? []} isLoading={isLoading} />
    </BasicView>
  );
};

export default MyTripsPage;
