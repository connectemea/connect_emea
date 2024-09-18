import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Events from '@/const/data/Events';
import Tab from './components/tabs';


const Spinner = () => {
    return (
        <div className="flex justify-center items-center mt-20">
            <div className="border-t-transparent border-solid animate-spin border-orange-500 border-8 border-t-8 rounded-full h-16 w-16"></div>
        </div>
    );
};
function SingleEvent() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    // Convert id to a number if necessary
    const eventId = Number(id);

    // Find the event with the matching id
    const event = Events.find((event) => event.id === eventId);

    return (
        <div className='w-limit px-2'>
            {loading ? (
                <Spinner />
            ) : (
                event ? (
                    <div className='flex flex-col mx-auto mt-10'>
                        <div className='flex justify-between flex-col sm:flex-row'>
                            <div className='sm:w-1/2 mx-auto p-2 text-center sm:text-left'>
                                <h2 className='font-semibold text-2xl'>{event.title}</h2>
                                <p>{event.description}</p>
                            </div>
                            <div className='sm:w-1/2 mx-auto my-4 sm:my-0'>
                                <div className='bg-slate-300 w-80 h-80 rounded-lg mx-auto relative overflow-hidden'>
                                    <img
                                        src={`https://picsum.photos/600/350?v=5`}
                                        alt=""
                                        className="absolute inset-0 object-cover w-full h-full "
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className='font-semibold text-xl text-left pl-2'>About</h2>
                            <Tab />
                        </div>
                    </div>
                ) : (
                    <div className='text-center my-10'>
                        <h1 className='text-xl font-semibold'>Event Not Found</h1>
                        <p className='mt-4 text-gray-600'>We could not find the event you were looking for. Please check the URL or return to the home page.</p>
                    </div>
                )
            )}
        </div>
    );
}

export default SingleEvent;
