import ContactImg from "@/assets/avatars/Queries2.png";
import { QueriesForm } from "./Form";

function Contact() {
  return (
    <div className="flex text-center flex-col my-10 p-4 relative z-10">
      <div className="flex bg-white rounded-3xl shadow-lg border border-zinc-200/80 overflow-hidden mx-auto w-fit md:w-full max-w-[900px]">
        {/* Left Column: Image (Hidden on small screens) */}
        <div className="w-[50%] bg-orange-50 hidden md:block shrink-0">
          <img
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            src={ContactImg}
            alt="Queries"
            className="object-cover h-full w-full opacity-90"
          />
        </div>

        {/* Right Column: Form */}
        <div className="max-w-md p-8 sm:p-10 md:p-14 mx-auto w-full">
          <div className="text-left space-y-2 mb-6">
            <span className="text-orange-650 text-[10px] font-bold uppercase tracking-wider">Reach Out</span>
            <h2 className="text-2xl font-black text-zinc-950">Have Queries?</h2>
            <p className="text-zinc-500 text-xs font-light leading-relaxed">
              Let's align our constellations! Reach out and let the magic of collaboration illuminate our skies.
            </p>
          </div>
          <div className="space-y-4">
            <QueriesForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
