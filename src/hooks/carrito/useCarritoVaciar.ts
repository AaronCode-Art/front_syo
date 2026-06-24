// hooks/carrito/useCarritoVaciar.ts
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { carritoService } from "../../services/CarritoService";
import type { CarritoState } from './useCarritoState';

export const useCarritoVaciar = ({ setCarrito }: CarritoState) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const vaciarCarrito = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await carritoService.vaciarCarrito();
      setCarrito(null);
    } catch (err) {
      console.error(err);
    }
  };

  return { vaciarCarrito };
};