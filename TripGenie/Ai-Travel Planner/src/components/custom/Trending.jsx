import React from 'react'

function Trending() {

  const places = [
    "Goa",
    "Manali",
    "Dubai"
  ]

  return (

    <div className="py-24 bg-orange-50">

      <h2 className="text-center text-5xl font-bold">
        Trending Destinations 🌍
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto px-6">

        {places.map((place,index)=>(

          <div
            key={index}
            className="relative rounded-3xl overflow-hidden shadow-xl group"
          >

            <img
              src={`https://source.unsplash.com/600x800/?${place},travel`}
              className="h-[450px] w-full object-cover group-hover:scale-110 transition-all duration-700"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <h2 className="absolute bottom-6 left-6 text-white text-4xl font-bold">
              {place}
            </h2>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Trending