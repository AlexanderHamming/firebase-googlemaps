import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ProtectedRoutesProps {
  redirect?: string;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ redirect = "/Login" }) => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      toast.error("Hey you, dont do that!");
    }
  }, [currentUser]);

  return currentUser ? <Outlet /> : <Navigate to={redirect} />;
};

export default ProtectedRoutes;
