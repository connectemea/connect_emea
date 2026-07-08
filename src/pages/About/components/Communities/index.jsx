import React from 'react';
import TinkerHubLogo from '@/assets/icons/TinkerHub_EMEA2.png';
import SheHikeLogo from '@/assets/icons/SheHike_Logo2.png';
import { motion } from "framer-motion";
import { Users2, ArrowUpRight } from 'lucide-react';

function Communities() {
  const isMobile = window.innerWidth < 768;

  return (
    <div className='flex flex-col space-y-8 mt-16 pb-12'>
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="flex items-center gap-2 text-orange-600">
          <Users2 className="w-5 h-5 shrink-0" />
          <span className="text-orange-600 text-xs font-bold tracking-widest uppercase">Our Wings</span>
        </div>
        <h2 className='text-2xl sm:text-3xl font-extrabold text-zinc-950'>Connect Initiatives</h2>
      </div>

      <section className='flex flex-col sm:flex-row items-stretch justify-center gap-8 max-w-4xl mx-auto px-4'>
        {/* Card 1: TinkerHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='flex-1 flex flex-col group cursor-pointer'
        >
          <div className='flex flex-col items-center justify-between rounded-3xl p-6 bg-white border border-zinc-200/80 hover:border-orange-200 shadow-sm text-center h-full space-y-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'>
            <div className="h-16 flex items-center justify-center">
              <img 
                draggable={false} 
                onDragStart={(e) => e.preventDefault()} 
                src={TinkerHubLogo} 
                alt='TinkerHub EMEA Logo' 
                className='max-h-full w-auto object-contain' 
              />
            </div>
            <p className='text-zinc-500 text-xs sm:text-sm font-light leading-relaxed flex-grow'>
              TinkerHub EMEA is a Campus Community Initiative of TinkerHub Foundation, a non-profit organization registered in 2016. TinkerHub aims to reduce the gap between technology and its effective employment in the lives of tech enthusiasts.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 pt-2">
              <span>Learn More</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </motion.div>

        {/* Card 2: SheHike */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex-1 flex flex-col group cursor-pointer'
        >
          <div className='flex flex-col items-center justify-between rounded-3xl p-6 bg-white border border-zinc-200/80 hover:border-orange-200 shadow-sm text-center h-full space-y-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'>
            <div className="h-16 flex items-center justify-center">
              <img 
                draggable={false} 
                onDragStart={(e) => e.preventDefault()} 
                src={SheHikeLogo} 
                alt='SheHike Logo' 
                className='max-h-full w-auto object-contain' 
              />
            </div>
            <p className='text-zinc-500 text-xs sm:text-sm font-light leading-relaxed flex-grow'>
              ‘SheHike’ is a women's wing under CONNECT EMEA which is open to all girl students in the college. The purpose of this initiative is to empower women with relevant knowledge and skills, thereby encouraging peer-to-peer learning among them.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 pt-2">
              <span>Learn More</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Communities;
