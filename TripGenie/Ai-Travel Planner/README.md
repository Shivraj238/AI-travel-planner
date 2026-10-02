# AI Travel Planner ✈️

AI Travel Planner is a web application that helps users create personalized travel plans based on their destination, trip duration, budget, and travel preferences.

## Features

- 🔐 User authentication with Firebase
- 🤖 AI-powered travel itinerary generation
- 📍 Google Places API for destination search
- 🗺️ Google Maps integration
- 🌤️ Weather information
- 🏨 Hotel recommendations
- 📌 Places to visit recommendations
- 💾 Save and manage trips
- 💬 AI travel assistant
- 📱 Responsive user interface

## Technologies Used

- React.js
- Vite
- JavaScript
- Firebase Authentication
- Firebase Firestore
- Google Places API
- Google Maps API
- Gemini AI API
- Weather API
- Tailwind CSS

## Project Structure

```text
AI-Travel-Planner/
├── public/
├── src/
│   ├── components/
│   ├── constants/
│   ├── create-trip/
│   ├── my-trips/
│   ├── service/
│   ├── view-trip/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/krushnavz03/TripGenei-Ai-Travel-Planner.git
```

### 2. Go to the project folder

```bash
cd TripGenei-Ai-Travel-Planner
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root.

Add your API keys and Firebase configuration:

```env
VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_WEATHER_API_KEY=your_weather_api_key

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

> **Note:** Never upload `.env.local` or API keys to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Purpose

The purpose of this project is to develop an AI-powered travel planning platform that makes trip planning easier by generating personalized itineraries and providing useful travel information such as hotels, places to visit, maps, and weather.

## Author

Krushna Zate

GitHub: [@krushnavz03](https://github.com/krushnavz03)