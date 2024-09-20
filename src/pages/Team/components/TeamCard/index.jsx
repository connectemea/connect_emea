import { useState } from "react";
import { Instagram, Linkedin, Github, UserRound } from "lucide-react";

const TeamCard = ({ data, id, size }) => {
    const [isLoading, setIsLoading] = useState(true);

    const sizeClass = size === 'big' ? '!w-36 sm:!w-40 !h-36 sm:!h-40' : '!w-32 !h-32';

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <section id={id} className={`p-2 m-2 w-fit select-none`}>
            <div className={`bg-orange-500 rounded-full flex items-center justify-center overflow-hidden !pt-6 ${sizeClass}`}>
                {isLoading && <UserRound className="w-20 h-20 text-white" />} 
                <img
                    src={data?.image}
                    alt={data?.name}
                    onLoad={handleImageLoad}
                    onError={() => setIsLoading(false)} 
                    className={`object-cover ${isLoading ? "hidden" : "block"}`} 
                />
            </div>
            <div className="text-center space-y-2 mt-3">
                <p className="font-bold">{data?.name}</p>
                <span className="font-light text-sm">{data?.role}</span>
                <div className="flex items-center justify-center gap-4">
                    {data?.social.github && (
                        <a href={data?.social.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                        </a>
                    )}
                    {data?.social.linkedin && (
                        <a href={data?.social.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4" />
                        </a>
                    )}
                    {data?.social.instagram && (
                        <a href={data?.social.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TeamCard;
