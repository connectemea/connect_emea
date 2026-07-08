import React from 'react';
import img from '@/assets/avatars/About1.png';
import { Target } from 'lucide-react';

function Mission() {
  return (
    <div className='flex flex-col-reverse md:flex-row-reverse items-center justify-between gap-8 md:gap-12 mt-12 p-6 sm:p-8 bg-white border border-zinc-200/80 rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.01)]'>
      {/* Content Text Column */}
      <div className='w-full md:w-1/2 flex items-start justify-center flex-col space-y-4'>
        <div className="flex items-center gap-2 text-orange-600">
          <Target className="w-6 h-6 shrink-0" />
          <h2 className='text-left text-orange-600 font-extrabold text-2xl sm:text-3xl tracking-tight'>Our Mission</h2>
        </div>
        <p className='text-sm sm:text-base leading-relaxed text-zinc-600 font-light text-center md:text-left'>
          We’re on a mission to create an ecosystem where every student can pursue greatness beyond the classroom. Connect empowers those who seek real-world experience, new skills, and opportunities that go beyond the traditional college curriculum.
        </p>
      </div>
      
      {/* Image Column */}
      <div className='w-full md:w-1/2 flex items-center justify-center shrink-0'>
        <div className="relative p-2 bg-zinc-50 border border-zinc-150 rounded-2xl shadow-md max-w-[280px]">
          <img 
            draggable={false} 
            onDragStart={(e) => e.preventDefault()} 
            src={img} 
            alt='Connect Mission' 
            className='w-full h-auto object-contain rounded-xl' 
          />
        </div>
      </div>
    </div>
  );
}

export default Mission;
