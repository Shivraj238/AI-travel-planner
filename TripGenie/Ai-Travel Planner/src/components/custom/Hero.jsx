import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import {
  FaMapMarkedAlt,
  FaPlaneDeparture
} from "react-icons/fa";

function Hero() {

  return (

    <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 py-20 min-h-screen">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-5 py-2 rounded-full text-sm font-medium shadow-sm">

            <FaPlaneDeparture />

            AI Powered Travel Planner

          </div>

          {/* Heading */}
          <h1 className="font-extrabold text-5xl md:text-7xl leading-tight mt-8">

            <span className="text-[#f56551]">
              Discover Your
            </span>

            <br />

            <span className="text-gray-900">
              Next Adventure
            </span>

            <br />

            <span className="text-gray-800">
              with AI ✈️
            </span>

          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-500 mt-8 leading-9 max-w-2xl">

            Plan smarter trips with AI-generated itineraries,
            personalized recommendations, hotel suggestions,
            and budget-friendly travel experiences.

          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-10">

            <Link to={'/create-trip'}>

              <Button className="rounded-full px-8 py-6 text-lg bg-black hover:bg-gray-800 shadow-xl hover:scale-105 transition-all duration-300">

                ✨ Get Started — It's Free

              </Button>

            </Link>

            
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mt-14">

            <div>

              <h2 className="text-3xl font-bold text-gray-900">
                AI Powered
              </h2>

              <p className="text-gray-500 mt-1">
                Smart Planning
              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-gray-900">
                Personalized
              </h2>

              <p className="text-gray-500 mt-1">
                Itineraries
              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-gray-900">
                Budget
              </h2>

              <p className="text-gray-500 mt-1">
                Friendly Trips
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative">

          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Travel"
            className="rounded-[40px] shadow-2xl h-[650px] w-full object-cover"
          />

          {/* Floating Card */}
          <div className="absolute bottom-6 left-6 bg-white p-6 rounded-3xl shadow-2xl max-w-[280px]">

            <div className="flex items-center gap-3">

              <div className="bg-orange-500 p-3 rounded-full">

                <FaMapMarkedAlt className="text-white text-xl" />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Smart AI Planning
                </p>

                <h2 className="font-bold text-lg">
                  Personalized Trips
                </h2>

              </div>

            </div>

            <div className="mt-5">

              <p className="text-gray-500 text-sm leading-6">

                Generate travel plans, discover places,
                and organize your journey effortlessly.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Hero