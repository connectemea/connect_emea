import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import { formatDate, getEventCategory } from '../../eventUtils';

function SpecialCard({ data, onClick }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/event/' + data.id);
    };

    const categoryInfo = getEventCategory(data);

    return (
        <motion.div 
            onClick={onClick}
            className="group flex flex-col h-[380px] w-full max-w-[280px] rounded-3xl overflow-hidden border border-zinc-200/80 bg-white text-zinc-900 transition-all duration-300 cursor-pointer mx-auto shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] hover:shadow-orange-500/5 hover:border-orange-200"
        >
            {/* Image Container */}
            <div className="relative h-[180px] w-full overflow-hidden bg-zinc-50">
                <motion.img
                    loading="lazy"
                    src={data.image}
                    alt={data.title}
                    draggable={false}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Floating Category Pill */}
                <div className="absolute top-3 left-3 z-10">
                    <span className={`px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-full shadow-sm ${categoryInfo.bg}`}>
                        {categoryInfo.name}
                    </span>
                </div>
            </div>

            {/* Card Body */}
            <div className="flex flex-col flex-grow p-4 justify-between">
                <div>
                    {/* Date/Time Row */}
                    <div className="flex items-center gap-1.5 text-[10px] mb-2 font-semibold text-zinc-500">
                        <Calendar className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span>{formatDate(data.date)}</span>
                        <span className="opacity-30">•</span>
                        <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="truncate">{data.time}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm sm:text-base leading-snug line-clamp-2 text-zinc-950 group-hover:text-orange-500 transition-colors duration-300">
                        {data.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-[11px] line-clamp-2 mt-2 leading-relaxed text-zinc-500">
                        {data.description}
                    </p>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                    <span className="text-[11px] font-bold text-orange-500 group-hover:translate-x-1 transition-transform">
                        Learn More
                    </span>
                    <button 
                        onClick={handleClick}
                        className="p-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200"
                        title="Open Event Details Page"
                    >
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default SpecialCard;