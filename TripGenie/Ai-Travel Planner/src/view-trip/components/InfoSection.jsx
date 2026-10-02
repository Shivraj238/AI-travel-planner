import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

import {
  FaCalendarAlt,
  FaWallet,
  FaUsers,
  FaLocationArrow
} from "react-icons/fa";

import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';

function InfoSection({ trip }) {

  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {

      const data = {
        textQuery: trip?.userSelection?.location?.label
      };

      const resp = await GetPlaceDetails(data);

      const photoName =
        resp?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoName) {

        const url =
          PHOTO_REF_URL.replace('{NAME}', photoName);

        setPhotoUrl(url);

      }

    } catch (error) {

      console.log(error);

    }
  };

  const ShareTrip = async () => {

    try {

      await navigator.share({
        title: "TripGenie AI",
        text: "Check out my AI generated trip!",
        url: window.location.href
      });

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="mb-14">

      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg">

        <img
          src={photoUrl}
          alt="trip"
          className="h-[300px] md:h-[450px] w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">

          <h2 className="text-3xl md:text-5xl font-bold text-white">

            {trip?.userSelection?.location?.label}

          </h2>

          <p className="text-white/90 mt-3 text-sm md:text-lg max-w-2xl">

            AI generated travel itinerary with hotels,
            attractions and weather insights.

          </p>

          <div className="flex flex-wrap gap-4 mt-6">

            <Button
              onClick={ShareTrip}
              className="bg-orange-500 hover:bg-orange-600 rounded-xl"
            >
              <IoIosSend className="mr-2" />
              Share Trip
            </Button>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${trip?.userSelection?.location?.label}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="rounded-xl bg-white text-black hover:bg-gray-100"
              >
                <FaLocationArrow className="mr-2" />
                View Map
              </Button>
            </a>

          </div>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        {/* DAYS */}
        <div className="bg-white rounded-2xl shadow-md p-5 border">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Trip Duration
              </p>

              <h2 className="text-2xl font-bold mt-2">
                {trip?.userSelection?.noOfDays} Days
              </h2>

            </div>

            <FaCalendarAlt className="text-orange-500 text-2xl" />

          </div>

        </div>

        {/* BUDGET */}
        <div className="bg-white rounded-2xl shadow-md p-5 border">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Budget
              </p>

              <h2 className="text-2xl font-bold mt-2 text-green-600">
                {trip?.userSelection?.budget}
              </h2>

            </div>

            <FaWallet className="text-green-500 text-2xl" />

          </div>

        </div>

        {/* TRAVELERS */}
        <div className="bg-white rounded-2xl shadow-md p-5 border">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Travelers
              </p>

              <h2 className="text-2xl font-bold mt-2 text-blue-600">
                {trip?.userSelection?.traveler}
              </h2>

            </div>

            <FaUsers className="text-blue-500 text-2xl" />

          </div>

        </div>

      </div>

    </div>

  );
}

export default InfoSection;