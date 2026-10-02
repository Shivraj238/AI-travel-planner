import React from 'react'

function Features() {
  return (

    <div className="py-24 bg-white">

      <h2 className="text-center text-5xl font-bold">
        Why Choose TripGenie AI?
      </h2>

      <div className="grid md:grid-cols-3 gap-10 mt-20 max-w-6xl mx-auto px-6">

        <div className="p-8 rounded-3xl shadow-lg border hover:shadow-2xl transition-all">
          <h2 className="text-5xl">🤖</h2>

          <h3 className="text-2xl font-bold mt-5">
            AI Trip Planning
          </h3>

          <p className="text-gray-500 mt-4">
            Personalized itineraries generated instantly.
          </p>
        </div>

        <div className="p-8 rounded-3xl shadow-lg border hover:shadow-2xl transition-all">
          <h2 className="text-5xl">💰</h2>

          <h3 className="text-2xl font-bold mt-5">
            Budget Calculator
          </h3>

          <p className="text-gray-500 mt-4">
            Calculate hotel, food & travel expenses automatically.
          </p>
        </div>

        <div className="p-8 rounded-3xl shadow-lg border hover:shadow-2xl transition-all">
          <h2 className="text-5xl">🗺️</h2>

          <h3 className="text-2xl font-bold mt-5">
            Smart Maps
          </h3>

          <p className="text-gray-500 mt-4">
            Explore destinations with Google Maps integration.
          </p>
        </div>

      </div>

    </div>
  )
}

export default Features