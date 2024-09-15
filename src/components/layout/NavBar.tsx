import { useState } from "react";
import navLinks from "@/const/navLinks";
import Logo from "@/assets/icons/connect.svg";
import { LayoutPanelTop, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

function NavBar() {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  const underlineStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
  };

  const activeUnderlineStyle: React.CSSProperties = {
    content: "''",
    display: "block",
    width: "50%", 
    height: "2px", 
    backgroundColor: "currentColor",
    position: "absolute",
    left: "25%", 
    bottom: "-1px", 
    transition: "width 0.3s ease, left 0.3s ease",
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

    // Function to get the label of the current route from navLinks
    const getCurrentRouteLabel = () => {
      const currentLink = navLinks.find((link) => link.href === location.pathname);
      return currentLink ? currentLink.label : "Home"; // Default to "Home" if no match
    };

  return (
    <nav className="flex justify-between items-center p-4 bg-white text-black w-limit py-6  md:py-10">
      <div>
        <img src={Logo} alt="logo" className="h-8" />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.href}
            className={({ isActive }) =>
              `transition-colors duration-300 font-semibold ${
                isActive
                  ? "text-orange-500"
                  : "text-gray-800"
              } hover:text-orange-500`
            }
            style={underlineStyle}
          >
            {({ isActive }) => (
              <>
                {link.label}
                {isActive && <span style={activeUnderlineStyle} />}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={toggleNav} className="focus:outline-none">
          <div className="border flex items-center justify-center gap-1 rounded-lg bg-black p-[5px] transition-transform duration-300">
            <p className="bg-orange-500 text-sm font-semibold p-[3px] px-[10px] rounded-md text-white">
            {getCurrentRouteLabel()}
            </p>
            <div
              className={`transform transition-transform duration-300 ${
                navOpen ? "rotate-90" : ""
              }`}
            >
              {navOpen ? (
                <X size={24} color="white" />
              ) : (
                <LayoutPanelTop size={24} color="white" />
              )}
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <div
        className={`absolute top-16 right-4 w-36 bg-white text-black rounded-lg shadow-lg flex flex-col items-start p-4 transition-all duration-300 transform ${
          navOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.href}
            className={({ isActive }) =>
              `block py-2 px-4 hover:text-orange-500 rounded transition-colors duration-300 ${
                isActive ? "text-orange-500" : "text-gray-800"
              }`
            }
            onClick={() => setNavOpen(false)} // Close the mobile menu on link click
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
