import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../lib/context/user";

export default function ProtectedRoute() {
  const { current: user } = useUser();

  return user ? <Outlet /> : <Navigate to="/" replace />;
}
