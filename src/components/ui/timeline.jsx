"use client";
import { useScroll, useTransform, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = (ref.current).getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto pt-10 px-4 md:px-8 lg:px-10">
        <div className="flex flex-col items-center justify-center text-center space-y-2 mb-4">
          <div className="flex items-center gap-1.5 text-orange-600 justify-center">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Journey</span>
          </div>
          <h2 className="max-w-[600px] font-black text-2xl sm:text-3xl text-center mx-auto text-zinc-950">
            Your Future, With Friends By <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Your Side</span>
          </h2>
        </div>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-24 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-25 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Timeline dot */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center border border-zinc-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] z-30">
                <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-1 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>
              <h3 className="hidden md:block text-lg md:pl-20 md:text-3xl font-extrabold text-zinc-400 group-hover:text-zinc-950 transition-colors">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl mb-3 text-left font-extrabold text-orange-600">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}

        {/* Timeline track line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-zinc-200 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-orange-500 via-amber-400 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
