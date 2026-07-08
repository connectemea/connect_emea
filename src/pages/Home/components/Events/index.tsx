import EmblaCarousel from "../Carousal/EmblaCarousal";
import "@/assets/styles/embla.css";
import Events from "@/const/data/Events";
import { parseDate } from "@/pages/Event/components/eventUtils";

const OPTIONS = { loop: true };

function EventSection() {
  // Sort events newest first using the robust parseDate utility
  const sortedEvents = [...Events].sort((a, b) => {
    return parseDate(b.date).getTime() - parseDate(a.date).getTime();
  });

  const latestEvents = sortedEvents.slice(0, 5);

  const SLIDES = [...latestEvents, ...latestEvents, ...latestEvents].map(
    (event, index) => ({
      ...event,
      _id: `${event.id}-${index}`,
    })
  );

  return (
    <div className="p-2 relative z-10">
      <h1 className="mx-auto font-black text-center my-10 text-[28px] sm:text-[38px] text-zinc-950">
        Recent{" "}
        <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
          Events
        </span>
      </h1>
      <div>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </div>
  );
}

export default EventSection;
