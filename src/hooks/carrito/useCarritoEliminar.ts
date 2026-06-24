// hooks/carrito/useCarritoEliminar.ts
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { carritoService } from "../../services/CarritoService";
import type { CarritoState } from './useCarritoState';

export const useCarritoEliminar = ({ setCarrito }: CarritoState) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // itemid = CarritoItem.iditem
  const eliminarDelCarrito = async (itemid: string): Promise<void> => {
    if (!isAuthenticated) { navigate("/login"); return; }
    try {
      const data = await carritoService.eliminarItem(itemid);
      setCarrito(data);
    } catch (err) {
      console.error("Error al eliminar item:", err);
    }
  };

  return { eliminarDelCarrito };
};
