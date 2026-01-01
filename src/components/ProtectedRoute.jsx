import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children, allowedUserTypes, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  console.log("loading is "+loading);
  console.log(user+" user is ");
  if (!user){
    console.log("returning to /"); 
    return <Navigate to="/unauthorized" replace />;
  }


  // Check USER TYPE
  if (allowedUserTypes && !allowedUserTypes.includes(user.userType)) {
    console.log("here allowed user type , returning "+allowedUserTypes+"  "+user.userType);
    return <Navigate to="/unauthorized" replace />;
  }

  // Check ROLE
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log(allowedRoles);
    console.log(user.role);
        console.log("here allowed user role , returning ");
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
