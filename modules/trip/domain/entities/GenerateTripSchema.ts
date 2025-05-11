import { type ZodSchema, z } from 'zod';
import type { TripAiResp } from '../dto/UserTripsDTO';

export const generatedTripSchema = z.object({
  tripDetails: z.object({
    location: z.string(),
    durationDays: z.number(),
    durationNights: z.number(),
    travelers: z.number(),
    budget: z.string(),
  }),
  flightDetails: z.object({
    arrival: z.object({
      airline: z.string(),
      flightNumber: z.string(),
      departureAirport: z.string(),
      arrivalAirport: z.string(),
      arrivalTime: z.string(),
      flightPrice: z.number(),
      bookingUrl: z.string(),
    }),
    departure: z.object({
      airline: z.string(),
      flightNumber: z.string(),
      departureAirport: z.string(),
      arrivalAirport: z.string(),
      departureTime: z.string(),
      flightPrice: z.number(),
      bookingUrl: z.string(),
    }),
    notes: z.string(),
  }),
  hotelOptions: z.array(
    z.object({
      hotelName: z.string(),
      hotelAddress: z.string(),
      price: z.number(),
      hotelImageUrl: z.string(),
      geoCoordinates: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
      rating: z.number(),
      description: z.string(),
      nearbyPlaces: z.array(z.string()),
    }),
  ),
  dayPlans: z.array(
    z.object({
      day: z.number(),
      theme: z.string(),
      schedule: z.array(
        z.object({
          time: z.string(),
          activity: z.string(),
          placeName: z.string(),
          placeDetails: z.string(),
          placeImageUrl: z.string(),
          geoCoordinates: z.object({
            latitude: z.number(),
            longitude: z.number(),
          }),
          ticketPricing: z.string().describe('Price of the ticket, can be a number or text like "Free" or "Varies"'),
          travelTimeFromHotel: z.string(),
          bestTimeToVisit: z.string(),
        }),
      ),
    }),
  ),
  budgetNotes: z.string(),
  transportationNotes: z.string(),
  importantNotes: z.string(),
}) satisfies ZodSchema<TripAiResp>;
