// hooks/productos/useProductosBusqueda.ts

import {
  useEffect,
  useState,
} from "react";

import { productoService } from "../../services/productoService";

import type {
  ProductoLista,
} from "../../types/Producto.types";

export const useProductosBusqueda = (
  search: string
) => {

  const [productos, setProductos] =
    useState<ProductoLista[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    if (!search.trim()) {

      setProductos([]);

      return;
    }

    const buscar = async () => {

      try {

        setLoading(true);

        const data =
          await productoService.getAll(0, 50);

        const filtrados = data.content.filter(
          (p) =>
            p.nombre
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );

        setProductos(filtrados);

      } catch (err) {

        setError(
          "Error al buscar productos"
        );

      } finally {

        setLoading(false);
      }
    };

    buscar();

  }, [search]);

  return {
    productos,
    loading,
    error,
  };
};