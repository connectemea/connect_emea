import React from 'react';
import { Quote } from 'lucide-react';

function Card({ item }) {
  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 relative shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col justify-between h-full space-y-6">
      
      {/* Decorative Quote Icon */}
      <div className="absolute top-6 right-6 text-orange-500/10 pointer-events-none">
        <Quote className="w-12 h-12 rotate-180" />
      </div>

      {/* Testimonial Quote Text */}
      <p className="text-zinc-650 text-xs sm:text-sm font-light leading-relaxed italic relative z-10">
        "{item.content}"
      </p>

      {/* Author Profile Row */}
      <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
        
        {/* Avatar Ring */}
        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gradient-to-tr from-orange-400 to-amber-500 p-0.5 shadow-sm">
          <div className="w-full h-full rounded-full bg-white overflow-hidden">
            <img
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Name and Designation */}
        <div className="text-left min-w-0">
          <p className="font-bold text-xs sm:text-sm text-zinc-950 truncate">
            {item.name}
          </p>
          <p className="text-[10px] font-bold text-orange-600 truncate">
            {item.role}
          </p>
          {item.office && (
            <p className="text-[9px] font-semibold text-zinc-400 truncate">
              {item.office}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;