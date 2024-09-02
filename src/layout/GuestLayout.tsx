import { Outlet } from 'react-router-dom'
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";


function GuestLayout() {
    return (
        <div className='relative '>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default GuestLayout
