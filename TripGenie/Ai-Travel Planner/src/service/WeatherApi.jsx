import axios from "axios";

const WEATHER_API_KEY =
  import.meta.env.VITE_WEATHER_API_KEY;

export const GetWeatherData = async (city) => {

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
  );

  return response.data;
};