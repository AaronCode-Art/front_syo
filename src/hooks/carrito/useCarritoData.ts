// hooks/carrito/useCarritoData.ts
import { useEffect } from 'react';
import { carritoService } from '../../services/CarritoService';
import type { CarritoState } from './useCarritoState';

export const useCarritoData = (state: CarritoState) => {
  const { setCarrito, setLoading, setError } = state;

  const cargarCarrito = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await carritoService.getCarrito();
      setCarrito(data);
    } catch (err: any) {
      console.error("Error al cargar carrito:", err);
      setError("No se pudo cargar el carrito");
      setCarrito(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  return { recargarCarrito: cargarCarrito };
};