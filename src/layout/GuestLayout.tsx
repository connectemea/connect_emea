import { Outlet } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

function GuestLayout() {
  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <NavBar />
      <main className="flex-grow mt-20 sm:mt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default GuestLayout;
