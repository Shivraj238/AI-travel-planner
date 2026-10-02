import React, { useMemo, useState } from 'react'
import HotelCardItem from './HotelCardItem'

import {
  FaHotel,
  FaStar
} from "react-icons/fa";

function Hotels({ trip }) {

  const hotels =
    trip?.tripData?.hotel_options || [];

  const [searchTerm, setSearchTerm] =
    useState('');

  // 🔥 SAFE HOTEL DATA
  const updatedHotels = useMemo(() => {

    return hotels.map((hotel) => ({

      ...hotel,

      hotelName:
        hotel?.hotelName ||
        hotel?.name ||
        "Luxury Hotel",

      price:

        hotel?.price ||

        parseInt(

          hotel?.priceLabel
            ?.replace(/[^0-9]/g, "")
            ?.slice(0, 4)

        ) ||

        1000

    }))

  }, [hotels])

  // 🔥 FILTER HOTELS
  const filteredHotels = useMemo(() => {

    return updatedHotels.filter((hotel) =>

      hotel?.hotelName
        ?.toLowerCase()
        ?.includes(searchTerm.toLowerCase())

    )

  }, [searchTerm, updatedHotels])

  return (

    <div className='mt-24'>

      {/* 🔥 SECTION HEADER */}
      <div className='text-center mb-16'>

        <div className='inline-flex items-center gap-3 bg-orange-100 text-orange-600 px-6 py-3 rounded-full shadow-sm mb-6'>

          <FaHotel className='text-2xl' />

          <span className='font-bold tracking-wide'>
            PREMIUM STAYS
          </span>

        </div>

        <h2 className='text-5xl font-black text-gray-800 leading-tight'>

          Recommended Hotels

        </h2>

        <p className='text-gray-500 text-lg mt-5 max-w-2xl mx-auto leading-8'>

          Discover luxury stays, premium comfort,
          and highly rated accommodations specially
          selected for your journey.

        </p>

      </div>

      {/* 🔥 STATS */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>

        {/* TOTAL HOTELS */}
        <div className='bg-white rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border hover:-translate-y-2 transition-all duration-500'>

          <div className='flex items-center justify-between'>

            <div>

              <p className='text-gray-500 uppercase tracking-[3px] text-sm'>

                Total Hotels

              </p>

              <h2 className='text-5xl font-black text-gray-800 mt-4'>

                {updatedHotels.length}

              </h2>

            </div>

            <div className='bg-orange-100 text-orange-500 h-20 w-20 rounded-3xl flex items-center justify-center shadow-inner'>

              <FaHotel className='text-4xl' />

            </div>

          </div>

        </div>

        {/* BEST RATING */}
        <div className='bg-white rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border hover:-translate-y-2 transition-all duration-500'>

          <div className='flex items-center justify-between'>

            <div>

              <p className='text-gray-500 uppercase tracking-[3px] text-sm'>

                Best Rating

              </p>

              <h2 className='text-5xl font-black text-gray-800 mt-4'>

                4.8+

              </h2>

            </div>

            <div className='bg-yellow-100 text-yellow-500 h-20 w-20 rounded-3xl flex items-center justify-center shadow-inner'>

              <FaStar className='text-4xl' />

            </div>

          </div>

        </div>

        {/* AVG PRICE */}
        <div className='bg-white rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border hover:-translate-y-2 transition-all duration-500'>

          <div className='flex items-center justify-between'>

            <div>

              <p className='text-gray-500 uppercase tracking-[3px] text-sm'>

                Avg Price

              </p>

              <h2 className='text-5xl font-black text-gray-800 mt-4'>

                ₹2500

              </h2>

            </div>

            <div className='bg-green-100 text-green-600 h-20 w-20 rounded-3xl flex items-center justify-center shadow-inner text-4xl'>

              💰

            </div>

          </div>

        </div>

      </div>

      {/* 🔥 SEARCH */}
      <div className='flex justify-center mb-16'>

        <input
          type="text"
          placeholder='Search luxury hotels...'
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className='w-full md:w-[450px] px-8 py-5 rounded-full border border-gray-200 shadow-lg outline-none focus:ring-4 focus:ring-orange-200 text-lg bg-white'
        />

      </div>

      {/* 🔥 HOTELS GRID */}
      {filteredHotels.length > 0 ? (

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>

          {filteredHotels.map((hotel, index) => (

            <div
              key={hotel?.hotelName || index}
              className='transform transition-all duration-500 hover:-translate-y-3'
            >

              <HotelCardItem
                hotel={hotel}
              />

            </div>

          ))}

        </div>

      ) : (

        /* 🔥 EMPTY STATE */
        <div className='bg-white rounded-[40px] shadow-xl border p-16 text-center'>

          <div className='bg-orange-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8'>

            <FaHotel className='text-5xl text-orange-500' />

          </div>

          <h2 className='text-4xl font-black text-gray-800'>

            No Hotels Found 😔

          </h2>

          <p className='text-gray-500 mt-5 text-lg max-w-xl mx-auto leading-8'>

            Try searching another hotel or regenerate
            your AI trip plan for more premium stays.

          </p>

        </div>

      )}

    </div>
  )
}

export default Hotels