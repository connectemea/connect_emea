import Events from "@/const/data/Events";
import { Normal, Special } from "./components/EventCard";
import EmblaCarousel from "./components/Carousal/EmblaCarousel";
import EmblaCarousel2 from "./components/Carousal/EmblaCarousel2";
import NormalCard from "./components/EventCard/Normal";

const OPTIONS = { loop: false, align: 'start' }

const Event = () => {
  const currentDate = new Date();

  // Sort events by date in descending order (most recent events first)
  const sortedEvents = Events.sort((a, b) => {
    const [monthA, dayA, yearA] = a.date.split("/").map(Number);
    const [monthB, dayB, yearB] = b.date.split("/").map(Number);

    const dateA = new Date(yearA, monthA - 1, dayA); 
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateB.getTime() - dateA.getTime(); 
  });

  // Separate events into categories
  const UpcomingEvents = sortedEvents.filter(event => {
    const [month, day, year] = event.date.split("/").map(Number);
    const eventDate = new Date(year, month - 1, day);
    return eventDate >= currentDate;
  });

  const PastEvents = sortedEvents.filter(event => {
    const [month, day, year] = event.date.split("/").map(Number);
    const eventDate = new Date(year, month - 1, day);
    return eventDate < currentDate;
  });

  // Select the latest 5 past events
  const RecentEvents = PastEvents.slice(0, 5);

  // console.log('Upcoming Events:', UpcomingEvents);
  // console.log('Recent Events:', RecentEvents);
  // console.log('Past Events:', PastEvents);

  return (
    <div>
      {UpcomingEvents.length !== 0 && (
        <section className=" bg-black   text-white w-full overflow-hidden">
          <div className="w-limit w-full flex gap-4 p-4">
            <div className="flex flex-col  items-start font-bold py-6 ">
              <h2 className="text-[12px] md:text-[20px]">Upcoming</h2>
              <h1 className="text-[18px] md:text-[36px]">Events</h1>
            </div>
            <div className="flex-1 flex gap-4">
              <EmblaCarousel slides={UpcomingEvents} options={OPTIONS} />
            </div>
          </div>

        </section>
      )}
      {RecentEvents.length !== 0 && (
        <section className="flex p-4  gap-4 w-limit overflow-hidden bg-white">
          <div className="flex flex-col
         items-start font-bold py-6">
            <h2 className="text-[12px] md:text-[20px]">Recent</h2>
            <h1 className="text-[18px] md:text-[36px]">Events</h1>
          </div>
          <div className="flex-1 items-start justify-start flex gap-4 ">
            <EmblaCarousel slides={RecentEvents} options={OPTIONS} />
          </div>
        </section>
      )}
      {PastEvents.length !== 0 && (
        <section className="flex p-4  gap-4 w-limit overflow-hidden">
          <div className="flex flex-col items-start font-bold py-6">
            <h2 className="text-[12px] md:text-[20px]">All</h2>
            <h1 className="text-[18px] md:text-[36px]">Events</h1>
          </div>
          {/* <div className="flex-1 flex gap-4 items-start">
          <EmblaCarousel2 slides={PastEvents} options={OPTIONS} />
        </div> */}

          <div className="grid flex-gorw w-full mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {PastEvents.map((event, index) => (
              <div className="mx-auto" key={index}>
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