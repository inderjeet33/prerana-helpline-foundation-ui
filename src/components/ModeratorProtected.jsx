import ProtectedRoute from "./ProtectedRoute";

export default function ModeratorProtected({ children }) {
  return (
    <ProtectedRoute
      allowedRoles={["MODERATOR"]}
    >
      {children}
    </ProtectedRoute>
  );
}
