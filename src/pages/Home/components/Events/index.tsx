import { useState, useEffect } from "react";
import EmblaCarousel from "../Carousal/EmblaCarousal";
import "@/assets/styles/embla.css";
import staticEvents from "@/const/data/Events";
import { parseDate } from "@/pages/Event/components/eventUtils";
import { supabase } from "@/config/supabase";
import { resolveAsset } from "@/utils/resolveAsset";

const OPTIONS = { loop: true };

function EventSection() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('status', 'published')
          .order('date', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          const mapped = data.map(item => ({
            ...item,
            image: resolveAsset(item.thumbnail || item.image)
          }));
          setEvents(mapped);
        } else {
          setEvents(staticEvents);
        }
      } catch (err) {
        console.error("Failed to load events from Supabase:", err);
        setEvents(staticEvents);
      }
    }
    loadEvents();
  }, []);

  // Sort events newest first using the robust parseDate utility
  const sortedEvents = [...events].sort((a, b) => {
    return parseDate(b.date).getTime() - parseDate(a.date).getTime();
  });

  const latestEvents = sortedEvents.slice(0, 5);

  const SLIDES = latestEvents.length > 0 
    ? [...latestEvents, ...latestEvents, ...latestEvents].map(
        (event, index) => ({
          ...event,
          _id: `${event.id}-${index}`,
        })
      )
    : [];

  return (
    <div className="p-2 relative z-10">
      <h1 className="mx-auto font-black text-center my-10 text-[28px] sm:text-[38px] text-zinc-950">
        Recent{" "}
        <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
          Events
        </span>
      </h1>
      <div>
        {SLIDES.length > 0 && <EmblaCarousel slides={SLIDES} options={OPTIONS} />}
      </div>
    </div>
  );
}

export default EventSection;
