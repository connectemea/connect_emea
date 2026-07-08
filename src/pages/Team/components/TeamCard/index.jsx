import { useState } from "react";
import { Instagram, Linkedin, Github, UserRound } from "lucide-react";

const TeamCard = ({ data, id, size }) => {
    const [isLoading, setIsLoading] = useState(true);

    const sizeClass = size === 'big' ? 'w-28 h-28 sm:w-36 sm:h-36' : 'w-20 h-20 sm:w-28 sm:h-28';

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <section
            id={id}
            className="p-3 m-1 sm:m-3 select-none relative group transition-all duration-300 w-[120px] sm:w-[180px] shrink-0"
        >
            {/* Position Pill on Hover */}
            {data?.position && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-4 transition-all duration-300 z-20 whitespace-nowrap pointer-events-none">
                    <span className="bg-orange-500 text-white font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md shadow-orange-500/20 border border-orange-400/20">
                        {data?.position}
                    </span>
                </div>
            )}

            {/* Avatar Circle Container */}
            <div className={`relative ${sizeClass} rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-tr from-orange-400 to-amber-500 p-0.5 mx-auto shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                    {isLoading && (
                        <div className="absolute inset-0 bg-zinc-50 flex items-center justify-center">
                            <UserRound className="w-8 h-8 text-zinc-350 animate-pulse" />
                        </div>
                    )}
                    {data?.image ? (
                        <img
                            src={data?.image}
                            alt={data?.name}
                            onLoad={handleImageLoad}
                            onError={() => setIsLoading(false)}
                            className={`w-full h-full object-cover ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300 select-none`}
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                        />
                    ) : (
                        <UserRound className="w-10 h-10 text-zinc-350" />
                    )}
                </div>
            </div>

            {/* Member Details */}
            <div className="text-center space-y-1 mt-3">
                <p className="font-bold text-xs sm:text-sm text-zinc-900 truncate">
                    {data?.name}
                </p>
                <span className="block font-medium text-[10px] sm:text-xs text-orange-600 truncate">
                    {data?.role}
                </span>

                {/* Social Links Row */}
                <div className="flex items-center justify-center gap-3 pt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    {data?.social?.github && (
                        <a 
                            href={data.social.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label={`Visit ${data.name}'s GitHub`}
                            className="text-zinc-500 hover:text-zinc-900 transition-colors"
                        >
                            <Github className="w-3.5 h-3.5" />
                        </a>
                    )}
                    {data?.social?.linkedin && (
                        <a 
                            href={data.social.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label={`Visit ${data.name}'s LinkedIn`}
                            className="text-zinc-500 hover:text-sky-600 transition-colors"
                        >
                            <Linkedin className="w-3.5 h-3.5" />
                        </a>
                    )}
                    {data?.social?.instagram && (
                        <a 
                            href={data.social.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label={`Visit ${data.name}'s Instagram`}
                            className="text-zinc-500 hover:text-pink-600 transition-colors"
                        >
                            <Instagram className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TeamCard;
