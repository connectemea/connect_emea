import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <NavBar />

            <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-16">
                <div className="max-w-md w-full text-center">
                    {/* Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="bg-orange-100 p-6 rounded-full">
                            <AlertTriangle className="h-16 w-16 text-orange-500" />
                        </div>
                    </div>

                    {/* Text Content */}
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
                    <p className="text-gray-600 mb-8">
                        Sorry, the page you are looking for doesn't exist or has been moved.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <NavLink
                            to="/"
                            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            <Home size={20} />
                            Go Home
                        </NavLink>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center gap-2 border border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Go Back
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default NotFound;