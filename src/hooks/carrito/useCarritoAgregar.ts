// hooks/carrito/useCarritoAgregar.ts
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { carritoService } from "../../services/CarritoService";
import type { CarritoState } from './useCarritoState';

export const useCarritoAgregar = ({ setCarrito }: CarritoState) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // productoid: UUID del producto | cantidad: mínimo 1
  const agregarAlCarrito = async (productoid: string, cantidad: number = 1): Promise<boolean> => {
    if (!isAuthenticated) {
      navigate("/login");
      return false;
    }
    try {
      const data = await carritoService.agregarProducto({ productoid, cantidad });
      setCarrito(data);
      return true;
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      return false;
    }
  };

  return { agregarAlCarrito };
};
