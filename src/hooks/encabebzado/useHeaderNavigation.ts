// hooks/encabezado/useHeaderNavigation.ts

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const useHeaderNavigation = () => {

  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const handleProtectedClick = (
    e: React.MouseEvent,
    path: string
  ) => {

    e.preventDefault();

    if (!isAuthenticated) {

      navigate("/login");

      return;
    }

    navigate(path);
  };

  return {
    handleProtectedClick,
  };
};