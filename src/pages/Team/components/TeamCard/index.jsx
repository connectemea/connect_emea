import { useState } from "react";
import { Instagram, Linkedin, Github, UserRound } from "lucide-react";

const TeamCard = ({ data, id, size }) => {
    const [isLoading, setIsLoading] = useState(true);

    const sizeClass = size === 'big' ? '!w-36 sm:!w-40 !h-36 sm:!h-40' : '!w-32 !h-32';

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    // Adjust font size based on the length of the position text
    const fontSize = data?.position.length > 15 ? 12 : 16;

    return (
        <section
            id={id}
            className={`p-2 m-2 w-fit select-none relative group transform transition-transform duration-300 hover:scale-105 max-w-[170px] sm:max-w-[200px]`}
        >
            <div className={`bg-gradient-to-r ${id % 2 === 0 ? 'from-orange-400 to-orange-500' : 'from-orange-500 to-orange-400'} rounded-full flex items-center justify-center overflow-hidden !pt-6 mx-auto shadow-lg !z-0 ${sizeClass}`}>
                {isLoading && <UserRound className="w-20 h-20 text-white" />}
                <img
                    src={data?.image}
                    alt={data?.name}
                    onLoad={handleImageLoad}
                    onError={() => setIsLoading(false)}
                    className={`object-cover ${isLoading ? "hidden" : "block"} transition-opacity duration-300`}
                />
            </div>
            <div className="text-center space-y-2 mt-3">
                <p className="font-medium text-md sm:text-lg">{data?.name}</p>
                <span className="font-light text-sm text-gray-800">{data?.role}</span>
                <div className="flex items-center justify-center gap-4">
                    {data?.social.github && (
                        <a href={data?.social.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5 hover:text-gray-700 transition-colors" />
                        </a>
                    )}
                    {data?.social.linkedin && (
                        <a href={data?.social.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-5 h-5 hover:text-gray-700 transition-colors" />
                        </a>
                    )}
                    {data?.social.instagram && (
                        <a href={data?.social.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="w-5 h-5 hover:text-gray-700 transition-colors" />
                        </a>
                    )}
                </div>
            </div>

            {/* Curved Text */}
            <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 !z-10 rounded-full overflow-hidden">
                <svg width="150" height="80">
                    <defs>
                        <path id="curve" d="M 10,30 A 70,30 0 0,1 140,30" />
                    </defs>
                    <text fill="orange" fontSize={fontSize} fontFamily="Arial">
                        <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle">
                            {data?.position}
                        </textPath>
                    </text>
                </svg>
            </div>
        </section>
    );
};

export default TeamCard;
