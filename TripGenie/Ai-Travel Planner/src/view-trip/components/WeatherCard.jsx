import React, { useEffect, useState } from 'react';
import { GetWeatherData } from '@/service/WeatherApi';

import {
  FaTemperatureHigh,
  FaTint,
  FaCloudSun
} from "react-icons/fa";

function WeatherCard({ location }) {

  const [weather, setWeather] = useState(null);

  useEffect(() => {

    if (location) {
      GetWeather();
    }

  }, [location]);

  const GetWeather = async () => {

    try {

      const data = await GetWeatherData(location);

      if (data) {
        setWeather(data);
      }

    } catch (error) {

      console.log(error);

    }

  };

  const currentWeather =
    weather?.list?.[0];

  return (

    <div className='bg-white rounded-2xl border shadow-sm p-6'>

      {/* Header */}
      <div className='flex items-center gap-3 mb-6'>

        <div className='bg-blue-100 p-3 rounded-xl'>

          <FaCloudSun className='text-blue-500 text-2xl' />

        </div>

        <div>

          <h2 className='text-xl font-bold text-gray-800'>

            Weather

          </h2>

          <p className='text-sm text-gray-500'>

            {location}

          </p>

        </div>

      </div>

      {/* Main Temperature */}
      <div className='mb-6'>

        <h2 className='text-5xl font-bold text-gray-800'>

          {currentWeather?.main?.temp
            ? `${Math.floor(currentWeather.main.temp)}°C`
            : '--'}

        </h2>

        <p className='text-gray-500 mt-2 capitalize'>

          {currentWeather?.weather?.[0]?.description ||
            'Loading...'}

        </p>

      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 gap-4'>

        <div className='bg-gray-50 rounded-xl p-4'>

          <div className='flex items-center gap-2 text-orange-500 mb-2'>

            <FaTemperatureHigh />

            <span className='text-sm'>
              Temperature
            </span>

          </div>

          <p className='font-bold text-lg text-gray-800'>

            {currentWeather?.main?.temp
              ? `${Math.floor(currentWeather.main.temp)}°C`
              : '--'}

          </p>

        </div>

        <div className='bg-gray-50 rounded-xl p-4'>

          <div className='flex items-center gap-2 text-cyan-500 mb-2'>

            <FaTint />

            <span className='text-sm'>
              Humidity
            </span>

          </div>

          <p className='font-bold text-lg text-gray-800'>

            {currentWeather?.main?.humidity
              ? `${currentWeather.main.humidity}%`
              : '--'}

          </p>

        </div>

      </div>

    </div>

  );
}

export default WeatherCard;