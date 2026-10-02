import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import CreateTrip from './create-trip/index.jsx'
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'

import Header from './components/custom/Header.jsx'

import { Toaster } from './components/ui/sonner.jsx'

// 🔥 ROUTES
const router = createBrowserRouter([

  {
    path: '/',
    element: <App />
  },

  {
    path: '/create-trip',
    element: <CreateTrip />
  },

  {
    path: '/view-trip/:tripId',
    element: <Viewtrip />
  },

  {
    path: '/my-trips',
    element: <MyTrips />
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    {/* 🔥 HEADER */}
    <Header />

    {/* 🔥 TOASTER */}
    <Toaster />

    {/* 🔥 ROUTER */}
    <RouterProvider router={router} />

  </React.StrictMode>
)