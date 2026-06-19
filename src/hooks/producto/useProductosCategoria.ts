// hooks/productos/useProductosCategoria.ts

import { useEffect, useState } from "react";
import { productoService } from "../../services/productoService";
import type { ProductoLista } from "../../types/Producto.types";

export const useProductosCategoria = (
  categoriaId?: string,
  limit?: number
) => {

  const [productos, setProductos] = useState<ProductoLista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const obtenerProductos = async () => {

    try {

      setLoading(true);

      let response;

      if (categoriaId) {

        response = await productoService.getByCategoria(
          categoriaId,
          0,
          limit || 20
        );

      } else {

        response = await productoService.getAll(
          0,
          limit || 20
        );
      }

      setProductos(response.content);

    } catch (err) {

      setError("Error al cargar productos");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    obtenerProductos();

  }, [categoriaId, limit]);

  return {

    productos,
    loading,
    error,
    recargar: obtenerProductos,
  };
};