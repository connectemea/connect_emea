import React, { useState, useEffect } from "react";
import Founders from "./components/Founders";
import Interns from "./components/Interns";
import TeamsData from "@/const/data/Teams";
import { AnimatedTooltip } from "@/components/animated-tooltip2";
import { motion } from "framer-motion";
import { Users, Shield, Heart } from "lucide-react";
import { supabase } from "@/config/supabase";
import { resolveAsset } from "@/utils/resolveAsset";

// Animation settings
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      try {
        const { data, error } = await supabase
          .from("teams")
          .select("*")
          .order("order_index", { ascending: true });
        if (data && data.length > 0) {
          const mapped = data.map(m => ({
            id: m.id,
            name: m.name,
            role: m.role,
            position: m.position,
            image: resolveAsset(m.image),
            email: m.email,
            phone: m.phone,
            status: m.status,
            place: m.place,
            social: typeof m.social === "string" ? JSON.parse(m.social) : (m.social || {}),
            is_founder: m.role === 'Co-founder'
          }));
          setMembers(mapped);
        } else {
          setMembers([
            ...TeamsData.FoundersData.map(f => ({ ...f, is_founder: true })),
            ...TeamsData.InternsData.map(i => ({ ...i, is_founder: false }))
          ]);
        }
      } catch (err) {
        console.error("Failed to load team from Supabase, falling back:", err);
        setMembers([
          ...TeamsData.FoundersData.map(f => ({ ...f, is_founder: true })),
          ...TeamsData.InternsData.map(i => ({ ...i, is_founder: false }))
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, []);

  const founders = members.filter((member) => member.is_founder);
  const alumni = members.filter((member) => !member.is_founder && member.status === "Alumni");
  const interns = members.filter((member) => !member.is_founder && member.status === "Active");
  const isMobile = window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 pb-16 relative overflow-hidden">
      {/* Decorative Grid Patterns & Ambient Mesh Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-b from-orange-50/40 via-white to-transparent py-16 border-b border-zinc-100">
        <div className="w-limit px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-xs font-bold text-orange-600">
            <Users className="w-3.5 h-3.5" />
            Our Community
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-zinc-950">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="text-zinc-650 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            The builders, designers, and mentors driving the Connect community forward and creating opportunities for peers.
          </p>
        </div>
      </div>

      <div className="w-limit px-4 mt-12 space-y-16 relative z-10">
        
        {/* Founders Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
          className="space-y-6"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="flex items-center gap-1.5 text-orange-600">
              <Shield className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">The Founders</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950">
              Community Visionaries
            </h2>
          </div>
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.01)]">
            <Founders FoundersData={founders} />
          </div>
        </motion.div>

        {/* Active Interns Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
          className="space-y-6"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="flex items-center gap-1.5 text-orange-600">
              <Heart className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Active Members</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950">
              The Engine Room
            </h2>
          </div>
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.01)]">
            <Interns InternsData={interns} />
          </div>
        </motion.div>

        {/* Alumni Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
          className="space-y-6"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
              Our Legacy
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950">
              Community Alumni
            </h2>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 sm:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.01)] max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-row items-center justify-center w-full"
            >
              <AnimatedTooltip items={alumni} />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Team;
