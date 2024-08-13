import { Instagram, Linkedin, Github, InstagramIcon } from "lucide-react";

const TeamCard = ({ data, id, size }) => {

    const sizeClass = size === 'big' ? '!w-40 !h-40' : '!w-36 !h-36';
    return (
        <section id={id} className={`p-2  m-2  w-fit select-none`}>
            <div className={`bg-orange-500 rounded-full flex items-center justify-center  overflow-hidden !pt-6 ${sizeClass}`}>
                <img src={data?.image} alt={data?.name} className="object-cover" />
            </div>
            <div className="text-center space-y-2 mt-3">
                <p className="font-bold">{data?.name}</p>
                <span className="font-light text-sm">{data?.role}</span>
                <div className="flex items-center justify-center gap-4">
                    <div><a href={data?.social.github}><Github className="w-4 h-4"/></a></div>
                    <div><a href={data?.social.linkedin} ><Linkedin className="w-4 h-4"/></a></div>
                    <div><a href={data?.social.instagram}><Instagram className="w-4 h-4"/></a></div>
                </div>
            </div>
        </section>
    );
};
export default TeamCard;
