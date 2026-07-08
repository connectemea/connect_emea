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

            <div className='text-center flex flex-col max-w-2xl mx-auto space-y-4 px-4 relative z-10'>
                {/* Tech Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-xs font-bold text-orange-600 mx-auto">
                    <Sparkles className="w-3.5 h-3.5" />
                    EMEA College Campus Initiative
                </div>

                <h1 className='text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-zinc-950 uppercase'>
                    WHERE&nbsp; <span className='text-orange-500'>STUDENTS&nbsp; </span>MEET&nbsp; <span className='text-orange-500'>PEERS</span>,
                    <br />
                    <span className='text-orange-500'>PURPOSE</span>&nbsp;AND&nbsp;<span className='text-orange-500'>PASSION</span>
                </h1>

                {/* Animated Typing Text */}
                <motion.p
                    className='text-base sm:text-lg md:text-xl font-bold text-zinc-700 tracking-wide inline-block'
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[280px] sm:max-w-md mx-auto px-4 relative z-10">
                <button
                    onClick={handleClick}
                    className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/10 hover:shadow-orange-500/25"
                >
                    Register Now
                    <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <a
                    href="https://chat.whatsapp.com/HWUMSzHQWkyLv3VwWgnRFu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                >
                    <button
                        className="w-full px-6 py-3 border border-orange-500 text-orange-600 rounded-2xl font-bold transition-all duration-200 hover:bg-orange-50 text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                        <MessageCircle className="w-4 h-4 shrink-0" />
                        Join Community
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

                <div className="relative rounded-[32px] overflow-hidden transform hover:-translate-y-1 transition-transform duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.035)]">
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
