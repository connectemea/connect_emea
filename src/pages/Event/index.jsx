import Events from "@/const/data/Events";
import { Normal, Special } from "./components/EventCard";
import EmblaCarousel from "./components/Carousal/EmblaCarousel";
import EmblaCarousel2 from "./components/Carousal/EmblaCarousel2";
import NormalCard from "./components/EventCard/Normal";
import SlickCarousel from "./components/Carousal/SlickCarousel";

const OPTIONS = { loop: false, align: 'start' }

const Event = () => {
  const currentDate = new Date();

  // Sort events by date in descending order (most recent events first)
  const sortedEvents = Events.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split("/").map(Number); // Note the order
    const [dayB, monthB, yearB] = b.date.split("/").map(Number); // Note the order

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateB.getTime() - dateA.getTime();
  });

  // Separate events into categories
  const UpcomingEvents = sortedEvents.filter(event => {
    const [day, month, year] = event.date.split("/").map(Number);
    const eventDate = new Date(year, month - 1, day);
    return eventDate >= currentDate;
  });

  const PastEvents = sortedEvents.filter(event => {
    const [day, month, year] = event.date.split("/").map(Number);
    const eventDate = new Date(year, month - 1, day);
    return eventDate < currentDate;
  }); 

  // Select the latest 5 past events
  const RecentEvents = PastEvents.slice(0, 5);

  // Debugging logs
  console.log('Upcoming Events:', UpcomingEvents);
  console.log('Recent Events:', RecentEvents);
  console.log('Past Events:', PastEvents);

  return (
    <div>
      {UpcomingEvents.length !== 0 && (
        <section className="bg-black text-white w-full overflow-hidden">
          <div className="w-limit w-full flex gap-4 p-4">
            <div className="flex flex-col items-start font-bold py-6 pt-8">
              <h2 className="text-[12px] md:text-[20px]">Upcoming</h2>
              <h1 className="text-[18px] md:text-[36px]">Events</h1>
            </div>
            <div className="max-w-full overflow-hidden py-4">
              <SlickCarousel slides={UpcomingEvents} color={'white'}/>
            </div>
          </div>
        </section>
      )}

      {RecentEvents.length !== 0 && (
        <section className="flex p-4 gap-4 w-limit overflow-hidden bg-white">
          <div className="flex flex-col items-start font-bold py-6">
            <h2 className="text-[12px] md:text-[20px]">Recent</h2>
            <h1 className="text-[18px] md:text-[36px]">Events</h1>
          </div>
          <div className="max-w-full overflow-hidden pb-4">
            <SlickCarousel slides={RecentEvents} color={'black'}/>
          </div>
        </section>
      )}

      {Events.length !== 0 && (
        <section className="flex flex-col md:flex-row md:p-4 gap-4 w-limit overflow-hidden">
          <div className="flex md:flex-col flex-row gap-2 items-center justify-center md:justify-start md:items-start font-bold py-6 ">
            <h2 className="text-[36px] md:text-[20px]">All</h2>
            <h1 className="text-[36px]">Events</h1>
          </div>
          <div className="flex-grow w-full mx-0 md:mx-auto pastEventsGrid">
            {Events.map((event, index) => (
              <div className="mx-auto w-full" key={index}>
                <NormalCard data={event} />
              </div>
            ))}
          </div>
        </section>
      )}

      {Events.length === 0 && (
        <div className="flex justify-center items-center my-10">
          <h1 className="text-2xl font-bold">No events to show</h1>
        </div>
      )}
    </div>
  );
};

export default Event;
