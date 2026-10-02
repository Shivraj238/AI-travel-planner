import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  GetPlaceDetails,
  PHOTO_REF_URL
} from '@/service/GlobalApi';

import {
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
  FaExternalLinkAlt
} from "react-icons/fa";

import { Button } from '@/components/ui/button';

function PlaceCardItem({ place }) {

  const [photoUrl, setPhotoUrl] =
    useState('/placeholder.jpg');

  const [liked, setLiked] =
    useState(false);

  useEffect(() => {

    if (place) {
      GetPlacePhoto();
    }

  }, [place]);

  const GetPlacePhoto = async () => {

    try {

      const data = {
        textQuery: place?.place
      };

      const resp =
        await GetPlaceDetails(data);

      const photos =
        resp?.data?.places?.[0]?.photos;

      if (photos?.length > 0) {

        const photoName =
          photos[0]?.name;

        const url =
          PHOTO_REF_URL.replace(
            '{NAME}',
            photoName
          );

        setPhotoUrl(url);

      }

    } catch (error) {

      console.log(error);

      setPhotoUrl('/placeholder.jpg');

    }

  };

  return (

    <div className='bg-white rounded-2xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300'>

      {/* IMAGE */}
      <div className='relative'>

        <img
          src={photoUrl}
          alt={place?.place}
          className='h-[220px] w-full object-cover'
        />

        <button
          onClick={() => setLiked(!liked)}
          className='absolute top-3 right-3 bg-white p-2 rounded-full shadow'
        >

          <FaHeart
            className={
              liked
                ? "text-red-500"
                : "text-gray-400"
            }
          />

        </button>

      </div>

      {/* CONTENT */}
      <div className='p-5'>

        {/* TITLE */}
        <h2 className='text-xl font-bold text-gray-800 line-clamp-1'>

          {place?.place}

        </h2>

        {/* TIME */}
        <div className='flex items-center gap-2 text-orange-500 text-sm mt-2'>

          <FaClock />

          {place?.time || "Any Time"}

        </div>

        {/* DESCRIPTION */}
        <p className='text-gray-600 text-sm leading-6 mt-4 line-clamp-3'>

          {place?.details}

        </p>

        {/* TICKET */}
        <div className='mt-4 bg-gray-50 rounded-xl p-3'>

          <p className='text-xs text-gray-500'>
            Entry Fee
          </p>

          <p className='font-semibold text-gray-800 mt-1'>

            {place?.ticket_pricing || "Free Entry"}

          </p>

        </div>

        {/* BUTTONS */}
        <div className='grid grid-cols-2 gap-3 mt-5'>

          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${place?.place}`}
            target='_blank'
          >

            <Button className='w-full bg-orange-500 hover:bg-orange-600 rounded-xl'>

              <FaMapMarkerAlt className='mr-2' />

              Map

            </Button>

          </Link>

          <Link
            to={`https://www.google.com/search?q=${place?.place}`}
            target='_blank'
          >

            <Button
              variant="outline"
              className='w-full rounded-xl'
            >

              <FaExternalLinkAlt className='mr-2' />

              Explore

            </Button>

          </Link>

        </div>

      </div>

    </div>

  );
}

export default PlaceCardItem;