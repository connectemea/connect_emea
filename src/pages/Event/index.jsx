import { Events } from "@/const/data/Events";
import { Normal, Special } from "./components/EventCard";

const Event = () => {
  const PastEvents = Events.PastEvents;
  const RecentEvents = Events.RecentEvents;
  const UpcomingEvents = Events.UpcomingEvents;

  console.log(PastEvents, RecentEvents, UpcomingEvents)
  return (
    <div>
      <h1 className='font-bold py-10 flex justify-center text-2xl w-full space-y-2'>Event page</h1>
      <section className="flex bg-black p-4 gap-4 text-white">
        <div className="flex flex-col  items-start font-bold py-6">
          <h2 className="">Upcoming</h2>
          <h1 className="text-2xl">Events</h1>
        </div>
        <div className="flex-1">
          {UpcomingEvents.map((event, index) => (
            <div key={index}>
              <Special data={event} />
            </div>
          ))}
        </div>

      </section>
      <section className="flex p-4 gap-4">
        <div className="flex flex-col
         items-start font-bold py-6">
          <h2 className="">Recent</h2>
          <h1 className="text-2xl">Events</h1>
        </div>
        <div className="flex-1">
          {RecentEvents.map((event, index) => (
            <div key={index}>
              <Special data={event} />
            </div>
          ))}
        </div>

      </section>

      <section className="flex p-4 gap-4">
        <div className="flex flex-col items-start font-bold py-6">
          <h2 className="">All</h2>
          <h1 className="text-2xl">Events</h1>
        </div>
        <div className="flex-1">
          {PastEvents.map((event, index) => (
            <div key={index}>
              <Normal data={event} />
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
export default Event;