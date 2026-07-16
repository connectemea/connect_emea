import React from 'react';
import { MessageCircle, Users, AlertCircle, Calendar } from 'lucide-react';
import Closed from '@/assets/images/Us/closed_2.jpeg';

function Join() {
  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 relative overflow-hidden py-16">
      {/* Grid Pattern & Accent Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-limit px-4 relative z-10">
        <div className="max-w-3xl mx-auto space-y-10">
          
          {/* Header Section */}
          <div className="text-center space-y-3">
            {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-xs font-bold text-orange-600">
              <Calendar className="w-3.5 h-3.5" />
              Recruitment 2026
            </div> */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-zinc-950">
              Intern Hiring{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Registration
              </span>
            </h1>
            <p className="text-zinc-600 text-xs sm:text-sm font-light max-w-md mx-auto">
              Ready to jumpstart your career? Keep track of the Connect EMEA recruitment cycles and stay tuned.
            </p>
          </div>

          {/* Registration Closed Card */}
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-xl">
            {/* Banner Image with Overlay */}
            <div className="relative h-60 sm:h-80 w-full overflow-hidden">
              <img
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                src={Closed}
                alt="Form closed"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
            </div>

            {/* Closed Info Panel */}
            <div className="p-6 sm:p-8 space-y-4 -mt-12 relative z-20 bg-white border-t border-zinc-100">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-[10px] font-bold uppercase tracking-wider text-rose-600">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                Registrations Closed
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-zinc-950">
                  Form Officially Closed
                </h3>
                <p className="text-zinc-650 text-sm font-light leading-relaxed">
                  Thank you for all the incredible responses! The Connect intern hiring registration form is officially closed. All registered candidates will be informed of further procedures and shortlists shortly.
                </p>
              </div>

              <div className="pt-2 text-xs text-zinc-500 font-light flex items-center gap-1.5">
                <span>Have inquiries?</span>
                <a
                  href="https://wa.me/918089465673"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 font-bold hover:text-green-700 underline"
                >
                  WhatsApp Help Desk
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp Community Call-To-Action */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-md">
            <div className="space-y-2 flex-grow text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start text-orange-600">
                <Users className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Stay Connected</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-zinc-950">
                Join the Connect Community
              </h4>
              <p className="text-zinc-605 text-xs sm:text-sm font-light leading-relaxed max-w-lg">
                Still want to stay in touch? Join our official community chat to receive direct updates about events, workshops, hackathons, and future recruitment drives.
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <a
                href="https://chat.whatsapp.com/HWUMSzHQWkyLv3VwWgnRFu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                Join Community Chat
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Join;
