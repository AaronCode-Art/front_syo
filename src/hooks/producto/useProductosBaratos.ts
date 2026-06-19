// hooks/productos/useProductosBaratos.ts

import {
  useEffect,
  useState,
} from "react";

import { productoService } from "../../services/productoService";

import type {
  ProductoLista,
} from "../../types/Producto.types";

export const useProductosBaratos = (
  limit: number = 5
) => {

  const [productos, setProductos] =
    useState<ProductoLista[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const cargar = async () => {

      try {

        const data =
          await productoService.getMasBaratos(
            limit
          );

        setProductos(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    cargar();

  }, [limit]);

  return {
    productos,
    loading,
  };
};