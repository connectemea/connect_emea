import { Events } from "@/const/data/Events";
import { Normal, Special } from "./components/EventCard";
import EmblaCarousel from "./components/Carousal/EmblaCarousel";
import EmblaCarousel2 from "./components/Carousal/EmblaCarousel2";

const OPTIONS = { loop: true, align: 'start' }

const Event = () => {
  const PastEvents = Events.PastEvents;
  const RecentEvents = Events.RecentEvents;
  const UpcomingEvents = Events.UpcomingEvents;

  console.log(PastEvents, RecentEvents, UpcomingEvents)
  return (
    <div>
      <h1 className='font-bold py-10 flex justify-center text-2xl w-full space-y-2'>Event page</h1>

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
      <section className="flex p-4  gap-4 w-limit overflow-hidden">
        <div className="flex flex-col items-start font-bold py-6">
          <h2 className="text-[12px] md:text-[20px]">All</h2>
          <h1 className="text-[18px] md:text-[36px]">Events</h1>
        </div>
        <div className="flex-1 flex gap-4 items-start">
          <EmblaCarousel2 slides={PastEvents} options={OPTIONS} />
        </div>

      </section>
    </div>
  );
};
export default Event;