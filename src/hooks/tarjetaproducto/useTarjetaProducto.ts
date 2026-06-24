import React from "react";

import type {
  ProductoLista
} from "../../types/Producto.types";

export const useTarjetaProducto = (

  producto: ProductoLista,

  onAgregarAlCarrito?: (
    productoId: string,
    cantidad?: number
  ) => Promise<boolean>

) => {

  const sinStock =
    producto.stock <= 0;

  const handleComprarClick = async (
    e: React.MouseEvent
  ) => {

    // evita abrir detalle
    e.preventDefault();

    // evita propagación
    e.stopPropagation();

    if (sinStock) return false;

    const ok =
      await onAgregarAlCarrito?.(
        producto.idproducto,
        1
      );

    return ok ?? false;
  };

  return {
    sinStock,
    handleComprarClick,
  };
};