import { db } from '@/service/firebaseConfig';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'sonner';

import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import InfoSection from '../components/InfoSection';
import WeatherCard from '../components/WeatherCard';
import GoogleMapView from '../components/GoogleMapView';

import html2pdf from 'html2pdf.js';
import AIChat from '../components/AIChat';
import { Button } from '@/components/ui/button';

import {
  FaShareAlt,
  FaDownload,
  FaWhatsapp,
  FaEnvelope
} from "react-icons/fa";

function Viewtrip() {

  const { tripId } = useParams();

  const [trip, setTrip] = useState(null);

  const tripRef = useRef();

  useEffect(() => {

    if (tripId) {

      GetTripData();

    }

  }, [tripId])

  // 🔥 FETCH DATA
  const GetTripData = async () => {

    try {

      const docRef =
        doc(db, 'AITrips', tripId);

      const docSnap =
        await getDoc(docRef)

      if (docSnap.exists()) {

        setTrip(docSnap.data());

      } else {

        toast("No trip found ❌")

      }

    } catch (error) {

      console.log(error);

      toast("Failed to load trip ❌")

    }

  }

  // 🔥 DOWNLOAD PDF
  const DownloadTrip = async () => {

  const buttons =
    document.querySelector(".pdf-buttons");

  try {

    toast("Preparing PDF... ⏳");

    // 🔥 HIDE BUTTONS
    if (buttons) {

      buttons.style.visibility = "hidden";

    }

    const element =
      tripRef.current;

    // 🔥 FIX OKLCH COLORS
    const allElements =
      element.querySelectorAll("*");

    allElements.forEach((el) => {

      const styles =
        window.getComputedStyle(el);

      // FIX COLORS
      if (
        styles.color.includes("oklch")
      ) {
        el.style.color = "#000";
      }

      if (
        styles.backgroundColor.includes("oklch")
      ) {
        el.style.backgroundColor = "#fff";
      }

      if (
        styles.borderColor.includes("oklch")
      ) {
        el.style.borderColor = "#ddd";
      }

      // REMOVE EFFECTS
      el.style.boxShadow = "none";
      el.style.backdropFilter = "none";
      el.style.filter = "none";

    });

    await html2pdf()
      .set({

        margin: 0.3,

        filename:
          "TripGenieAI.pdf",

        image: {

          type: "jpeg",

          quality: 1

        },

        html2canvas: {

          scale: 2,

          useCORS: true,

          logging: false

        },

        jsPDF: {

          unit: "in",

          format: "a4",

          orientation: "portrait"

        }

      })
      .from(element)
      .save();

    toast("PDF Downloaded ✅");

  } catch (error) {

    console.log(error);

    toast("PDF Download Failed ❌");

  } finally {

    // 🔥 ALWAYS SHOW BUTTONS AGAIN
    if (buttons) {

      buttons.style.visibility = "visible";

    }

  }

}
  // 🔥 SHARE
  const ShareTrip = async () => {

    try {

      await navigator.share({

        title: 'TripGenie AI',

        text:
          'Check out my AI generated travel itinerary ✈️',

        url:
          window.location.href

      })

    } catch (error) {

      console.log(error)

    }

  }

  // 🔥 WHATSAPP
  const ShareWhatsApp = () => {

    const text =
      `Check out my AI Trip Plan ✈️\n${window.location.href}`

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      '_blank'
    )

  }

  // 🔥 MAIL
  const ShareMail = () => {

    const subject =
      "My AI Generated Travel Plan";

    const body =
      `Hey,\n\nCheck out my trip itinerary:\n${window.location.href}`

    window.location.href =
      `mailto:?subject=${subject}&body=${body}`

  }

  // 🔥 LOADER
  if (!trip) {

    return (

      <div className='h-screen flex items-center justify-center bg-[#fff7f0]'>

        <div className='text-center'>

          <div className='w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto'></div>

          <h2 className='text-3xl font-bold text-orange-500 mt-8 animate-pulse'>

            Loading Your Amazing Trip...

          </h2>

        </div>

      </div>

    )

  }

  return (

    <>

      {/* 🔥 SEO */}
      <Helmet>

        <title>
          {trip?.userSelection?.location?.label}
          {" "}
          Trip | TripGenie AI
        </title>

        <meta
          name="description"
          content={`Explore ${trip?.userSelection?.location?.label} with AI generated itinerary, hotels and travel planning.`}
        />

      </Helmet>

      {/* 🔥 BACKGROUND BLOBS */}
      <div className='fixed top-0 left-0 w-[450px] h-[450px] bg-orange-200 rounded-full blur-[140px] opacity-20 -z-10'></div>

      <div className='fixed bottom-0 right-0 w-[450px] h-[450px] bg-pink-200 rounded-full blur-[140px] opacity-20 -z-10'></div>

      <div className='bg-gradient-to-b from-[#fff7f0] via-white to-[#fff3eb] min-h-screen py-10 overflow-hidden'>

        {/* 🔥 ACTION BUTTONS */}
        <div className='pdf-buttons top-4 z-50 flex flex-wrap justify-center gap-4 mb-16 px-5'>

          <Button
            onClick={DownloadTrip}
            className='rounded-full bg-black hover:bg-gray-800 shadow-xl px-7 py-6 hover:scale-105 transition-all duration-300'
          >

            <FaDownload className='mr-2' />

            Download PDF

          </Button>

          <Button
            onClick={ShareTrip}
            className='rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-red-500 shadow-xl px-7 py-6 hover:scale-105 transition-all duration-300'
          >

            <FaShareAlt className='mr-2' />

            Share Trip

          </Button>

          <Button
            onClick={ShareWhatsApp}
            className='rounded-full bg-green-500 hover:bg-green-600 shadow-xl px-7 py-6 hover:scale-105 transition-all duration-300'
          >

            <FaWhatsapp className='mr-2' />

            WhatsApp

          </Button>

          <Button
            onClick={ShareMail}
            className='rounded-full bg-blue-500 hover:bg-blue-600 shadow-xl px-7 py-6 hover:scale-105 transition-all duration-300'
          >

            <FaEnvelope className='mr-2' />

            Gmail

          </Button>

        </div>

        {/* 🔥 MAIN CONTENT */}
        <div
          ref={tripRef}
          className='w-full max-w-[1850px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-28'
        >

          {/* 🔥 HERO */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
          >

            <InfoSection trip={trip} />

          </motion.div>

          {/* 🔥 WEATHER + TRAVEL EXPERIENCE */}
          <motion.div
            className='mt-24'
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.7
            }}
          >

            <div className='grid grid-cols-1 xl:grid-cols-5 gap-10 items-stretch'>

              {/* 🔥 WEATHER */}
              <div className='xl:col-span-3'>

                <div className='bg-white/70 backdrop-blur-2xl border border-white/30 rounded-[45px] shadow-[0_20px_70px_rgba(0,0,0,0.08)] p-6 md:p-10 hover:shadow-[0_20px_90px_rgba(59,130,246,0.15)] transition-all duration-500 h-full'>

                  <div className='flex items-center gap-5 mb-8'>

                    <div className='h-20 w-20 rounded-[28px] bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center shadow-xl text-4xl'>

                      🌤️

                    </div>

                    <div>

                      <h2 className='text-4xl font-black text-gray-800'>

                        Live Weather

                      </h2>

                      <p className='text-gray-500 mt-2 text-lg'>

                        Real-time weather updates for your destination

                      </p>

                    </div>

                  </div>

                  <WeatherCard
                    location={
                      trip?.userSelection?.location?.label
                    }
                  />

                </div>

              </div>

              {/* 🔥 TRAVEL EXPERIENCE */}
              <div className='xl:col-span-2'>

                <div className='bg-gradient-to-br from-orange-500 via-orange-400 to-red-500 rounded-[45px] p-10 shadow-[0_20px_70px_rgba(249,115,22,0.35)] text-white h-full relative overflow-hidden'>

                  {/* BG */}
                  <div className='absolute -top-16 -right-16 h-52 w-52 bg-white/10 rounded-full'></div>

                  <div className='absolute -bottom-16 -left-16 h-72 w-72 bg-white/10 rounded-full'></div>

                  <div className='relative z-10 flex flex-col h-full'>

                    <div className='text-7xl mb-8'>

                      ✈️

                    </div>

                    <div>

                      <h2 className='text-5xl font-black leading-tight'>

                        Smart Travel
                        <br />
                        Experience

                      </h2>

                      <p className='mt-5 text-white/90 text-lg leading-8'>

                        Discover premium stays, local attractions,
                        unforgettable food and beautiful experiences
                        powered by AI trip planning.

                      </p>

                    </div>

                    <div className='grid grid-cols-2 gap-5 mt-10'>

                      <div className='bg-white/15 backdrop-blur-md rounded-3xl p-5 border border-white/10'>

                        <p className='text-sm uppercase tracking-[3px] text-white/70'>

                          Best Time

                        </p>

                        <h2 className='text-2xl font-black mt-3'>

                          Morning
                          <br />
                          Evening

                        </h2>

                      </div>

                      <div className='bg-white/15 backdrop-blur-md rounded-3xl p-5 border border-white/10'>

                        <p className='text-sm uppercase tracking-[3px] text-white/70'>

                          Stay Plan

                        </p>

                        <h2 className='text-3xl font-black mt-3'>

                          {trip?.userSelection?.noOfDays}
                          <span className='text-xl ml-2'>
                            Days
                          </span>

                        </h2>

                      </div>

                    </div>

                    <div className='mt-auto pt-10'>

                      <div className='bg-black/15 backdrop-blur-xl rounded-3xl p-6 border border-white/10'>

                        <p className='text-white/70 uppercase tracking-[3px] text-sm'>

                          Destination

                        </p>

                        <h2 className='text-3xl font-black mt-3 leading-snug'>

                          {
                            trip?.userSelection?.location?.label
                          }

                        </h2>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

          {/* 🔥 HOTELS */}
          <motion.div
            className='mt-36'
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.7
            }}
          >

            <Hotels trip={trip} />

          </motion.div>

          {/* 🔥 PLACES */}
          <motion.div
            className='mt-36'
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.7
            }}
          >

            <PlacesToVisit trip={trip} />

          </motion.div>
         

         {/* 🔥 AI CHAT */}
<motion.div
  className='mt-28'
  initial={{
    opacity: 0,
    y: 40
  }}
  whileInView={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.7
  }}
>

  <AIChat trip={trip} />

</motion.div>






          

          {/* 🔥 FOOTER */}
          <div className='mt-36'>

            <Footer />

          </div>

        </div>

      </div>

    </>

  )

}

export default Viewtrip