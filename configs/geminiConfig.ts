import Constants from 'expo-constants';
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = Constants.expoConfig?.extra?.googleGeminiApiKey;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: 'user',
      parts: [
        {
          text: 'Generate Travel Plan for Location: {Rome}, for {2} Days and {1} Nights for {2} with a {moderate} budget with a Flight details, Flight Price with booking url, Hotels options list with HotelName, Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {2} days and {1} nights with each day plan with best time to visit in JSON format.',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: '{"tripDetails":{"location":"Rome","durationDays":2,"durationNights":1,"travelers":2,"budget":"Moderate"},"flightDetails":{"arrival":{"airline":"Ryanair","flightNumber":"FR448","departureAirport":"Your Departure Airport","arrivalAirport":"CIA (Rome Ciampino)","arrivalTime":"10:00","flightPrice":80,"bookingUrl":"https://www.ryanair.com"},"departure":{"airline":"Ryanair","flightNumber":"FR449","departureAirport":"CIA (Rome Ciampino)","arrivalAirport":"Your Arrival Airport","departureTime":"22:00","flightPrice":80,"bookingUrl":"https://www.ryanair.com"},"notes":"Flight prices are estimates and vary greatly.  Book in advance for the best deals.  Consider alternative airports like FCO (Fiumicino) if prices are better."},"hotelOptions":[{"hotelName":"Hotel Giardino","hotelAddress":"Via XX Settembre, 128/B, Central Station, 00187 Rome, Italy","price":90,"hotelImageUrl":"https://example.com/hotel_giardino.jpg","geoCoordinates":{"latitude":41.9028,"longitude":12.4964},"rating":4.0,"description":"A well-located hotel near Termini Station, offering comfortable rooms and easy access to public transportation.","nearbyPlaces":["Piazza della Repubblica","Basilica di Santa Maria Maggiore","National Roman Museum"]},{"hotelName":"Hotel Rimini","hotelAddress":"Via Marghera, 17, Central Station, 00185 Rome, Italy","price":80,"hotelImageUrl":"https://example.com/hotel_rimini.jpg","geoCoordinates":{"latitude":41.9016,"longitude":12.5025},"rating":3.5,"description":"A budget-friendly option close to Termini Station, offering simple rooms and a convenient location.","nearbyPlaces":["Termini Station","Basilica di Santa Maria Maggiore","Piazza dei Cinquecento"]}],"dayPlans":[{"day":1,"theme":"Ancient Rome & Trastevere Charm","schedule":[{"time":"11:00","activity":"Colosseum & Roman Forum","placeName":"Colosseum","placeDetails":"Iconic amphitheater of ancient Rome. Explore the arena and upper levels for stunning views.  Pre-book tickets to avoid long queues.","placeImageUrl":"https://example.com/colosseum.jpg","geoCoordinates":{"latitude":41.8902,"longitude":12.4922},"ticketPricing":18,"travelTimeFromHotel":"30 minutes (by metro)","bestTimeToVisit":"Morning (before crowds)"},{"time":"14:00","activity":"Roman Forum & Palatine Hill","placeName":"Roman Forum","placeDetails":"Explore the ruins of the ancient Roman government buildings and temples. Palatine Hill offers panoramic views of the Forum.","placeImageUrl":"https://example.com/roman_forum.jpg","geoCoordinates":{"latitude":41.8925,"longitude":12.4853},"ticketPricing":"Included with Colosseum ticket","travelTimeFromColosseum":"5 minutes (walking)","bestTimeToVisit":"Afternoon"},{"time":"17:00","activity":"Trastevere Exploration & Dinner","placeName":"Trastevere","placeDetails":"Wander through the charming cobblestone streets of Trastevere, browse artisan shops, and enjoy a traditional Roman dinner at a trattoria.","placeImageUrl":"https://example.com/trastevere.jpg","geoCoordinates":{"latitude":41.8870,"longitude":12.4700},"ticketPricing":"Free (dinner cost varies)","travelTimeFromRomanForum":"30 minutes (by bus)","bestTimeToVisit":"Evening"},{"time":"21:00","activity":"Enjoy Italian Dinner","placeName":"Trastevere","placeDetails":"Enjoy the best italian Dishes","placeImageUrl":"https://example.com/trastevere.jpg","geoCoordinates":{"latitude":41.8870,"longitude":12.4700},"ticketPricing":"Varies","travelTimeFromRomanForum":"30 minutes (by bus)","bestTimeToVisit":"Evening"}]},{"day":2,"theme":"Vatican City & Pantheon Wonder","schedule":[{"time":"09:00","activity":"Vatican City: St. Peter\'s Basilica & Vatican Museums","placeName":"Vatican City","placeDetails":"Visit St. Peter\'s Basilica, a magnificent Renaissance church, and explore the Vatican Museums, home to the Sistine Chapel and a vast collection of art.","placeImageUrl":"https://example.com/vatican_city.jpg","geoCoordinates":{"latitude":41.9029,"longitude":12.4534},"ticketPricing":35,"travelTimeFromHotel":"45 minutes (by metro)","bestTimeToVisit":"Early morning (to avoid crowds)"},{"time":"13:00","activity":"Lunch near Vatican City","placeName":"Borgo","placeDetails":"Find a local trattoria in the Borgo neighborhood near Vatican City for a delicious lunch.","placeImageUrl":"https://example.com/borgo_restaurant.jpg","geoCoordinates":{"latitude":41.9050,"longitude":12.4550},"ticketPricing":"Varies","travelTimeFromVatican":"5 minutes (walking)","bestTimeToVisit":"Lunchtime"},{"time":"15:00","activity":"Pantheon & Piazza Navona","placeName":"Pantheon","placeDetails":"Marvel at the architectural genius of the Pantheon, an ancient Roman temple with a stunning dome.  Then, stroll through Piazza Navona, a beautiful baroque square.","placeImageUrl":"https://example.com/pantheon.jpg","geoCoordinates":{"latitude":41.8986,"longitude":12.4769},"ticketPricing":"Free (Pantheon entry)","travelTimeFromVatican":"30 minutes (by bus)","bestTimeToVisit":"Afternoon"},{"time":"17:00","activity":"Trevi Fountain","placeName":"Trevi Fountain","placeDetails":"The Trevi Fountain is the largest Baroque fountain in the city and one of the most famous fountains in the world. ","placeImageUrl":"https://example.com/pantheon.jpg","geoCoordinates":{"latitude":41.9009,"longitude":12.4833},"ticketPricing":"Free (Pantheon entry)","travelTimeFromVatican":"30 minutes (by bus)","bestTimeToVisit":"Afternoon"}]}],"budgetNotes":"This is a moderate budget plan.  To save money, consider: using public transport, eating at local pizzerias or markets, packing snacks, and looking for free activities.  Entrance fees and dining costs are estimates and can be adjusted.","transportationNotes":"Rome has an efficient public transport system (metro, buses, trams).  Consider purchasing a Roma Pass for unlimited travel and discounts on attractions.  Walking is also a great way to explore the city.","importantNotes":"Book flights and accommodation in advance, especially during peak season. Wear comfortable shoes, as you\'ll be doing a lot of walking.  Be aware of pickpockets, especially in crowded areas.  Learn a few basic Italian phrases."}',
        },
      ],
    },
  ],
});
