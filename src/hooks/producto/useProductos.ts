// hooks/productos/useProductos.ts

import { useEffect, useState } from "react";
import { productoService } from "../../services/productoService";
import type { ProductoLista } from "../../types/Producto.types";

export const useProductos = () => {

  const [productos, setProductos] = useState<ProductoLista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const obtenerProductos = async () => {

    try {

      setLoading(true);

      const response = await productoService.getAll();

      setProductos(response.content);

    } catch (err) {

      setError("Error al cargar productos");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    obtenerProductos();

  }, []);

  return {

    productos,
    loading,
    error,
    recargar: obtenerProductos,
  };
};