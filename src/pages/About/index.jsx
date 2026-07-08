import React from "react";
import { motion } from "framer-motion";
import Communities from "./components/Communities";
import Content from "./components/Content";
import Mission from "./components/Mission";
import Vision from "./components/Vision";

const About = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 relative overflow-hidden pb-16">
      {/* Decorative Grid Patterns & Ambient Mesh Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* Content Section (Origin Story) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
          transition={{ duration: 0.6 }}
          className="bg-white border-b border-zinc-150 px-4 sm:px-6 py-12 md:py-16"
        >
          <Content />
        </motion.div>

        {/* Mission, Vision, Communities Section */}
        <div className="w-limit px-4 mt-12 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Mission />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Vision />
          </motion.div>

          <Communities />
        </div>
      </div>
    </div>
  );
};

export default About;
