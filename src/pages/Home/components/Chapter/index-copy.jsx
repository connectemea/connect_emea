import { motion } from "framer-motion";
import { EventsBG, PlacementBG, MembersBG } from "@/assets/avatars";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const pointVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

function Chapter() {
  const points = [
    {
      title: "Work on Real Projects",
      content:
        "Get hands-on experience with collaborative projects that solve real-world problems. Perfect for rebels who want to make an impact now.",
    },
    {
      title: "Free Skill Development",
      content:
        "Access a wide range of resources to build new skills across different fields—completely free. Because your passion shouldn't come with a price tag.",
    },
    {
      title: "Network with Peers",
      content:
        "Connect with supportive, like-minded friends who share your drive and ambition. Build a community that fuels your passion.",
    },
    {
      title: "Free Mentorship",
      content:
        "Learn directly from industry pros who’ve been where you want to go. Gain insights, advice, and guidance without spending a dime.",
    },
    {
      title: "Leadership Opportunities",
      content:
        "Step up and take on leadership roles to sharpen your management and organizational skills. Show the world what you’re capable of.",
    },
  ];

  return (
    <section className="flex flex-col gap-4 p-4 my-10">
      <motion.h1
        className="font-semibold text-center my-4 text-[28px] sm:text-[38px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Why you should join <span className="text-orange-500 block">Connect</span>
      </motion.h1>

      <div className="flex flex-col-reverse md:grid md:grid-cols-3 gap-20 md:gap-10 mx-auto">
        <motion.div
          className="col-span-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ul className="space-y-4 list-disc list-inside px-4">
            {points.map((item, index) => (
              <motion.li
                key={index}
                className=""
                custom={index}
                variants={pointVariants}
              >
                <strong className="font-semibold text-xl md:text-2xl">
                  {item.title}:
                </strong>
                <span className="ml-5 block text-md md:text-lg">{item.content}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="relative flex h-full items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex relative items-end gap-6 md:-mt-20 mb-24 md:mb-0">
            {[
              { img: MembersBG, title: "100+", subtitle: "Members", style: "" },
              { img: EventsBG, title: "40+", subtitle: "Events", style: "" },
              { img: PlacementBG, title: "20+", subtitle: "Placements", style: "absolute -bottom-32 left-24" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className={`min-h-52 w-36 md:w-40 bg-gray-400 border border-black rounded-full flex items-center justify-center overflow-hidden relative ${stat.style}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  draggable={false} // prevent dragging
                  onDragStart={(e) => e.preventDefault()}
                  src={stat.img}
                  alt={stat.subtitle}
                  className="absolute inset-0 object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <span className="relative text-white mx-auto text-center p-2">
                  <h1 className="text-3xl font-bold">{stat.title}</h1>
                  <p className="font-semibold text-xl">{stat.subtitle}</p>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Chapter;
