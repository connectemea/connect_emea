import { Instagram, Linkedin, Github, InstagramIcon } from "lucide-react";

const TeamCard = ({ data, id, size }) => {

    const sizeClass = size === 'big' ? '!w-36 sm:!w-40 !h-36 sm:!h-40' : '!w-32 !h-32';
    return (
        <section id={id} className={`p-2  m-2  w-fit select-none`}>
            <div className={`bg-orange-500 rounded-full flex items-center justify-center  overflow-hidden !pt-6 ${sizeClass}`}>
                <img src={data?.image} alt={data?.name} className="object-cover" />
            </div>
            <div className="text-center space-y-2 mt-3">
                <p className="font-bold">{data?.name}</p>
                <span className="font-light text-sm">{data?.role}</span>
                <div className="flex items-center justify-center gap-4">
                    {data?.social.github && <div><a href={data?.social.github} target="_blank"><Github className="w-4 h-4" /></a></div>}
                    {data?.social.linkedin &&  <div><a href={data?.social.linkedin} target="_blank"><Linkedin className="w-4 h-4" /></a></div>}
                    {data?.social.instagram &&  <div><a href={data?.social.instagram} target="_blank"><Instagram className="w-4 h-4" /></a></div>}
                </div>
            </div>
        </section>
    );
};
export default TeamCard;
