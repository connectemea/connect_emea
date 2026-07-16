import {
  BootCamp,
  inFront,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
} from "@/assets/images/Us";
import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { supabase } from "@/config/supabase";

interface Point {
  title: string;
  content: JSX.Element;
}

const points: Point[] = [
  {
    title: "Beyond the Classroom",
    content: (
      <>
        True learning happens outside textbooks and lectures. While academic
        knowledge is vital,{" "}
        <span className="font-semibold text-orange-600">community and hands-on experience</span> are
        where students truly grow.
      </>
    ),
  },
  {
    title: "Bridging the Gap",
    content: (
      <>
        The traditional education system often lacks real-world application.{" "}
        <span className="font-semibold text-orange-600">Connect steps in</span> to fill that gap,
        offering opportunities for students to apply what they've learned.
      </>
    ),
  },
  {
    title: "Supportive Environment",
    content: (
      <>
        We create a space where students can{" "}
        <span className="font-semibold text-orange-600">turn theory into practice</span>, surrounded
        by like-minded peers who share their drive for success.
      </>
    ),
  },
  {
    title: "Collaborative Growth",
    content: (
      <>
        At Connect, we{" "}
        <span className="font-semibold text-orange-600">challenge, inspire, and support</span> each
        other, achieving more together than we could alone.
      </>
    ),
  },
];

const pointVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const WhyWe: React.FC = () => {
  const staticImages = [BootCamp, Image5, Image6, Image7, inFront, Image4, Image3];
  const [images, setImages] = useState<string[]>(staticImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('url')
          .eq('type', 'why-we-exist');
        if (error) throw error;
        if (data && data.length > 0) {
          setImages(data.map(item => item.url));
        }
      } catch (err) {
        console.error("Failed to load why-we-exist gallery:", err);
      }
    }
    fetchGallery();
  }, []);

  const handleImageChange = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  return (
    <section className="flex flex-col gap-6 p-4 py-8 relative z-10">
      <div className="grid md:grid-cols-2 w-full gap-12 items-center">
        
        {/* Images Stack */}
        <div className="flex items-center justify-center min-h-[340px]">
          <div className="relative h-[300px] w-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute z-10 w-[290px] sm:w-[300px] h-[290px] sm:h-[300px] border border-zinc-200/80 rounded-3xl overflow-hidden cursor-pointer select-none bg-orange-50 shadow-xl"
                onClick={handleImageChange}
                initial={{ rotate: 6, opacity: 0, scale: 0.95 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -6, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                title="Click for next preview"
              >
                <img
                  loading="lazy"
                  src={images[currentIndex]}
                  alt="Connect rotating showcase"
                  className="absolute inset-0 object-cover w-full h-full"
                />
               
              </motion.div>
            </AnimatePresence>

            {/* Background "next" preview card */}
            <motion.div
              key={(currentIndex + 1) % images.length}
              className="absolute w-[290px] sm:w-[300px] h-[290px] sm:h-[300px] border border-zinc-200 rounded-3xl overflow-hidden bg-zinc-50 shadow-md"
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 6, opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <img
                loading="lazy"
                src={images[(currentIndex + 1) % images.length]}
                alt="Next card preview"
                className="absolute inset-0 object-cover w-full h-full opacity-60"
              />
            </motion.div>
          </div>
        </div>

        {/* Text points */}
        <div className="flex flex-col gap-6 text-left">
          <div className="space-y-1">
            <span className="text-orange-600 text-xs font-bold tracking-widest uppercase">Our Purpose</span>
            <motion.h1
              className="font-extrabold text-2xl sm:text-3xl text-zinc-950"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Why We Exist
            </motion.h1>
          </div>

          <div className="space-y-6">
            {points.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-4"
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
                variants={pointVariants}
              >
                <div className="shrink-0 pt-1">
                  <div className="w-5 h-5 flex items-center justify-center bg-orange-50 border border-orange-200 rounded-full">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base sm:text-lg text-zinc-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-650 font-light leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWe;
