import { Outlet, useLocation } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Self-contained mouse glow coordinates tracker to prevent main layout re-renders
function MouseGlow() {
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 pointer-events-none"
      style={{
        opacity: isVisible ? 1 : 0,
        background: `radial-gradient(450px at ${coords.x}px ${coords.y}px, rgba(249, 115, 22, 0.045), transparent 80%)`,
      }}
    />
  );
}

function GuestLayout() {
  const location = useLocation();

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-zinc-50/20">
      {/* Global Interactive Mouse Spot Glow */}
      <MouseGlow />

      {/* NavBar fade + slide down */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavBar />
      </motion.div>

      {/* Main page content fade */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow mt-16 sm:mt-20"
      >
        <Outlet />
      </motion.main>

      {/* Footer fade + slide up */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}

export default GuestLayout;
