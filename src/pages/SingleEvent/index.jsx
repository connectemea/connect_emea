import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2, Calendar, Clock, MapPin, ArrowLeft, ExternalLink } from "lucide-react";
import Events from "@/const/data/Events.tsx";
import Tab from "./components/tabs";
import { getEventCategory } from "../Event/components/eventUtils";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-zinc-50/50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-zinc-200" />
        <div className="absolute inset-0 rounded-full border-4 border-t-orange-500 animate-spin" />
      </div>
    </div>
  );
};

function SingleEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const eventId = Number(id);
  const event = Events.find((e) => e.id === eventId);

  // Helper to save blob as file
  const saveBlobAsFile = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Share poster with image and website URL
  const handleShare = async () => {
    const poster = document.getElementById("poster");

    if (!poster || !poster.src) {
      console.error("Poster image not found or missing source");
      return;
    }

    try {
      const response = await fetch(poster.src, { mode: "cors" });
      const blob = await response.blob();

      const fileName = `${event?.title || "event"}-poster.png`;
      const file = new File([blob], fileName, { type: blob.type });

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        try {
          await navigator.share({
            title: event?.title || "Exciting Event",
            text: `Check out this amazing event: ${event?.title}. Visit our website for more events.`,
            url: window.location.href,
            files: [file],
          });
        } catch (err) {
          console.warn("Share failed, falling back to download:", err);
          saveBlobAsFile(blob, fileName);
          alert(`Poster downloaded! Share link: ${window.location.href}`);
        }
      } else {
        saveBlobAsFile(blob, fileName);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          alert("Poster downloaded! Event URL copied to clipboard.");
        } else {
          alert(`Poster downloaded! Share link: ${window.location.href}`);
        }
      }
    } catch (error) {
      console.error("Error sharing image:", error);
      if (navigator.share) {
        await navigator.share({
          title: event?.title || "Exciting Event",
          text: `Check out this event: ${event?.title}`,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        alert("Event link copied to clipboard!");
      }
    }
  };

  if (loading) return <Spinner />;

  if (!event) {
    return (
      <div className="min-h-[70vh] bg-zinc-50/50 text-zinc-800 flex flex-col items-center justify-center p-4">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-950">Event Not Found</h1>
          <p className="text-zinc-500 font-light leading-relaxed">
            We couldn't find the event you were looking for. It may have been removed or the link might be incorrect.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-full transition-all"
          >
            Back to Events Catalog
          </button>
        </div>
      </div>
    );
  }

  const categoryInfo = getEventCategory(event);

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 py-10 relative overflow-hidden">
      {/* Decorative Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-limit px-4 relative z-10 space-y-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </Link>
        </div>

        {/* Event Detail Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Event Poster */}
          <motion.div
            className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-3xl overflow-hidden bg-white border border-zinc-200/80 p-3 shadow-md relative group">
              <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-zinc-50">
                <img
                  id="poster"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  src={event.image}
                  alt={event.title}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Details */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${categoryInfo.bg}`}>
                  {categoryInfo.name}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                  Event Details
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-zinc-950">
                {event.title}
              </h1>

              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
                {event.big_description || event.description}
              </p>
            </div>

            {/* Quick Metadata Block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-zinc-200/80 rounded-3xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-400">Date</p>
                  <p className="text-xs sm:text-sm font-bold text-zinc-800">{event.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-400">Time</p>
                  <p className="text-xs sm:text-sm font-bold text-zinc-800">{event.time || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-400">Location</p>
                  <p className="text-xs sm:text-sm font-bold text-zinc-800 truncate max-w-[150px]">{event.location || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* CTA Panel */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {event.link ? (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  Join Event / Register
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="flex-1 px-6 py-3.5 bg-zinc-100 border border-zinc-200 rounded-2xl text-center text-xs text-zinc-400 font-medium">
                  Registration Closed
                </div>
              )}

              <button
                onClick={handleShare}
                className="px-6 py-3.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 font-bold rounded-2xl transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Event
              </button>
            </div>

          </motion.div>

        </div>

        {/* Tab section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-6"
        >
          <Tab about={event.about} />
        </motion.div>

      </div>
    </div>
  );
}

export default SingleEvent;
