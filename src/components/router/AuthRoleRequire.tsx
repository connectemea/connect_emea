import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
// import { toast } from "sonner";
import { Loader } from "lucide-react";

interface AuthRoleRequireProps {
  role: "admin" | "user";
  children: JSX.Element;
}

const AuthRoleRequire: React.FC<AuthRoleRequireProps> = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        await signOut(auth);
        navigate("/signin");
        // const idTokenResult = await user.getIdTokenResult();
        // const authRole = idTokenResult.claims.role;
        // } else {
        //     await signOut(auth);
        //     navigate('/signin');
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-white dark:bg-slate-900 flex items-center justify-center z-50">
        <p className="text-center dark:text-white flex items-center justify-center">
          <Loader className="animate-spin h-8 w-8 text-gray-400 dark:text-white text-lg mx-2" />{" "}
          Loading...
        </p>
      </div>
    );
  }

  return user ? children : <Navigate to="/signin" replace />;
};

export default AuthRoleRequire;
