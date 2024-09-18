import React from 'react';
import { useParams } from 'react-router-dom';
import { Events } from '@/const/data/Events';
import Tab from './components/tabs';

function SingleEvent() {
    const { id } = useParams();
    const allEvents = [...Events.PastEvents, ...Events.RecentEvents, ...Events.UpcomingEvents];

    // Convert id to a number if necessary
    const eventId = Number(id);

    // Find the event with the matching id
    const event = allEvents.find((event) => event.id === eventId);

    console.log(event);

    return (
        <div className=' w-limit px-2'>

            {event ? (
                <div className=' flex  flex-col mx-auto  mt-10'>
                    <div  className='flex justify-between flex-col sm:flex-row'>
                        <div className='sm:w-1/2 mx-auto p-2 text-center sm:text-left'>
                            <h2 className='font-semibold text-2xl '>{event.title}</h2>
                            <p className=''>{event.description}</p>
                        </div>
                        <div className='sm:w-1/2 mx-auto my-4 sm:my-0'>
                        <div className='bg-slate-300 w-80 h-80 rounded-lg mx-auto'></div>
                        </div>
                    </div>
                    <div>
                        <h2 className='font-semibold text-xl text-left pl-2'>About</h2>
                            <Tab />
                    </div>

                </div>
    ) : (
        <p>Event not found</p>
    )
}
        </div >
    );
}

export default SingleEvent;
