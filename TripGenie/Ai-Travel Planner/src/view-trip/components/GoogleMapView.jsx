
import React, {
  useEffect,
  useState
} from 'react'

import {
  GoogleMap,
  MarkerF,
  useJsApiLoader
} from '@react-google-maps/api';

import {
  FaMapMarkedAlt,
  FaLocationArrow,
  FaRoute,
  FaMapMarkerAlt
} from "react-icons/fa";

function GoogleMapView({ trip }) {

  // 🔥 LOAD MAP
  const { isLoaded } = useJsApiLoader({

    id: 'google-map-script',

    googleMapsApiKey:
      import.meta.env.VITE_GOOGLE_PLACE_API_KEY

  })

  // 🔥 LOCATION
  const location =
    trip?.userSelection?.location?.label || "India";

  // 🔥 ALL PLACES
  const allPlaces =
    trip?.tripData?.itinerary?.flatMap(day =>
      day.plan.map(place => ({
        ...place,
        day: day.day
      }))
    ) || [];

  // 🔥 MAP CENTER
  const [center, setCenter] = useState({

    lat: 20.5937,
    lng: 78.9629

  })

  // 🔥 REAL PLACE MARKERS
  const [placeMarkers, setPlaceMarkers] =
    useState([]);

  // 🔥 GET DESTINATION COORDINATES
  useEffect(() => {

    GetCoordinates();

  }, [location])

  const GetCoordinates = async () => {

    try {

      const response = await fetch(

        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`

      )

      const data = await response.json();

      if (data.results.length > 0) {

        const loc =
          data.results[0].geometry.location;

        setCenter({

          lat: loc.lat,
          lng: loc.lng

        })

      }

    } catch (error) {

      console.log(error)

    }

  }

  // 🔥 GET ALL PLACE COORDINATES
  useEffect(() => {

    if (allPlaces.length > 0) {

      GetPlaceCoordinates();

    }

  }, [trip])

  const GetPlaceCoordinates = async () => {

    try {

      const markers = await Promise.all(

        allPlaces.map(async (place) => {

          const placeName =
            place?.placeName ||
            place?.place ||
            place?.name;

          if (!placeName) return null;

          const response = await fetch(

            `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName},${location}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`

          )

          const data = await response.json();

          if (data.results.length > 0) {

            const loc =
              data.results[0].geometry.location;

            return {

              lat: loc.lat,
              lng: loc.lng,
              name: placeName

            }

          }

          return null;

        })

      )

      setPlaceMarkers(
        markers.filter(Boolean)
      )

    } catch (error) {

      console.log(error)

    }

  }

  // 🔥 LOADING
  if (!isLoaded) {

    return (

      <div className='h-[400px] flex items-center justify-center text-2xl font-bold'>

        Loading Map...

      </div>

    )

  }

  return (

    <div className='mt-28'>

      {/* 🔥 HEADER */}
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10'>

        {/* LEFT */}
        <div className='flex items-center gap-5'>

          <div className='bg-orange-100 p-5 rounded-[28px] shadow-sm'>

            <FaMapMarkedAlt className='text-orange-500 text-4xl' />

          </div>

          <div>

            <h2 className='text-4xl md:text-5xl font-black text-gray-800'>

              Trip Location Map

            </h2>

            <p className='text-gray-500 mt-3 text-lg leading-8 max-w-2xl'>

              Explore your travel destinations visually.

            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className='grid grid-cols-2 gap-4'>

          {/* PLACES */}
          <div className='bg-white rounded-3xl border shadow-lg p-5 min-w-[160px]'>

            <div className='flex items-center gap-3'>

              <div className='bg-orange-100 p-3 rounded-2xl'>

                <FaLocationArrow className='text-orange-500 text-xl' />

              </div>

              <div>

                <p className='text-xs uppercase text-gray-500'>

                  Places

                </p>

                <h2 className='text-2xl font-black text-gray-800'>

                  {allPlaces.length}

                </h2>

              </div>

            </div>

          </div>

          {/* DAYS */}
          <div className='bg-white rounded-3xl border shadow-lg p-5 min-w-[160px]'>

            <div className='flex items-center gap-3'>

              <div className='bg-blue-100 p-3 rounded-2xl'>

                <FaRoute className='text-blue-500 text-xl' />

              </div>

              <div>

                <p className='text-xs uppercase text-gray-500'>

                  Trip Days

                </p>

                <h2 className='text-2xl font-black text-gray-800'>

                  {trip?.tripData?.itinerary?.length || 0}

                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 🔥 MAP */}
      <div className='relative rounded-[40px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.15)] border bg-white'>

        {/* 🔥 DESTINATION OVERLAY */}
        <div className='absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-xl border'>

          <div className='flex items-center gap-4'>

            <div className='bg-orange-100 p-3 rounded-2xl'>

              <FaMapMarkerAlt className='text-orange-500 text-xl' />

            </div>

            <div>

              <p className='text-xs uppercase tracking-[3px] text-gray-500'>

                Destination

              </p>

              <h2 className='text-xl font-black text-gray-800 mt-1'>

                {location}

              </h2>

            </div>

          </div>

        </div>

        {/* 🔥 GOOGLE MAP */}
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '700px'
          }}
          zoom={7}
          center={center}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false
          }}
        >

          {/* 🔥 MAIN DESTINATION */}
          <MarkerF position={center} />

          {/* 🔥 REAL PLACE MARKERS */}
          {placeMarkers.map((marker, index) => (

            <MarkerF
              key={index}
              position={{
                lat: marker.lat,
                lng: marker.lng
              }}
            />

          ))}

        </GoogleMap>

      </div>

    </div>
  )
}

export default React.memo(GoogleMapView)