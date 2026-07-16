import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Handshake,
  Compass,
  Wrench,
  BookOpen,
  Gem,
  Crown,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const journeySteps = [
  {
    title: "Welcome",
    icon: Handshake,
    accent: "from-orange-500 to-amber-400",
    bgAccent: "bg-orange-50",
    borderAccent: "border-orange-200/60",
    iconColor: "text-orange-600",
    description:
      "New members are welcomed into our student community, guided through onboarding, and begin forming connections with peers across diverse departments.",
    highlights: [
      "Join orientation sessions",
      "Meet your peer mentors",
      "Discover your interests",
    ],
  },
  {
    title: "Explore",
    icon: Compass,
    accent: "from-amber-500 to-yellow-400",
    bgAccent: "bg-amber-50",
    borderAccent: "border-amber-200/60",
    iconColor: "text-amber-600",
    description:
      "Students discover clubs, hackathons, events, and workshops that align with their passions — from technology to arts and entrepreneurship.",
    highlights: [
      "Browse upcoming events",
      "Join interest groups",
      "Attend skill workshops",
    ],
  },
  {
    title: "Build",
    icon: Wrench,
    accent: "from-orange-600 to-orange-400",
    bgAccent: "bg-orange-50",
    borderAccent: "border-orange-200/60",
    iconColor: "text-orange-600",
    description:
      "Members collaborate on projects, competitions, and research, strengthening both technical expertise and leadership skills.",
    highlights: [
      "Team up for hackathons",
      "Start real-world projects",
      "Grow your skill set",
    ],
  },
  {
    title: "Learn",
    icon: BookOpen,
    accent: "from-amber-600 to-amber-400",
    bgAccent: "bg-amber-50",
    borderAccent: "border-amber-200/60",
    iconColor: "text-amber-600",
    description:
      "Through workshops, peer-to-peer sessions, and mentorship, students continuously expand their academic knowledge and professional growth.",
    highlights: [
      "Attend expert talks",
      "Practice with peers",
      "Get personalized feedback",
    ],
  },
  {
    title: "Refine",
    icon: Gem,
    accent: "from-orange-500 to-rose-400",
    bgAccent: "bg-orange-50",
    borderAccent: "border-orange-200/60",
    iconColor: "text-orange-500",
    description:
      "Students polish their portfolios and sharpen their skills by engaging in meaningful activities that set them apart.",
    highlights: [
      "Contributing to open-source",
      "Presenting research papers",
      "Attending mock interviews",
      "Hosting community events",
    ],
  },
  {
    title: "Lead",
    icon: Crown,
    accent: "from-amber-500 to-orange-500",
    bgAccent: "bg-amber-50",
    borderAccent: "border-amber-200/60",
    iconColor: "text-amber-600",
    description:
      "Senior members step into leadership roles, mentoring juniors, organizing campus-wide events, and driving initiatives that shape the student community.",
    highlights: [
      "Mentor new members",
      "Organize major events",
      "Drive community vision",
    ],
  },
  {
    title: "Graduate",
    icon: GraduationCap,
    accent: "from-orange-600 to-amber-500",
    bgAccent: "bg-orange-50",
    borderAccent: "border-orange-200/60",
    iconColor: "text-orange-600",
    description:
      "Students graduate not only with degrees, but also with lifelong networks, real-world experiences, and unforgettable community-driven memories.",
    highlights: [
      "Strong alumni network",
      "Industry-ready portfolio",
      "Lifelong friendships",
    ],
  },
];

export function TimelineDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const current = journeySteps[activeStep];
  const Icon = current.icon;
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  return (
    <section className="relative z-10 py-4">
      {/* Section Heading */}
      <motion.div
        className="text-center space-y-2 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-orange-600 text-xs font-bold tracking-widest uppercase">
          The Journey
        </span>
        <h2 className="font-black text-2xl sm:text-3xl text-zinc-950 max-w-xl mx-auto">
          Your Future, With Friends By{" "}
          <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Your Side
          </span>
        </h2>
      </motion.div>

      {/* Step Navigation — Horizontal Connected Pills */}
      <motion.div
        className="relative max-w-4xl mx-auto mb-10 px-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Desktop: full horizontal stepper */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Connecting line behind dots */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-zinc-200/80 -translate-y-1/2 z-0" />
          {/* Active progress line */}
          <motion.div
            className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-400 -translate-y-1/2 z-[1]"
            initial={false}
            animate={{
              width: `${(activeStep / (journeySteps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />

          {journeySteps.map((step, i) => {
            const StepIcon = step.icon;
            const isActive = i === activeStep;
            const isPast = i < activeStep;
            return (
              <button
                key={step.title}
                onClick={() => setActiveStep(i)}
                className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer bg-transparent border-none outline-none"
                aria-label={`Step ${i + 1}: ${step.title}`}
              >
                <motion.div
                  className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-orange-500 to-amber-400 border-orange-400 shadow-lg shadow-orange-500/20"
                      : isPast
                      ? "bg-orange-100 border-orange-300"
                      : "bg-white border-zinc-200 group-hover:border-orange-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPast && !isActive ? (
                    <CheckCircle2 className="w-5 h-5 text-orange-500" />
                  ) : (
                    <StepIcon
                      className={`w-5 h-5 ${
                        isActive ? "text-white" : "text-zinc-400 group-hover:text-orange-500"
                      } transition-colors duration-300`}
                    />
                  )}
                </motion.div>
                <span
                  className={`text-[11px] font-bold tracking-wide transition-colors duration-300 ${
                    isActive
                      ? "text-orange-600"
                      : isPast
                      ? "text-orange-400"
                      : "text-zinc-400 group-hover:text-zinc-600"
                  }`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile: Snake/zigzag grid — all steps visible */}
        <div className="flex md:hidden flex-col items-center gap-0">
          {/* Row 1: Welcome → Explore → Build */}
          <div className="grid grid-cols-3 gap-3 w-full">
            {journeySteps.slice(0, 3).map((step, i) => {
              const StepIcon = step.icon;
              const isActive = i === activeStep;
              const isPast = i < activeStep;
              return (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(i)}
                  className={`relative flex flex-col items-center gap-1.5 py-2.5 rounded-2xl text-[10px] font-bold transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-br from-orange-500 to-amber-400 text-white border-orange-400 shadow-lg shadow-orange-500/20 scale-[1.03]"
                      : isPast
                      ? "bg-orange-50 text-orange-500 border-orange-200/60"
                      : "bg-white text-zinc-400 border-zinc-200 hover:border-orange-300 hover:text-orange-500"
                  }`}
                >
                  {isPast && !isActive ? (
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  ) : (
                    <StepIcon className="w-4.5 h-4.5" />
                  )}
                  {step.title}
                </button>
              );
            })}
          </div>

          {/* Connector: down-right to down-left turn */}
          <div className="w-full flex justify-end pr-[16.67%] py-0.5">
            <div className="w-[2px] h-4 bg-gradient-to-b from-orange-300 to-amber-300 rounded-full" />
          </div>

          {/* Row 2: Lead ← Refine ← Learn  (reversed so visual order is Learn · Refine · Lead reading R→L) */}
          <div className="grid grid-cols-3 gap-3 w-full">
            {[journeySteps[5], journeySteps[4], journeySteps[3]].map((step) => {
              const realIndex = journeySteps.indexOf(step);
              const StepIcon = step.icon;
              const isActive = realIndex === activeStep;
              const isPast = realIndex < activeStep;
              return (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(realIndex)}
                  className={`relative flex flex-col items-center gap-1.5 py-2.5 rounded-2xl text-[10px] font-bold transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-br from-orange-500 to-amber-400 text-white border-orange-400 shadow-lg shadow-orange-500/20 scale-[1.03]"
                      : isPast
                      ? "bg-orange-50 text-orange-500 border-orange-200/60"
                      : "bg-white text-zinc-400 border-zinc-200 hover:border-orange-300 hover:text-orange-500"
                  }`}
                >
                  {isPast && !isActive ? (
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  ) : (
                    <StepIcon className="w-4.5 h-4.5" />
                  )}
                  {step.title}
                </button>
              );
            })}
          </div>

          {/* Connector: down from left side */}
          <div className="w-full flex justify-start pl-[16.67%] py-0.5">
            <div className="w-[2px] h-4 bg-gradient-to-b from-amber-300 to-orange-300 rounded-full" />
          </div>

          {/* Row 3: Graduate (aligned left) */}
          <div className="grid grid-cols-3 gap-3 w-full">
            {(() => {
              const step = journeySteps[6];
              const StepIcon = step.icon;
              const isActive = 6 === activeStep;
              const isPast = 6 < activeStep;
              return (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(6)}
                  className={`relative flex flex-col items-center gap-1.5 py-2.5 rounded-2xl text-[10px] font-bold transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-br from-orange-500 to-amber-400 text-white border-orange-400 shadow-lg shadow-orange-500/20 scale-[1.03]"
                      : isPast
                      ? "bg-orange-50 text-orange-500 border-orange-200/60"
                      : "bg-white text-zinc-400 border-zinc-200 hover:border-orange-300 hover:text-orange-500"
                  }`}
                >
                  {isPast && !isActive ? (
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  ) : (
                    <StepIcon className="w-4.5 h-4.5" />
                  )}
                  {step.title}
                </button>
              );
            })()}
          </div>
        </div>
      </motion.div>

      {/* Content Panel */}
      <div className="max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`relative overflow-hidden rounded-3xl border ${current.borderAccent} bg-white shadow-[0_4px_24px_rgba(0,0,0,0.025)]`}
          >
            {/* Decorative gradient orb */}
            <div
              className={`absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br ${current.accent} rounded-full opacity-[0.06] blur-2xl pointer-events-none`}
            />
            <div
              className={`absolute -bottom-12 -left-12 w-36 h-36 bg-gradient-to-tr ${current.accent} rounded-full opacity-[0.04] blur-2xl pointer-events-none`}
            />

            <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                {/* Icon + Step Number */}
                <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-3 shrink-0">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${current.accent} flex items-center justify-center shadow-lg`}
                    style={{
                      boxShadow: "0 8px 24px rgba(234,88,12,0.15)",
                    }}
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="flex md:flex-col items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Step
                    </span>
                    <span className="text-lg font-black text-zinc-300">
                      {String(activeStep + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900">
                      {current.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-550 font-light leading-relaxed max-w-lg">
                      {current.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {current.highlights.map((h, i) => (
                      <motion.span
                        key={h}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${current.bgAccent} ${current.iconColor} border ${current.borderAccent}`}
                      >
                        {h}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-zinc-100">
                <button
                  onClick={() =>
                    setActiveStep((p) => Math.max(0, p - 1))
                  }
                  disabled={activeStep === 0}
                  className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {/* Step dots */}
                <div className="flex gap-1.5">
                  {journeySteps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`rounded-full transition-all duration-300 cursor-pointer border-none outline-none ${
                        i === activeStep
                          ? "w-6 h-2 bg-gradient-to-r from-orange-500 to-amber-400"
                          : "w-2 h-2 bg-zinc-200 hover:bg-orange-300"
                      }`}
                      aria-label={`Go to step ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setActiveStep((p) =>
                      Math.min(journeySteps.length - 1, p + 1)
                    )
                  }
                  disabled={activeStep === journeySteps.length - 1}
                  className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
