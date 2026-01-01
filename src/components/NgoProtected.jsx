import ProtectedRoute from "./ProtectedRoute";

export default function NgoProtected({ children }) {
  return (
    <ProtectedRoute
      allowedUserTypes={["NGO"]}
      allowedRoles={["USER"]}
    >
      {children}
    </ProtectedRoute>
  );
}
