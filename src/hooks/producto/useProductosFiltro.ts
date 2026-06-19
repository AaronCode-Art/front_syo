// hooks/productos/useProductosFiltros.ts

import {
  useEffect,
  useState,
} from "react";

import {
  productoService,
} from "../../services/productoService";

import type {
  ProductoLista,
} from "../../types/Producto.types";

interface Filtros {
  categoriaId?: string;
  precioMin?: number;
  precioMax?: number;
  sort?: "asc" | "desc";
}

export const useProductosFiltro = (
  filtros: Filtros
) => {

  const [productos, setProductos] =
    useState<ProductoLista[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ← NUEVO
  const [error, setError] =
    useState<string | null>(null);

 useEffect(() => {

  const cargar = async () => {

    try {

      setLoading(true);

      setError(null);

      const data =
        await productoService.buscarConFiltros(
          filtros.categoriaId,
          filtros.precioMin,
          filtros.precioMax,
          filtros.sort
        );

      setProductos(data.content);

    } catch (err) {

      console.error(err);

      setError(
        "Error al cargar productos"
      );

    } finally {

      setLoading(false);
    }
  };

  cargar();

}, [
  filtros.categoriaId,
  filtros.precioMin,
  filtros.precioMax,
  filtros.sort
]);

  return {
    productos,
    loading,
    error, // ← NUEVO
  };
};