import { Lightbulb, Users, Code, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Card {
  title: string;
  content: string;
  icon: ReactNode;
}

function About() {
  const cards: Card[] = [
    {
      title: "Involve",
      content:
        "Connect is a place for everyone. A place where one could involve and evolve the most. Be a part of our intriguing events like Untold Stories, Let's Chill and make the most out of it.",
      icon: (
        <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl border border-orange-100 mb-4 inline-block">
          <Users className="w-6 h-6" />
        </div>
      ),
    },
    {
      title: "Interact",
      content:
        "An interactive setting where each one of you could connect with folks and mentors having a remarkable mindset. Your involvement and dedication to the community can even get you an internship opportunity.",
      icon: (
        <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl border border-orange-100 mb-4 inline-block">
          <Lightbulb className="w-6 h-6" />
        </div>
      ),
    },
    {
      title: "Innovate",
      content:
        "A place brimming with possibilities for innovation and astonishing creations. A perfect spot to display your work. Here you always advance and invent yourself!",
      icon: (
        <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl border border-orange-100 mb-4 inline-block">
          <Code className="w-6 h-6" />
        </div>
      ),
    },
  ];
  
  const isMobile = window.innerWidth < 768;
  return (
    <div className="space-y-8 py-8 relative z-10 w-full">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center space-y-2 max-w-2xl mx-auto px-4"
      >
        {/* <div className="flex items-center gap-1.5 text-orange-600 justify-center">
          <Compass className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Get Involved</span>
        </div> */}
        <h1 className="font-black text-2xl sm:text-3xl text-zinc-950">
          One Step Away From Joining <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Our Community</span>
        </h1>
        <p className="text-zinc-550 text-xs sm:text-sm font-light leading-relaxed">
          At Connect, your journey isn’t just about your career, it’s about growing together as a community. Join us and be part of something bigger, where students unite to create opportunities, share knowledge, and pursue their dreams together.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {cards.map((cardItem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: index * 0.1,
            }}
            className="border border-zinc-200/80 rounded-3xl p-6 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.04)] hover:border-orange-200/60 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between min-h-[250px]"
          >
            <div>
              {cardItem.icon}
              <h3 className="font-bold text-lg text-zinc-950 mb-2">
                {cardItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-550 font-light leading-relaxed">
                {cardItem.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default About;
