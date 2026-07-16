import React, { useState, useEffect } from 'react';
import { inFront, BootCamp, Image3, Image4, Image5, Image6, Image7 } from "@/assets/images/Us";
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/config/supabase";

function Content() {
    const staticImages = [
        inFront,
        Image3,
        Image7,
        Image6,
        BootCamp,
        Image4,
        Image5,
    ];
    const [images, setImages] = useState(staticImages);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchGallery() {
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('url')
                    .eq('type', 'about');
                if (error) throw error;
                if (data && data.length > 0) {
                    setImages(data.map(item => item.url));
                }
            } catch (err) {
                console.error("Failed to load about gallery:", err);
            }
        }
        fetchGallery();
    }, []);

    const handleImageChange = () => {
        if (images.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className='flex flex-col lg:flex-row items-center justify-between w-limit gap-8 lg:gap-16 py-4'>
            {/* Interactive Image Stack Column */}
            <div className='w-full lg:w-1/2 flex items-center justify-center shrink-0 min-h-[340px]'>
                <div className="relative h-[300px] w-[300px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            className="absolute z-10 w-[280px] sm:w-[300px] h-[280px] sm:h-[300px] border border-orange-500/20 rounded-3xl overflow-hidden cursor-pointer select-none bg-white shadow-xl shadow-orange-500/5"
                            onClick={handleImageChange}
                            initial={{ rotate: 6, opacity: 0, scale: 0.95 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: -6, opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            title="Click to see next image"
                        >
                            <img
                                loading="lazy"
                                src={images[currentIndex]}
                                alt="Connect community"
                                className="absolute inset-0 object-cover w-full h-full"
                            />
                            {/* Tap Indicator Badge */}
                            {/* <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-orange-600 flex items-center gap-1.5 border border-zinc-150 shadow-sm">
                                <Sparkles className="w-3 h-3 animate-pulse" />
                                Next Image
                            </div> */}
                        </motion.div>
                    </AnimatePresence>

                    {/* Background preview card */}
                    <motion.div
                        key={(currentIndex + 1) % images.length}
                        className="absolute w-[280px] sm:w-[300px] h-[280px] sm:h-[300px] border border-zinc-200 rounded-3xl overflow-hidden bg-zinc-100 shadow-md"
                        initial={{ rotate: 0, opacity: 0 }}
                        animate={{ rotate: 6, opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <img
                            loading="lazy"
                            src={images[(currentIndex + 1) % images.length]}
                            alt="Next preview"
                            className="absolute inset-0 object-cover w-full h-full opacity-60"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Story Text Column */}
            <div className='w-full lg:w-1/2 text-left space-y-4 text-xs sm:text-sm md:text-base leading-relaxed text-zinc-600 font-light'>
                <div className="space-y-1 text-center lg:text-left mb-6">
                    <span className="text-orange-600 text-xs font-bold tracking-widest uppercase">Our Story</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">How Connect Began</h2>
                </div>
                
                <p>
                    Four years ago, in the halls of EMEA College, four passionate students—<strong className="text-zinc-900 font-semibold">Salman CC, Afeef, Aseel, and Nahyan</strong>—shared a common dream. They wanted to create something meaningful for their fellow students. Driven by their determination, they proposed developing a college software application to our principal.
                </p>
                <p>
                    Recognizing their potential, the principal entrusted them with the task. They worked tirelessly, day and night, which not only strengthened their teamwork but also provided invaluable industry experience. Their hard work paid off, as the project opened doors to internships and job opportunities for them.
                </p>
                <p>
                    Inspired by their success, Salman, Afeef, Aseel, and Nahyan envisioned a platform to offer similar opportunities to all EMEA College students. Thus, <strong className="text-orange-600 font-semibold">Connect</strong> was born—a community dedicated to bridging the gap between industry and academia.
                </p>
            </div>
        </div>
    );
}

export default Content;
