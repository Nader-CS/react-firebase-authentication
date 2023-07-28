import { Navigate, Outlet } from "react-router-dom";
import { useAuthConetxt } from "../hooks/useAuthConetxt";

export default function PublicRoute() {
  const context = useAuthConetxt();
  console.log(context);

  if (context.authIsReady) {
    if (context.user) {
      return <Navigate to="/" />;
    } else {
      return <Outlet />;
    }
  }
}
