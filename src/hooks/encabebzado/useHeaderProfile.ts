// hooks/encabezado/useHeaderProfile.ts

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const useHeaderProfile = () => {

  const navigate = useNavigate();

  const {
    user,
    logout,
    isAuthenticated,
  } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleClickOutside = (e: MouseEvent) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  const handleLogout = () => {

    logout();

    setProfileOpen(false);

    navigate("/");
  };

  const getInitial = () => {

    if (!user?.nombre) return "?";

    return user.nombre.charAt(0).toUpperCase();
  };

  return {
    profileOpen,
    setProfileOpen,
    profileRef,
    handleLogout,
    getInitial,
    isAuthenticated,
    user,
  };
};