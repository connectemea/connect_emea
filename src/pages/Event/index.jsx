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
      <section className=" bg-black   text-white w-full">
        <div className="w-limit w-full flex gap-4 p-4">
          <div className="flex flex-col  items-start font-bold py-6 ">
            <h2 className="text-[20px]">Upcoming</h2>
            <h1 className="text-[36px]">Events</h1>
          </div>
          <div className="flex-1 flex gap-4 overflow-auto">
            {UpcomingEvents.map((event, index) => (
              <div key={index}>
                <Special data={event} />
              </div>
            ))}
          </div>
        </div>

      </section>
      <section className="flex p-4 gap-4 w-limit">
        <div className="flex flex-col
         items-start font-bold py-6">
          <h2 className="text-[20px]">Recent</h2>
          <h1 className="text-[36px]">Events</h1>
        </div>
        <div className="flex-1 flex gap-4 overflow-auto">
          {RecentEvents.map((event, index) => (
            <div key={index}>
              <Special data={event} />
            </div>
          ))}
        </div>

      </section>
      <section className="flex p-4 gap-4 w-limit">
        <div className="flex flex-col items-start font-bold py-6">
          <h2 className="text-[20px]">All</h2>
          <h1 className="text-[36px]">Events</h1>
        </div>
        <div className="flex-1 flex gap-4 overflow-auto">
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