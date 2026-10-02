import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWallet
} from "react-icons/fa";

function UserTripCardItem({ trip }) {

  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

  useEffect(() => {

    if (trip) {
      GetPlacePhoto();
    }

  }, [trip])

  const GetPlacePhoto = async () => {

    try {

      const data = {
        textQuery: trip?.userSelection?.location?.label
      }

      const resp = await GetPlaceDetails(data);

      const photos = resp?.data?.places?.[0]?.photos;

      if (photos?.length > 0) {

        const photoName = photos[0]?.name;

        const PhotoUrl =
          PHOTO_REF_URL.replace('{NAME}', photoName);

        setPhotoUrl(PhotoUrl);
      }

    } catch (error) {

      console.log("Image Error:", error);

      setPhotoUrl('/placeholder.jpg');
    }
  }

  return (

    <Link to={`/view-trip/${trip?.id}`}>

      <div
        className='
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-300
        hover:-translate-y-2
        cursor-pointer
        '
      >

        {/* IMAGE */}
        <div className='relative'>

          <img
            src={photoUrl}
            alt="trip"
            className='h-[240px] w-full object-cover'
          />

          {/* OVERLAY */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent'></div>

          {/* LOCATION */}
          <div className='absolute bottom-4 left-4 text-white'>

            <div className='flex items-center gap-2'>

              <FaMapMarkerAlt className='text-orange-400' />

              <h2 className='font-bold text-xl line-clamp-1'>
                {trip?.userSelection?.location?.label}
              </h2>

            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className='p-5'>

          <div className='flex items-center justify-between gap-4'>

            {/* DAYS */}
            <div className='flex items-center gap-2 text-gray-600'>

              <FaCalendarAlt className='text-orange-500' />

              <span className='font-medium'>
                {trip?.userSelection?.noOfDays} Days
              </span>

            </div>

            {/* BUDGET */}
            <div className='flex items-center gap-2 text-gray-600'>

              <FaWallet className='text-green-500' />

              <span className='font-medium'>
                {trip?.userSelection?.budget}
              </span>

            </div>

          </div>

          {/* BUTTON */}
          <button
            className='
            mt-5
            w-full
            bg-orange-500
            hover:bg-orange-600
            text-white
            py-3
            rounded-2xl
            font-semibold
            transition-all
            duration-300
            '
          >

            View Trip

          </button>

        </div>

      </div>

    </Link>
  )
}

export default UserTripCardItem