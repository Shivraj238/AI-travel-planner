import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {

  const itinerary = trip?.tripData?.itinerary || [];

  return (

    <div className='mt-20'>

      {/* HEADER */}
      <div className='mb-10'>

        <h2 className='text-3xl font-bold text-gray-800'>

          Places To Visit

        </h2>

        <p className='text-gray-500 mt-2'>

          Explore recommended places for your trip.

        </p>

      </div>

      {/* DAY WISE PLACES */}
      {itinerary.map((item, index) => (

        <div
          key={index}
          className='mb-14'
        >

          {/* DAY TITLE */}
          <div className='mb-6'>

            <h3 className='text-2xl font-semibold text-orange-500'>

              {item.day}

            </h3>

            <p className='text-sm text-gray-500 mt-1'>

              {item.plan.length} places planned

            </p>

          </div>

          {/* PLACES GRID */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

            {item.plan.map((place, i) => (

              <PlaceCardItem
                key={i}
                place={place}
              />

            ))}

          </div>

        </div>

      ))}

      {/* EMPTY STATE */}
      {itinerary.length === 0 && (

        <div className='bg-white border rounded-2xl p-10 text-center'>

          <h2 className='text-2xl font-bold text-gray-800'>

            No Places Found

          </h2>

          <p className='text-gray-500 mt-2'>

            Generate a trip to see recommended places.

          </p>

        </div>

      )}

    </div>

  )
}

export default PlacesToVisit