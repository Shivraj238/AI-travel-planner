import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { sendMessageToAI } from '@/service/AIModel';

import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";

import { doc, setDoc } from "firebase/firestore";
import { db, auth, provider } from '@/service/firebaseConfig';

import { signInWithPopup } from "firebase/auth";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  FaMapMarkedAlt,
  FaWallet,
  FaUsers,
  FaCalendarAlt,
  FaMagic
} from "react-icons/fa";

import { useNavigate } from 'react-router-dom';

function CreateTrip() {

  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {

    console.log("FORM DATA:", formData)

  }, [formData])

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {

      setOpenDialog(true);

      return;
    }

    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveler
    ) {

      toast('Please fill all the details');

      return;
    }

    setLoading(true);

    const FINAL_PROMPT = `
Return ONLY valid JSON. No text outside JSON.

{
  "hotel_options": [
    {
      "name": "",
      "address": "",
      "price": "",
      "rating": ""
    }
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "plan": [
        {
          "place": "",
          "details": "",
          "time": "",
          "ticket_pricing": ""
        }
      ]
    }
  ]
}

Location: ${formData?.location?.label}
Days: ${formData?.noOfDays}
Budget: ${formData?.budget}
Traveler: ${formData?.traveler}
`;

    try {

      const result = await sendMessageToAI(FINAL_PROMPT);

      await SaveAiTrip(result);

    } catch (error) {

      console.error(error);

      toast("AI failed. Check API key ⚠️");

    }

    setLoading(false);
  }

  const SaveAiTrip = async (TripData) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {

      userSelection: formData,

      tripData: TripData,

      userEmail: user?.email,

      id: docId
    });

    navigate('/view-trip/' + docId);
  }

  // 🔥 FIREBASE LOGIN
  const login = async () => {

    try {

      const result = await signInWithPopup(auth, provider);

      localStorage.setItem('user', JSON.stringify(result.user));

      setOpenDialog(false);

      onGenerateTrip();

    } catch (error) {

      console.log(error);

      toast("Google Sign In Failed");

    }
  }

  return (

    <div className='min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 py-14'>

      <div className='max-w-6xl mx-auto px-5 md:px-10 lg:px-16'>

        {/* HERO */}
        <div className='text-center mb-16'>

          <div className='inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-medium shadow-sm mb-6'>

            <FaMagic />

            AI Powered Trip Planner

          </div>

          <h2 className='font-extrabold text-5xl md:text-6xl leading-tight text-gray-900'>

            Plan Your Dream Trip ✈️

          </h2>

          <p className='mt-6 text-gray-500 text-xl max-w-3xl mx-auto leading-9'>

            Tell us your travel preferences and TripGenie AI will generate a smart itinerary, hotel recommendations, and budget planning instantly.

          </p>

        </div>

        {/* MAIN CARD */}
        <div className='bg-white rounded-[35px] shadow-2xl border p-8 md:p-14'>

          <div className='flex flex-col gap-14'>

            {/* DESTINATION */}
            <div>

              <div className='flex items-center gap-3 mb-5'>

                <div className='h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-xl'>

                  <FaMapMarkedAlt />

                </div>

                <h2 className='text-2xl font-bold text-gray-800'>

                  Destination

                </h2>

              </div>

              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  value: place,
                  onChange: (v) => {
                    setPlace(v);
                    handleInputChange('location', v);
                  }
                }}
              />

            </div>

            {/* DAYS */}
            <div>

              <div className='flex items-center gap-3 mb-5'>

                <div className='h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 text-xl'>

                  <FaCalendarAlt />

                </div>

                <h2 className='text-2xl font-bold text-gray-800'>

                  Trip Duration

                </h2>

              </div>

              <Input
                placeholder='Ex. 4'
                type='number'
                className='h-14 rounded-2xl text-lg px-5'
                onChange={(e) =>
                  handleInputChange('noOfDays', e.target.value)
                }
              />

            </div>

            {/* BUDGET */}
            <div>

              <div className='flex items-center gap-3 mb-6'>

                <div className='h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-500 text-xl'>

                  <FaWallet />

                </div>

                <h2 className='text-2xl font-bold text-gray-800'>

                  Budget Preference

                </h2>

              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

                {SelectBudgetOptions.map((item, index) => (

                  <div
                    key={index}
                    onClick={() => handleInputChange('budget', item.title)}
                    className={`rounded-3xl border-2 p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white
                    ${formData?.budget === item.title
                        ? 'border-orange-500 shadow-2xl bg-orange-50'
                        : 'border-gray-200'
                      }`}
                  >

                    <h2 className='text-5xl mb-5'>
                      {item.icon}
                    </h2>

                    <h2 className='font-bold text-2xl'>
                      {item.title}
                    </h2>

                    <p className='text-gray-500 mt-3 text-base leading-7'>
                      {item.desc}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            {/* TRAVELERS */}
            <div>

              <div className='flex items-center gap-3 mb-6'>

                <div className='h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-500 text-xl'>

                  <FaUsers />

                </div>

                <h2 className='text-2xl font-bold text-gray-800'>

                  Travelers

                </h2>

              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>

                {SelectTravelList.map((item, index) => (

                  <div
                    key={index}
                    onClick={() =>
                      handleInputChange('traveler', item.people)
                    }
                    className={`rounded-3xl border-2 p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white
                    ${formData?.traveler === item.people
                        ? 'border-orange-500 shadow-2xl bg-orange-50'
                        : 'border-gray-200'
                      }`}
                  >

                    <h2 className='text-5xl mb-5'>
                      {item.icon}
                    </h2>

                    <h2 className='font-bold text-2xl'>
                      {item.title}
                    </h2>

                    <p className='text-gray-500 mt-3 text-base leading-7'>
                      {item.desc}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* BUTTON */}
          <div className='mt-16 flex justify-center'>

            <Button
              disabled={loading}
              onClick={onGenerateTrip}
              className='rounded-full h-[65px] px-14 text-lg font-bold bg-black hover:bg-gray-900 shadow-2xl'
            >

              {loading ?

                <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />

                :

                <>
                  <FaMagic className='mr-3' />
                  Generate AI Trip
                </>
              }

            </Button>

          </div>

        </div>

      </div>

      {/* LOGIN DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>

        <DialogContent className="rounded-[30px] border-none shadow-2xl overflow-hidden p-0 max-w-[850px]">

          <DialogDescription asChild>

            <div className='grid md:grid-cols-2'>

              {/* LEFT */}
              <div className='hidden md:flex bg-gradient-to-br from-orange-500 to-orange-400 items-center justify-center p-10'>

                <img
                  src="/logo.svg"
                  alt="logo"
                  className='h-28'
                />

              </div>

              {/* RIGHT */}
              <div className='bg-white px-10 py-14 flex flex-col justify-center'>

                <h2 className='text-4xl font-bold text-black leading-tight'>

                  Welcome Back 👋

                </h2>

                <p className='text-gray-500 mt-5 text-lg leading-8'>

                  Continue with Google and start generating personalized AI travel itineraries instantly.

                </p>

                <Button
                  onClick={login}
                  className='mt-10 h-[60px] rounded-2xl bg-black hover:bg-gray-900 text-lg font-semibold flex items-center justify-center gap-4'
                >

                  <FcGoogle className='h-7 w-7 bg-white rounded-full p-1' />

                  Continue With Google

                </Button>

              </div>

            </div>

          </DialogDescription>

        </DialogContent>

      </Dialog>

    </div>
  )
}

export default CreateTrip