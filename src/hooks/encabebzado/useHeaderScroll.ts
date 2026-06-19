// hooks/encabezado/useHeaderScroll.ts

import { useEffect, useState } from "react";

export const useHeaderScroll = () => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  return {
    scrolled,
  };
};