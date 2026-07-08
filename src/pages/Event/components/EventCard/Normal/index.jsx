import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import { getEventCategory } from '../../eventUtils';

function NormalCard({ data, onClick, layoutId }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/event/' + data.id);
    };

    const categoryInfo = getEventCategory(data);

    return (
        <motion.div 
            layoutId={layoutId}
            onClick={onClick}
            className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.07)] transition-all duration-300 cursor-pointer w-full"
        >
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-50">
                <motion.img
                    loading="lazy"
                    layoutId={`image-${data.id}`}
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Category Tag */}
                <div className="absolute top-3 left-3 z-10">
                    <span className={`px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase rounded-full shadow-sm ${categoryInfo.bg}`}>
                        {categoryInfo.name}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-5 space-y-3">
                {/* Title */}
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300 min-h-[2.5rem] leading-snug">
                    {data.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {data.description}
                </p>

                {/* Spacer */}
                <div className="flex-grow" />

                {/* Metadata */}
                <div className="pt-3 border-t border-zinc-100 space-y-2">
                    <div className="flex items-center text-[11px] text-zinc-600">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-orange-500 shrink-0" />
                        <span className="font-semibold">{data.date}</span>
                        {data.time && (
                            <>
                                <span className="mx-2 text-zinc-200">|</span>
                                <Clock className="w-3.5 h-3.5 mr-2 text-orange-500 shrink-0" />
                                <span className="truncate">{data.time}</span>
                            </>
                        )}
                    </div>
                    {data.location && (
                        <div className="flex items-center text-[11px] text-zinc-600 truncate">
                            <MapPin className="w-3.5 h-3.5 mr-2 text-orange-500 shrink-0" />
                            <span className="truncate">{data.location}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Hover Action Strip */}
            <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100 flex justify-between items-center text-xs font-bold text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
            </div>
        </motion.div>
    );
}

export default NormalCard;