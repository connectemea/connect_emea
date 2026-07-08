import React from 'react';
import Welcome from './components/Welcome';
import EventSection from './components/Events';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import WtConnect from './components/WhatWe';
import WhyWe from './components/WhyWe';
import Chapter from './components/Chapter';
import ViewMotion from '@/components/viewmotion';
import { TimelineDemo } from './components/Journey/test';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 relative overflow-hidden pb-12 w-full">
      {/* Decorative Grid Patterns & Ambient Mesh Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-limit px-4 mx-auto relative z-10 space-y-16">
        <Welcome />

        <ViewMotion delay={0.1}>
          <EventSection />
        </ViewMotion>

        <ViewMotion delay={0.1}>
          <WtConnect />
        </ViewMotion>

        <ViewMotion delay={0.2}>
          <WhyWe />
        </ViewMotion>

        <ViewMotion delay={0.2}>
          <Testimonials />
        </ViewMotion>

        <ViewMotion delay={0.3}>
          <Chapter />
        </ViewMotion>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="py-6"
        >
          <TimelineDemo />
        </motion.div>

        <ViewMotion delay={0.3}>
          <About />
        </ViewMotion>

        <ViewMotion delay={0.4}>
          <Contact />
        </ViewMotion>
      </div>
    </div>
  );
};

export default Home;
