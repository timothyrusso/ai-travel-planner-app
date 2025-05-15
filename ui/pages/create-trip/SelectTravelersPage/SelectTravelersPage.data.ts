import type { TravelerInfo } from '@/modules/trip/domain/entities/TravelerInfo';
import { icons } from '@/ui/constants/style/icons';

export const TravelerData: TravelerInfo[] = [
  {
    id: 0,
    title: 'SELECT_TRAVELERS.JUST_ME',
    icon: icons.airplane,
    people: '1',
  },
  {
    id: 1,
    title: 'SELECT_TRAVELERS.COUPLE',
    icon: icons.heartOutline,
    people: '2',
  },
  {
    id: 2,
    title: 'SELECT_TRAVELERS.FAMILY',
    icon: icons.home,
    people: '3 to 5 people',
  },
  {
    id: 3,
    title: 'SELECT_TRAVELERS.FRIENDS',
    icon: icons.boat,
    people: '5 to 10 people',
  },
];
