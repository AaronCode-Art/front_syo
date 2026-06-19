// hooks/encabezado/useHeaderMenu.ts

import { useState } from "react";

export const useHeaderMenu = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return {
    menuOpen,
    setMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  };
};