import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthService from "../services/auth";

export default function ProtectedRoute() {
  const user = AuthService.getCurrentUser();
  let location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
