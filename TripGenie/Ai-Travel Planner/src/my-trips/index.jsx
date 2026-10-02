import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {

    const navigate = useNavigate();

    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetUserTrips();
    }, [])

    const GetUserTrips = async () => {

        try {

            const user = JSON.parse(localStorage.getItem('user'));

            if (!user) {
                navigate('/');
                return;
            }

            const q = query(
                collection(db, 'AITrips'),
                where('userEmail', '==', user?.email)
            );

            const querySnapshot = await getDocs(q);

            const trips = [];

            querySnapshot.forEach((doc) => {

                trips.push({
                    id: doc.id,
                    ...doc.data()
                });

            });

            setUserTrips(trips);

        } catch (error) {

            console.log("Error Fetching Trips:", error);

        } finally {

            setLoading(false);

        }
    }

    return (
        <div className='sm:px-10 md:px-20 lg:px-32 xl:px-44 px-5 mt-10 mb-20'>

            <h2 className='font-bold text-4xl text-center mb-12'>
                My Trips
            </h2>

            {
                loading ?

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>

                        {[1,2,3,4,5,6].map((item,index)=>(
                            <div
                                key={index}
                                className='h-[250px] w-full bg-slate-200 animate-pulse rounded-2xl'
                            />
                        ))}

                    </div>

                    :

                    userTrips?.length > 0 ?

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>

                            {userTrips.map((trip, index) => (

                                <UserTripCardItem
                                    trip={trip}
                                    key={index}
                                />

                            ))}

                        </div>

                        :

                        <div className='text-center mt-20'>

                            <h2 className='text-2xl font-semibold text-gray-500'>
                                No Trips Found
                            </h2>

                            <button
                                onClick={() => navigate('/create-trip')}
                                className='mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-all'
                            >
                                Create New Trip
                            </button>

                        </div>
            }

        </div>
    )
}

export default MyTrips