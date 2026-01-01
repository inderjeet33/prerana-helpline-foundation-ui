import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Home from "./Home"; // your existing Home component

export default function HomeRedirect() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) {
    return <Home />;
  }

  if (user.userType === "INDIVIDUAL") {
    return <Navigate to="/dashboard" replace />;
  }

  if (user.userType === "NGO") {
    return <Navigate to="/ngo-dashboard" replace />;
  }

  if (user.role === "MODERATOR") {
    return <Navigate to="/moderator-dashboard" replace />;
  }

  return <Home />;
}
