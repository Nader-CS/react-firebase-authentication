import { Navigate, Outlet } from "react-router-dom";
import { useAuthConetxt } from "../hooks/useAuthConetxt";

export default function ProtectedRoute() {
  const context = useAuthConetxt();

  if (context.authIsReady) {
    if (context.user) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  }
}
