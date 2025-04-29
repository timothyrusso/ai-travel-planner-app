import type { TripAiResp, UserTripData } from '../dto/UserTripsDTO';

export interface TripItem {
  id: string;
  isFavorite: boolean;
  image: string;
  userTripData: UserTripData;
  tripAiResp: TripAiResp;
}
