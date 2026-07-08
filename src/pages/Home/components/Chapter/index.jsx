import React from "react";
import { motion } from "framer-motion";
import { EventsBG, PlacementBG, MembersBG } from "@/assets/avatars";
import { CheckCircle2, Sparkles } from "lucide-react";

const points = [
  {
    title: "Work on Real Projects",
    content: (
      <>
        Get hands-on experience with{" "}
        <span className="font-bold text-orange-600">
          collaborative projects
        </span>{" "}
        that solve real-world problems. Perfect for builders who want to make an
        impact now.
      </>
    ),
  },
  {
    title: "Free Skill Development",
    content: (
      <>
        Access a wide range of resources to{" "}
        <span className="font-bold text-orange-600">
          build new skills
        </span>{" "}
        across different fields—completely free. Because your passion shouldn’t
        come with a price tag.
      </>
    ),
  },
  {
    title: "Network with Peers",
    content: (
      <>
        <span className="font-bold text-orange-600">Connect</span> with
        supportive, like-minded friends who share your drive and ambition. Build
        a community that fuels your passion.
      </>
    ),
  },
  {
    title: "Free Mentorship",
    content: (
      <>
        Learn directly from{" "}
        <span className="font-bold text-orange-600">industry pros</span> who
        have been where you want to go. Gain insights, advice, and guidance
        without spending a dime.
      </>
    ),
  },
  {
    title: "Leadership Opportunities",
    content: (
      <>
        Step up and take on{" "}
        <span className="font-bold text-orange-600">
          leadership roles
        </span>{" "}
        to sharpen your management and organizational skills. Show the world
        what you’re capable of.
      </>
    ),
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const pointVariants = {
  hidden: { opacity: 0, x: -15 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const isMobile = window.innerWidth < 768;

const Chapter = () => {
  return (
    <section className="flex flex-col gap-6 p-4 py-10 relative z-10">
      
      {/* Title */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 mb-4">
        <div className="flex items-center gap-1.5 text-orange-600">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Benefits</span>
        </div>
        <motion.h1
          className="font-black text-2xl sm:text-3xl text-zinc-950"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Why You Should Join <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Connect</span>
        </motion.h1>
      </div>

      <div className="flex flex-col-reverse md:grid md:grid-cols-5 gap-12 md:gap-8 mx-auto items-center w-full max-w-5xl">
        {/* Left column: List points */}
        <motion.div
          className="col-span-3 space-y-6 w-full text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
        >
          <div className="space-y-6">
            {points.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-3.5"
                custom={index}
                variants={pointVariants}
              >
                <div className="shrink-0 pt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-orange-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base sm:text-lg text-zinc-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side stats bubbles */}
        <motion.div
          className="col-span-2 relative flex h-full items-center justify-center select-none w-full pb-8 md:pb-0"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Stat Pillars Grid container */}
          <div className="relative flex items-end gap-5 h-64">
            
            {/* Bubble 1: Members */}
            <motion.div
              className="h-56 w-32 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden relative shadow-md border border-white/50 group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <img
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                src={MembersBG}
                alt="Members"
                className="absolute inset-0 object-cover w-full h-full opacity-30 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/20 to-transparent" />
              <div className="relative text-center p-2 z-10">
                <h2 className="text-2xl font-black text-orange-600">100+</h2>
                <p className="font-bold text-xs uppercase text-zinc-700 tracking-wider">Members</p>
              </div>
            </motion.div>

            {/* Bubble 2: Events */}
            <motion.div
              className="h-44 w-28 bg-amber-50 rounded-full flex items-center justify-center overflow-hidden relative shadow-sm border border-white/50 group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <img
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                src={EventsBG}
                alt="Events"
                className="absolute inset-0 object-cover w-full h-full opacity-20 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950/10 to-transparent" />
              <div className="relative text-center p-2 z-10">
                <h2 className="text-2xl font-black text-amber-600">40+</h2>
                <p className="font-bold text-xs uppercase text-zinc-750 tracking-wider">Events</p>
              </div>
            </motion.div>

            {/* Bubble 3: Placements */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="h-44 w-28 bg-emerald-50 rounded-full flex items-center justify-center absolute -bottom-8 left-16 overflow-hidden shadow-md border border-white/50 group"
            >
              <img
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                src={PlacementBG}
                alt="Placements"
                className="absolute inset-0 object-cover w-full h-full opacity-35 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/15 to-transparent" />
              <div className="relative text-center p-2 z-10">
                <h2 className="text-2xl font-black text-emerald-600">20+</h2>
                <p className="font-bold text-[10px] uppercase text-zinc-750 tracking-wider">Placements</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Chapter;
