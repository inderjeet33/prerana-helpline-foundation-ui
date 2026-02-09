import ProtectedRoute from "./ProtectedRoute";

export default function CsrProtected({ children }) {
  return (
    <ProtectedRoute
      allowedUserTypes={["CSR"]}
      allowedRoles={["USER"]}
    >
      {children}
    </ProtectedRoute>
  );
}
