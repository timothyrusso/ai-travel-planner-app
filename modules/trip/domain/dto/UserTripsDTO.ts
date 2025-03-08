interface GeoCoordinates {
  latitude: string;
  longitude: string;
}

interface PlaceToVisit {
  timeToTravel: string;
  ticketPricing: string;
  geoCoordinates: GeoCoordinates;
  placeName: string;
  placeDetails: string;
  placeImageUrl: string;
}

interface HotelOption {
  hotelAddress: string;
  rating: string;
  geoCoordinates: GeoCoordinates;
  description: string;
  hotelName: string;
  price: string;
  hotelImageUrl: string;
}

interface FlightDetails {
  destination: string;
  airline: string;
  departure_date: string;
  booking_url: string;
  origin: string;
  flight_price: string;
  return_date: string;
}

interface DayPlan {
  bestTimeToVisit: string;
  plan: string;
  day: number;
}

export interface TripDetails {
  places_to_visit: PlaceToVisit[];
  hotel_options: HotelOption[];
  flight_details: FlightDetails;
  duration: string;
  destination: string;
  travelers: string;
  day_plans: DayPlan[];
  budget: string;
  image?: string;
}

interface TripAiResp {
  trip_details: TripDetails;
}

export interface UserTripData {
  startDate: string;
  endDate: string;
  location: string;
  days: string;
  nights: string;
  imageRef: string;
}

export interface UserTrips {
  userTripData: string;
  userEmail: string;
  docId: string;
  tripAiResp: TripAiResp;
}
