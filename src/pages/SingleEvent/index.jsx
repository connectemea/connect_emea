import React from 'react';
import { useParams } from 'react-router-dom';
import { Events } from '../../const/data/Events';
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
        <div className='h-[80vh]'>

            {event ? (
                <div className=' flex  flex-col mx-auto'>
                    <div  className='flex justify-between'>
                        <div className=''>
                            <h2 className='font-semibold text-2xl'>{event.title}</h2>
                            <p>{event.description}</p>
                        </div>
                        <div className='bg-slate-300 w-80 h-96 rounded-lg '></div>
                    </div>
                    <div>
                        <h2 className='font-semibold text-xl text-left'>About</h2>
                            <Tab />
                    </div>

                </div>
            ) : (
                <p>Event not found</p>
            )}
        </div>
    );
}

export default SingleEvent;
