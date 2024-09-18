import EmblaCarousel from "../Carousal/EmblaCarousal";
import "@/assets/styles/embla.css";
import Events from "@/const/data/Events";

const OPTIONS = { loop: true };

function EventSection() {
  const sortedEvents = Events.sort((a, b) => {
    const [monthA, dayA, yearA] = a.date.split("/").map(Number);
    const [monthB, dayB, yearB] = b.date.split("/").map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA); 
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateB.getTime() - dateA.getTime(); 
  });

  console.log(sortedEvents);
  const latestEvents = sortedEvents.slice(0, 5);

  const SLIDES = latestEvents.map((event) => ({
    ...event,
  }));
  

  console.log(SLIDES);

  return (
    <div className="p-2">
      <h1 className="mx-auto font-semibold heading-text text-center my-10">
        Recent Events
      </h1>
      <div>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </div>
  );
}

export default EventSection;
