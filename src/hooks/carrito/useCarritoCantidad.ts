// hooks/carrito/useCarritoCantidad.ts
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { carritoService } from "../../services/CarritoService";
import type { CarritoState } from './useCarritoState';

export const useCarritoCantidad = ({ setCarrito }: CarritoState) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // itemid = CarritoItem.iditem (el UUID del item en carritoitems, NO el productoid)
  const cambiarCantidad = async (itemid: string, cantidad: number): Promise<void> => {
    if (!isAuthenticated) { navigate("/login"); return; }
    if (cantidad < 1) return; // evita enviar 0 (el backend lo eliminaría)
    try {
      const data = await carritoService.actualizarItem(itemid, { cantidad });
      setCarrito(data);
    } catch (err) {
      console.error("Error al cambiar cantidad:", err);
    }
  };

  return { cambiarCantidad };
};
