import React, { useEffect, useState } from 'react'

import { Button } from '../ui/button'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  auth,
  provider
} from '@/service/firebaseConfig';

function Header() {

  const [user, setUser] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  // 🔥 CHECK USER LOGIN
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      if (currentUser) {

        setUser(currentUser);

      } else {

        setUser(null);
      }
    });

    return () => unsubscribe();

  }, []);

  // 🔥 GOOGLE LOGIN
  const login = async () => {

    try {

      const result = await signInWithPopup(auth, provider);

      setUser(result.user);

      setOpenDialog(false);

    } catch (error) {

      console.log(error);
    }
  }

  // 🔥 LOGOUT
  const Logout = async () => {

    await signOut(auth);

    setUser(null);
  }

  return (

    <div className='shadow-sm flex justify-between items-center px-6 py-3 bg-white'>

      {/* 🔥 LOGO */}
      <img
        src="/logo.svg"
        alt="Logo"
        className='h-10 w-auto cursor-pointer'
      />

      {/* 🔥 RIGHT SIDE */}
      <div>

        {user ?

          <div className='flex items-center gap-3'>

            <a href="/create-trip">

              <Button
                variant="outline"
                className="rounded-full"
              >
                + Create Trip
              </Button>

            </a>

            <a href="/my-trips">

              <Button
                variant="outline"
                className="rounded-full"
              >
                My Trips
              </Button>

            </a>

            {/* 🔥 USER PROFILE */}
            <Popover>

              <PopoverTrigger>

                <img
                  src={user?.photoURL}
                  alt=""
                  className='h-[40px] w-[40px] rounded-full cursor-pointer border-2 border-orange-400'
                />

              </PopoverTrigger>

              <PopoverContent className="w-40">

                <h2
                  onClick={Logout}
                  className='cursor-pointer text-red-500 font-medium hover:text-red-600'
                >
                  Logout
                </h2>

              </PopoverContent>

            </Popover>

          </div>

          :

          <Button
            onClick={() => setOpenDialog(true)}
            className='rounded-full bg-black hover:bg-gray-800'
          >
            Sign In
          </Button>
        }

      </div>

      {/* 🔥 LOGIN DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>

        <DialogContent className="rounded-3xl">

          <DialogHeader>

            <DialogDescription>

              <div className='flex flex-col items-center text-center py-5'>

                <img
                  src="/logo.svg"
                  alt="logo"
                  className='h-16 mb-5'
                />

                <h2 className='font-bold text-2xl mb-2 text-black'>

                  Welcome to TripGenie AI

                </h2>

                <p className='text-gray-500 mb-6'>

                  Sign in securely using Firebase Google Authentication

                </p>

                <Button
                  onClick={login}
                  className="w-full flex gap-4 items-center rounded-xl"
                >

                  <FcGoogle className="h-7 w-7" />

                  Sign in With Google

                </Button>

              </div>

            </DialogDescription>

          </DialogHeader>

        </DialogContent>

      </Dialog>

    </div>
  )
}

export default Header