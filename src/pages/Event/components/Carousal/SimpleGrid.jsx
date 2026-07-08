import { Special } from "../EventCard";

const SimpleGrid = ({ slides, color, onEventClick }) => {
    return (
        <div className="w-full max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {slides.map((event) => (
                    <div
                        className="rounded-xl cursor-pointer"
                        key={event.id}
                        onClick={() => onEventClick(event)}
                    >
                        <Special data={event} color={color} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimpleGrid;

