// hooks/productos/useProductosPaginacion.ts

import { useState } from "react";

export const useProductosPaginacion = () => {

  const [page, setPage] = useState(0);

  const nextPage = () => {

    setPage((prev) => prev + 1);
  };

  const prevPage = () => {

    if (page > 0) {

      setPage((prev) => prev - 1);
    }
  };

  const goToPage = (
    newPage: number
  ) => {

    setPage(newPage);
  };

  return {

    page,
    setPage,
    nextPage,
    prevPage,
    goToPage,
  };
};