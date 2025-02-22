const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
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
          text: '```json\n{\n  "trip_details": {\n    "destination": "Rome",\n    "duration": "2 days, 1 night",\n    "travelers": "2",\n    "budget": "moderate",\n    "flight_details": {\n      "origin": "Enter your origin airport",  // Replace with your origin.\n      "destination": "Rome (FCO - Rome–Fiumicino Airport)",\n      "departure_date": "2024-10-27", // Replace with your desired date\n      "return_date": "2024-10-29", // Replace with your desired date\n      "airline": "Choose Your Airline", // Replace with your desired airline.\n      "flight_price": "180 USD per person", // Replace with actual price and booking url.\n        "booking_url":"https://www.example.com/flights"  //replace with example\n    },\n    "hotel_options": [\n      {\n        "hotelName": "Hotel Artemide",\n        "hotelAddress": "Via del Boschetto, 13, 00192 Roma RM, Italy",\n        "price": "100 USD/night", //Replace with accurate price\n        "hotelImageUrl": "https://example.com/hotel-image1.jpg", // Replace with actual image url\n        "geoCoordinates": { "latitude": "41.9028", "longitude": "12.4964" },\n        "rating": "4.5",\n        "description": "Modern hotel in a central location, near public transportation."\n      },\n      {\n        "hotelName": "Hotel Raphael",\n        "hotelAddress": "Via dei Coronari 106, 00186 Roma, Italy",\n        "price": "120 USD/night",\n        "hotelImageUrl": "https://example.com/hotel-image2.jpg",\n        "geoCoordinates": { "latitude": "41.8950", "longitude": "12.4820" },\n        "rating": "4.2",\n        "description": "Historic hotel with a charming atmosphere, slightly further from major attractions but offers a charming stay."\n      }\n    ],\n    "places_to_visit": [\n      {\n        "placeName": "Colosseum",\n        "placeDetails": "Iconic amphitheatre, symbol of Roman Empire. Explore the history of gladiatorial contests.",\n        "placeImageUrl": "https://example.com/colosseum.jpg", // Replace with actual image\n        "geoCoordinates": {"latitude": "41.8902", "longitude": "12.4922"},\n        "ticketPricing": "18 EUR",\n        "timeToTravel": "10 minutes"\n      },\n      {\n        "placeName": "Roman Forum",\n        "placeDetails": "Ruins of the ancient Roman marketplace and political centre. Walk through history.",\n        "placeImageUrl": "https://example.com/romanForum.jpg",\n        "geoCoordinates": { "latitude": "41.8919", "longitude": "12.4904" },\n        "ticketPricing": "16 EUR",\n        "timeToTravel": "5 minutes from Colosseum"\n      },\n        {\n        "placeName": "Vatican City",\n        "placeDetails": "Home to St. Peter\'s Basilica and the Vatican Museums, a treasure trove of art and history.",\n        "placeImageUrl": "https://example.com/vatican.jpg",\n        "geoCoordinates": { "latitude": "41.9048", "longitude": "12.4534" },\n        "ticketPricing": "16 EUR",\n        "timeToTravel": "20 minutes"\n      },\n           {\n        "placeName": "Pantheon",\n        "placeDetails": "Ancient Roman temple, now a church. Marvel at the architectural genius.",\n        "placeImageUrl": "https://example.com/pantheon.jpg",\n        "geoCoordinates": { "latitude": "41.8928", "longitude": "12.4952" },\n        "ticketPricing": "Free entry",\n        "timeToTravel": "10 minutes from Colosseum"\n      }\n    ],\n    "day_plans": [\n      {\n        "day": 1,\n        "bestTimeToVisit": "Morning", // Replace with specific time if known.\n        "plan": "Visit the Colosseum and Roman Forum in the morning.  Have lunch near the area. Afternoon visit the Pantheon and explore the surrounding area.  Dinner in Trastevere."\n      },\n      {\n        "day": 2,\n        "bestTimeToVisit": "Morning",\n        "plan": "Explore Vatican City, St. Peter\'s Basilica and the Vatican Museums. Have lunch near Vatican City. Enjoy the shopping or a relaxing afternoon near the Trevi Fountain. Dinner at a restaurant of your choice"\n      }\n    ]\n  }\n}\n```\n\n**Important Considerations and Further Steps:**\n\n* **Replace Placeholders:**  Crucially, replace the placeholders like `Enter your origin airport`, `Choose Your Airline`, `your desired date`, `example.com`, prices, image URLs, and hotel information with accurate data.\n* **Booking:** Use reputable travel booking sites (like Booking.com, Expedia, Kayak) for flights and hotels.  This will give you accurate prices, reviews, and potential deals.\n* **Transportation:**  Rome has a good public transportation system (metro, buses).  Consider purchasing a travel pass if you plan to use it extensively.  Taxis and ride-sharing services are also available.  Include travel time considerations in your plans.\n* **Food:** Rome has fantastic food!  Consider including specific restaurants you\'d like to try in your day plans.\n* **Flexibility:**  This is a template. Be prepared to adjust your plans based on your interests and how you feel during your trip.\n* **Currency:**  Rome uses the Euro (€).  Factor this into your budget planning.\n* **Entry Requirements:**  Ensure you have any necessary visas or travel documents for your nationality.\n* **Bookings:** This is just a suggestion, you need to book your flights and hotel in advance, especially if you\'re traveling during peak season.\n\n\nThis JSON structure is more detailed and organized, providing a comprehensive travel plan. Remember to adapt and personalize it to your preferences and needs.',
        },
      ],
    },
  ],
});
