import React, { useState } from 'react';
import Icon from '@/assets/avatars/welcome.webp';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

function Welcome() {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/join');
    };

    const text = "For Students, By Students";

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const child = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <section className='relative text-center flex flex-col gap-6 py-10 md:py-16 overflow-hidden w-full'>
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className='text-center flex flex-col max-w-[600px] mx-auto'>
                <h1 className='text-[22px] sm:text-[34px] font-bold uppercase'>
                    WHERE&nbsp; <span className='text-orange-500'>STUDENTS&nbsp; </span>meet&nbsp; <span className='text-orange-500'>peers</span>&nbsp;
                    <br /><span className='text-orange-500'>purpose</span>&nbsp;and&nbsp;<span className='text-orange-500'>passion</span>&nbsp;
                </h1>

                {/* Animated Typing Text */}
                <motion.p
                    className='text-lg sm:text-xl font-semibold highlighted-text overflow-hidden inline-block'
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {text.split("").map((letter, index) => (
                        <motion.span key={index} variants={child}>
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </motion.p>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-[240px] sm:max-w-[280px] mx-auto">


                <button
                    onClick={handleClick}
                    className="w-full px-4 sm:px-6 py-2 bg-orange-600 text-white rounded-full font-bold tracking-normal transition-all hover:bg-orange-500 text-sm sm:text-[16px]"
                >
                    Register Now
                </button>

                <a
                    href="https://chat.whatsapp.com/HWUMSzHQWkyLv3VwWgnRFu"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button
                        className="w-full px-4 sm:px-6 py-1.5 border-2 border-orange-600 text-orange-600 rounded-full font-bold tracking-normal transition-all hover:bg-orange-50 hover:border-orange-500 text-sm sm:text-[16px]"
                    >
                        Join Our Community
                    </button>
                </a>
            </div>
            
            {/* Content Image Container */}
            <div className='relative mt-8 px-4 max-w-4xl mx-auto w-full group'>
                {!loaded && (
                    <div className='absolute inset-0 flex items-center justify-center bg-zinc-50/50 backdrop-blur-sm rounded-3xl min-h-[300px] z-10'>
                        <div className="w-10 h-10 border-4 border-zinc-200 border-t-orange-500 rounded-full animate-spin" />
                    </div>
                )}
                
                {/* Ambient glow behind image */}
                <div className="absolute inset-6 bg-orange-500/10 rounded-[32px] blur-2xl group-hover:bg-orange-500/15 transition-colors duration-500 pointer-events-none" />

                <div className="relative rounded-[32px] overflow-hidden transform hover:-translate-y-1 transition-transform duration-500 ">
                    <img
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        src={Icon}
                        alt='Connect Welcome Banner'
                        className='w-full h-auto object-cover rounded-[32px]'
                        onLoad={() => setLoaded(true)}
                    />
                </div>
            </div>
        </section>
    );
}

export default Welcome;
