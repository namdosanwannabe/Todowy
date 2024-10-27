// AuthGuard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/");
      } else {
        navigate("/home");
      }
    });

    return () => data.subscription.unsubscribe();
  }, [navigate]);

  return children;
};

export default AuthGuard;
