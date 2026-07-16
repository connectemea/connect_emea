import React, { useState, useMemo, useEffect } from "react";
import staticEvents from "@/const/data/Events.tsx";
import NormalCard from "./components/EventCard/Normal";
import SpecialCard from "./components/EventCard/Special";
import SimpleGrid from "./components/Carousal/SimpleGrid";
import SlickCarousel from "./components/Carousal/SlickCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, MapPin, X, ArrowRight, ExternalLink, SlidersHorizontal, Layers } from "lucide-react";
import { parseDate, formatDate, getEventCategory } from "./components/eventUtils";
import { supabase } from "@/config/supabase";
import { resolveAsset } from "@/utils/resolveAsset";

const EVENTS_PER_PAGE = 12;

function Event() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All"); // All, Upcoming, Past
  const [visibleCount, setVisibleCount] = useState(EVENTS_PER_PAGE);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dbEvents, setDbEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
          setDbEvents(mapped);
        } else {
          setDbEvents(staticEvents);
        }
      } catch (err) {
        console.error("Failed to load events from Supabase:", err);
        setDbEvents(staticEvents);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  // Normalize dates and filter events
  const processedEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return dbEvents.map((event) => {
      const parsedDate = parseDate(event.date);
      const isUpcoming = parsedDate >= today;
      const categoryInfo = getEventCategory(event);
      return {
        ...event,
        parsedDate,
        isUpcoming,
        categoryName: categoryInfo.name,
        categoryBg: categoryInfo.bg,
      };
    }).sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime()); // Sort newest first
  }, [dbEvents]);

  // Filter logic
  const filteredEvents = useMemo(() => {
    return processedEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || event.categoryName === selectedCategory;

      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Upcoming" && event.isUpcoming) ||
        (selectedStatus === "Past" && !event.isUpcoming);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [processedEvents, searchQuery, selectedCategory, selectedStatus]);

  // Spotlight Event: Next upcoming event, or most recent past event if none are upcoming
  const spotlightEvent = useMemo(() => {
    const upcoming = processedEvents
      .filter((e) => e.isUpcoming)
      .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime()); // nearest upcoming

    if (upcoming.length > 0) return upcoming[0];

    const past = processedEvents.filter((e) => !e.isUpcoming);
    return past.length > 0 ? past[0] : null; // latest past event
  }, [processedEvents]);

  // Get dynamic counts for categories
  const categoryCounts = useMemo(() => {
    const counts = { All: processedEvents.length };
    processedEvents.forEach((event) => {
      counts[event.categoryName] = (counts[event.categoryName] || 0) + 1;
    });
    return counts;
  }, [processedEvents]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + EVENTS_PER_PAGE);
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const categories = ["All", "Workshop", "Talk / Panel", "Hackathon / Tech", "Career / Hiring", "Community"];

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 pb-16 relative overflow-hidden">
      {/* Background Graphic Patterns & Accent Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-b from-orange-50/40 via-white to-transparent py-16 border-b border-zinc-100">
        <div className="w-limit px-4 text-center space-y-6">
          {/* <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-xs font-bold text-orange-600">
            <Layers className="w-3.5 h-3.5" />
            Connect  Hub
          </div> */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-zinc-950">
            Our{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-zinc-650 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Explore workshops, tech hackathons, and interactive panel talks engineered to bridge the gap between academic theories and tech careers.
          </p>
        </div>
      </div>

      <div className="w-limit px-4 mt-10 space-y-10 relative z-10">
        
        {/* Spotlight Featured Card */}
        {spotlightEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white border border-zinc-200/80 rounded-3xl p-5 sm:p-6 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-all duration-300 relative overflow-hidden"
          >
            {/* Corner Spotlight Badge */}
            <div className="absolute top-4 right-4 bg-orange-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm z-10">
              Spotlight
            </div>

            {/* Spotlight Card Poster */}
            <div className="w-full lg:w-[28%] aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-50 shrink-0 shadow-inner">
              <img
                src={spotlightEvent.image}
                alt={spotlightEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Spotlight Card Info */}
            <div className="w-full lg:w-[72%] flex flex-col justify-between h-full space-y-4 py-1">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${spotlightEvent.categoryBg}`}>
                    {spotlightEvent.categoryName}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-zinc-500 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-full">
                    {spotlightEvent.isUpcoming ? "Upcoming Event" : "Concluded Event"}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 leading-tight">
                  {spotlightEvent.title}
                </h2>
                <p className="text-zinc-650 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                  {spotlightEvent.big_description || spotlightEvent.description}
                </p>
              </div>

              {/* Metadata Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-y border-zinc-100">
                <div className="flex items-center gap-2 text-xs text-zinc-600 font-semibold">
                  <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{formatDate(spotlightEvent.date)} {spotlightEvent.time && `at ${spotlightEvent.time}`}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600 truncate font-semibold">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="truncate">{spotlightEvent.location || "Online"}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => handleOpenModal(spotlightEvent)}
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl text-xs transition-all shadow-md shadow-orange-500/10 flex items-center justify-center gap-2"
                >
                  Quick Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {spotlightEvent.link && (
                  <a
                    href={spotlightEvent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold rounded-2xl text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    Join Register
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Controls Row */}
        <div className="flex flex-col gap-4 bg-white border border-zinc-200/80 rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          {/* Top Row: Search and Timeline Tabs */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input Container */}
            <div className="relative w-full md:flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events by title, topics, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200/60 rounded-2xl text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Timeline Tabs */}
            <div className="flex bg-zinc-100/85 border border-zinc-200/40 p-1 rounded-2xl shrink-0 w-full md:w-auto">
              {["All", "Upcoming", "Past"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedStatus(tab)}
                  className={`flex-1 md:flex-initial px-5 py-2 rounded-xl text-xs font-bold transition-all duration-250 cursor-pointer ${
                    selectedStatus === tab
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Category Pill Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-zinc-100">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 shrink-0 hidden sm:block mr-2" />
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              {categories.map((category) => {
                const count = categoryCounts[category] || 0;
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/10"
                        : "bg-zinc-50 border border-zinc-200/60 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    {category} <span className={`text-[10px] ml-1 opacity-70`}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Section Header */}
        <div className="flex items-center justify-between pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950">
            {selectedStatus} {selectedCategory === "All" ? "Events" : selectedCategory} Catalog
          </h2>
          <span className="text-xs text-zinc-500">
            Showing {Math.min(filteredEvents.length, visibleCount)} of {filteredEvents.length} events
          </span>
        </div>

        {/* Unified Event Cards Grid */}
        {filteredEvents.length > 0 ? (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredEvents.slice(0, visibleCount).map((event) => (
                <NormalCard
                  key={event.id}
                  data={event}
                  onClick={() => handleOpenModal(event)}
                  layoutId={`event-card-${event.id}`}
                />
              ))}
            </div>

            {/* Load More Pagination Trigger */}
            {filteredEvents.length > visibleCount && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-white border border-zinc-200/80 hover:bg-zinc-50 text-zinc-700 hover:text-orange-600 font-bold rounded-2xl text-xs transition-all shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
                >
                  Load More Events
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-zinc-200/60 rounded-3xl space-y-4">
            <Layers className="w-12 h-12 text-zinc-300 mx-auto" />
            <h3 className="text-lg font-bold text-zinc-800">No Events Found</h3>
            <p className="text-zinc-500 text-xs sm:text-sm font-light max-w-xs mx-auto leading-relaxed">
              No matching events found for the query or filter combination. Adjust filters or search criteria and try again.
            </p>
          </div>
        )}
      </div>

      {/* Glassmorphic Event Preview Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-200 text-zinc-900 rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row gap-6 p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition-colors z-30"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Image Poster */}
              <div className="w-full md:w-[45%] aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-50 shrink-0">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Column: Key Details */}
              <div className="flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${selectedEvent.categoryBg}`}>
                      {selectedEvent.categoryName}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                      {selectedEvent.isUpcoming ? "Upcoming" : "Concluded"}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-zinc-950 leading-tight">
                    {selectedEvent.title}
                  </h3>

                  <p className="text-zinc-650 text-xs sm:text-sm font-light leading-relaxed">
                    {selectedEvent.big_description || selectedEvent.description}
                  </p>
                </div>

                {/* Info row */}
                <div className="space-y-3 pt-4 border-t border-zinc-100">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-700 font-semibold">
                    <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{formatDate(selectedEvent.date)} {selectedEvent.time && `| ${selectedEvent.time}`}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-700 font-semibold truncate">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                    <span className="truncate">{selectedEvent.location || "Online"}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`/event/${selectedEvent.id}`}
                    className="flex-1 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/10"
                  >
                    Open Single Event Page
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  {selectedEvent.link && (
                    <a
                      href={selectedEvent.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold rounded-2xl text-xs text-center transition-all flex items-center justify-center gap-1.5"
                    >
                      Register Now
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Event;
