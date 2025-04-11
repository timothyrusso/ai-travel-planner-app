import { Routes } from '@/ui/constants/routes';
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href={Routes.myTrip} />;
}
