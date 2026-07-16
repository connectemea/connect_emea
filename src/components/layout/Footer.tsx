import Logo from "@/assets/icons/FooterLogo.png";
import socialLink from "@/const/socialLinks";
import navLinks from "@/const/navLinks";
import { Compass } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-100 p-8 pb-6 rounded-t-[40px] relative overflow-hidden mt-16">
      {/* Decorative Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <section className="flex flex-col gap-10 w-limit mx-auto relative z-10">
        
        {/* Call to Action Badge Header */}
        <div className="flex flex-col items-center text-center space-y-3 py-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-orange-500 uppercase tracking-widest">
            Connect Community
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            Join us to <span className="text-orange-500">start your journey</span>.
          </h2>
        </div>

        {/* Footer Navigation Columns */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 sm:gap-4 pt-6 border-t border-zinc-900">
          
          {/* Brand Info & NavLinks */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-orange-500" />
              <h3 className="font-extrabold text-lg tracking-tight text-white">Connect</h3>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
              {navLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  aria-label={link.label}
                  className="text-zinc-400 hover:text-orange-500 transition-colors duration-200 text-xs font-light"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Logo & Social Links */}
          <div className="flex flex-col gap-4 items-start sm:items-end w-full sm:w-auto">
            <img
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              src={Logo}
              alt="logo"
              className="h-7 md:h-8 opacity-90"
            />
            
            <div className="flex items-center gap-4">
              {socialLink.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${item.label} page`}
                  className="text-zinc-400 hover:text-orange-500 transition-colors duration-200"
                >
                  <item.Icon className="w-4 h-4 md:w-4.5 md:h-4.5" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Bottom Crafted-By Credits Bar */}
      <div className="mt-8 border-t border-zinc-900 pt-6">
        <p className="text-center text-[10px] sm:text-xs text-zinc-500 font-light">
          Crafted with passion by{" "}
          <a
            href="https://zamil.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600 transition-colors font-medium"
          >
            Shamil
          </a>{" "}
          &{" "}
          <a
            href="https://www.linkedin.com/in/muhammed-saleel-cp-84064524b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600 transition-colors font-medium"
          >
            Saleel
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
