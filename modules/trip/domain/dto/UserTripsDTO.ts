interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface ScheduleItem {
  time: string;
  bestTimeToVisit: string;
  ticketPricing: string | number;
  placeDetails: string;
  geoCoordinates: GeoCoordinates;
  placeName: string;
  placeImageUrl: string;
  activity: string;
  travelTimeFromHotel?: string;
}

export interface DayPlan {
  schedule: ScheduleItem[];
  day: number;
  theme: string;
}

interface FlightInfo {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  flightPrice: number;
  bookingUrl: string;
  departureTime?: string;
  arrivalTime?: string;
}

interface FlightDetails {
  notes: string;
  arrival: FlightInfo;
  departure: FlightInfo;
}

interface HotelOption {
  hotelName: string;
  description: string;
  rating: number;
  geoCoordinates: GeoCoordinates;
  nearbyPlaces: string[];
  hotelAddress: string;
  hotelImageUrl: string;
  price: number;
}

export interface TripDetails {
  location: string;
  budget: string;
  travelers: number;
  durationDays: number;
  durationNights: number;
}

export interface TripAiResp {
  budgetNotes: string;
  dayPlans: DayPlan[];
  flightDetails: FlightDetails;
  importantNotes: string;
  hotelOptions: HotelOption[];
  transportationNotes: string;
  tripDetails: TripDetails;
}

export interface UserTrips {
  docId: string;
  tripAiResp: TripAiResp;
  userEmail: string;
  userTripData: string;
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
