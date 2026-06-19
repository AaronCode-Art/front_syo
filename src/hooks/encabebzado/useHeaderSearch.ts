// hooks/encabezado/useHeaderSearch.ts

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { productoService } from "../../services/productoService";

import type {
  ProductoLista,
} from "../../types/Producto.types";

export const useHeaderSearch = () => {

  const [search, setSearch] = useState("");

  const [resultados, setResultados] = useState<
    ProductoLista[]
  >([]);

  const [showDropdown, setShowDropdown] =
    useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // cerrar dropdown
  useEffect(() => {

    const handleClickOutside = (e: MouseEvent) => {

      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  // búsqueda
  useEffect(() => {

    if (search.trim().length < 2) {

      setResultados([]);

      setShowDropdown(false);

      return;
    }

    const timeout = setTimeout(async () => {

      try {

        const data =
          await productoService.getAll(0, 30);

        const filtrados = data.content.filter((p) =>
          p.nombre
            .toLowerCase()
            .includes(search.toLowerCase())
        );

        setResultados(filtrados);

        setShowDropdown(true);

      } catch (err) {

        console.error(
          "Error en búsqueda:",
          err
        );
      }

    }, 300);

    return () => clearTimeout(timeout);

  }, [search]);

  const handleSearchSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!search.trim()) return;

    window.location.href =
      `/productos?search=${encodeURIComponent(search)}`;
  };

  return {
    search,
    setSearch,
    resultados,
    showDropdown,
    setShowDropdown,
    searchRef,
    handleSearchSubmit,
  };
};