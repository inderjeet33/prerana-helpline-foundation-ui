import ProtectedRoute from "./ProtectedRoute";

export default function IndividualProtected({ children }) {
  return (
    <ProtectedRoute
      allowedUserTypes={["INDIVIDUAL"]}
      allowedRoles={["USER"]}
    >
      {children}
    </ProtectedRoute>
  );
}
