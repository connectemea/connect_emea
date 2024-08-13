import React from "react";
import '../../../assets/styles/timeline.css'

const Timeline = ({ events }) => {
  return (
    <div className="relative w-full mx-auto  h-fit my-4">
      {/* Line */}
      <div className="absolute md:h-1 h-full md:w-full w-1 bg-gray-300 left-1/2 md:left-0 transform md:translate-x-0 translate-x-[-50%]"></div>

      <div className="flex gap-10 md:gap-20 flex-col md:flex-row w-full md:mt-16">
        {events.map((event, index) => (
          <div
            key={index}
            className={`relative mb-6 md:mb-0 flex ${index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
          >
            {/* Bullet */}
            <div className="absolute top-0 md:-top-2  left-1/2 md:transform-none transform -translate-x-1/2">
              <div className="w-6 h-6 flex items-center justify-center bg-white border-4 border-orange-500 rounded-full">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
            </div>

            {/* Event Title */}
            <div
              className={`px-8 md:px-0 rounded-lg absolute md:relative md:mt-10 `}
            >
              <h2 className={`text-xl font-bold whitespace-nowrap ${index % 2 === 0 ? 'md:absolute md:-top-20' : 'relative'}`}>{event.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
