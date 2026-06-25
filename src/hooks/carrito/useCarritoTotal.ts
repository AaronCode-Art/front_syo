// hooks/carrito/useCarritoTotal.ts
import type { CarritoResponseDTO } from "../../types/Carrito.types";

export const useCarritoTotal = (carrito: CarritoResponseDTO | null) => {

  // Cantidad total de unidades en el carrito (para el badge del header)
  const totalItems = carrito?.cantidadProductos ?? 0;

  // Total en soles (viene calculado desde el backend)
  const totalPrecio = carrito?.total ?? 0;

  return { totalItems, totalPrecio };
};
