// hooks/productos/useProductoDetalle.ts

import { useEffect, useState } from "react";
import { productoService } from "../../services/productoService";
import type { ProductoDetalle } from "../../types/Producto.types";

export const useProductoDetalle = (
  id: string
) => {

  const [producto, setProducto] =
    useState<ProductoDetalle | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const obtenerDetalle = async () => {

    try {

      setLoading(true);

      const data =
        await productoService.getDetalle(id);

      setProducto(data);

    } catch (err) {

      setError("Error al cargar producto");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    if (id) {

      obtenerDetalle();
    }

  }, [id]);

  return {

    producto,
    loading,
    error,
    recargar: obtenerDetalle,
  };
};