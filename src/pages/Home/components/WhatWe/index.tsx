import { motion, Variants } from "framer-motion";
import React from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const highlightWords = ["Connect", "community", "resources"];

const WtConnect: React.FC = () => {
  const text =
    "Connect is a vibrant, student-driven community that bridges the gap between academia and industry. Through collaborative learning, real-world experiences, and expert guidance, we provide the resources and environment you need to build your dream career.";

    const isMobile = window.innerWidth < 768;
  return (
    <section className="flex flex-col gap-6 p-4">
      <motion.div
        className="flex flex-col gap-4 my-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
      >
        <motion.h1
          className="font-semibold text-center mx-auto text-[26px] sm:text-[38px]"
          variants={item}
        >
          What is <span className="text-orange-500">Connect</span>
        </motion.h1>

        <motion.p
          className="text-center max-w-[900px] mx-auto text-[18px] sm:text-[22px] font-normal"
          variants={item}
        >
          {text.split(" ").map((word, index) => (
            <motion.span
              key={index}
              className={
                highlightWords.includes(word.replace(/[,.]/g, ""))
                  ? "text-orange-500 font-semibold"
                  : ""
              }
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
              transition={{ delay: index * 0.03 }}
            >
              {word + " "}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default WtConnect;
