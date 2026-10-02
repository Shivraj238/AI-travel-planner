import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {

  const [photoUrl, setPhotoUrl] =
    useState('/placeholder.jpg')

  useEffect(() => {

    if (hotel) {
      GetPlacePhoto()
    }

  }, [hotel])

  const GetPlacePhoto = async () => {

    try {

      const data = {
        textQuery: hotel?.name
      }

      const resp =
        await GetPlaceDetails(data)

      const photos =
        resp?.data?.places?.[0]?.photos

      if (photos?.length > 0) {

        const photoName =
          photos[0]?.name

        const url =
          PHOTO_REF_URL.replace(
            '{NAME}',
            photoName
          )

        setPhotoUrl(url)

      }

    } catch (error) {

      console.log(error)

      setPhotoUrl('/placeholder.jpg')

    }

  }

  return (

    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name},${hotel?.address}`}
      target="_blank"
    >

      <div className="bg-white rounded-2xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300">

        {/* IMAGE */}
        <div className="relative">

          <img
            src={photoUrl}
            alt={hotel?.name}
            className="h-[220px] w-full object-cover"
          />

          {/* RATING */}
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow text-sm font-medium">

            ⭐ {hotel?.rating || "4.0"}

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-5">

          {/* NAME */}
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">

            {hotel?.name}

          </h2>

          {/* ADDRESS */}
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">

            📍 {hotel?.address}

          </p>

          {/* PRICE */}
          <div className="mt-4 bg-gray-50 rounded-xl p-3">

            <p className="text-xs text-gray-500">

              Price Per Night

            </p>

            <p className="font-semibold text-green-600 mt-1">

              {hotel?.price}

            </p>

          </div>

          {/* BUTTON */}
          <button className="w-full mt-4 border rounded-xl py-3 font-medium hover:bg-gray-100 transition">

            View Hotel

          </button>

        </div>

      </div>

    </Link>
  )
}

export default HotelCardItem