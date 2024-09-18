import React from "react";
import "@/assets/styles/timeline.css";

interface Event {
  title: string;
}

interface TimelineProps {
  events: Event[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative w-full mx-auto  h-fit my-4">
      {/* Line */}
      <div className="absolute lg:h-1 h-full lg:w-full w-1 bg-gray-300 left-1/2 lg:left-0 transform lg:translate-x-0 translate-x-[-50%]"></div>

      <div className="flex gap-16 lg:gap-24 flex-col lg:flex-row w-full lg:mt-16">
        {events.map((event, index) => (
          <div
            key={index}
            className={`relative mb-6 lg:mb-0 flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            {/* Bullet */}
            <div className="absolute top-0 lg:-top-2 left-1/2 lg:transform-none transform -translate-x-1/2">
              <div className="w-6 h-6 flex items-center justify-center bg-white border-4 border-orange-500 rounded-full">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
            </div>

            {/* Event Title */}
            <div
              className={`px-8 lg:px-0 rounded-lg absolute lg:relative lg:mt-10 `}
            >
              <h2
                className={`text-lg font-semibold whitespace-nowrap ${
                  index % 2 === 0 ? "lg:absolute lg:-top-20" : "relative"
                }`}
              >
                {event.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
