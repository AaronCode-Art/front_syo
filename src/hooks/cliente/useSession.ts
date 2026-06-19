import { useAuth } from "../../context/AuthContext";

export const useSession = () => {
  const {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    isAuthLoading,
  } = useAuth();

  return {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    isAuthLoading,
  };
};