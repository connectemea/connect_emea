import Logo from "@/assets/icons/FooterLogo.png";
import socialLink from "@/const/socialLinks";
import navLinks from "@/const/navLinks";

function Footer() {
  return (
    <footer className="bg-black text-white  p-8 rounded-t-[50px] bottom-0">
      <section className="flex flex-col gap-10 w-limit">
        <h1 className="mx-auto text-xl md:text-[35px] font-semibold">
          <span className="text-orange-500 mr-1">Join us</span>
          to start your journey.
        </h1>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="font-semibold text-xl md:text-2xl">ConnectEMEA</h1>
            {navLinks.map((link, index) => (
              <div key={index} className="flex text-sm md:text-md items-start justify-start gap-4">
                <a href={link.href}>{link.label}</a>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <img src={Logo} alt="logo" className="h-8 md:h-10" />
            <div className="flex items-end justify-end gap-4">
              {socialLink.map((item, index) => (
                <div key={index}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <item.Icon className="w-4 md:w-5 h-4 md:h-5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
