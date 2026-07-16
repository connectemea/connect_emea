import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/config/supabase";
import { Loader } from "lucide-react";

interface AuthRoleRequireProps {
  role: "admin" | "user";
  children: JSX.Element;
}

const AuthRoleRequire: React.FC<AuthRoleRequireProps> = ({ children }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) {
        navigate("/signin");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      setSession(currentSession);
      setLoading(false);
      if (!currentSession) {
        navigate("/signin");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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

  return session ? children : <Navigate to="/signin" replace />;
};

export default AuthRoleRequire;
