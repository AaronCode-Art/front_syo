// hooks/carrito/useCarrito.ts

import { useCarritoState } from "./useCarritoState";

import { useCarritoData } from "./useCarritoData";
import { useCarritoAgregar } from "./useCarritoAgregar";
import { useCarritoCantidad } from "./useCarritoCantidad";
import { useCarritoEliminar } from "./useCarritoEliminar";
import { useCarritoVaciar } from "./useCarritoVaciar";
import { useCarritoTotal } from "./useCarritoTotal";

export const useCarrito = () => {

  const state =
    useCarritoState();

  const data =
    useCarritoData(state);

  const agregar =
    useCarritoAgregar(state);

  const cantidad =
    useCarritoCantidad(state);

  const eliminar =
    useCarritoEliminar(state);

  const vaciar =
    useCarritoVaciar(state);

  const total =
    useCarritoTotal(
      state.carrito
    );

  return {

    ...state,

    ...data,

    ...agregar,

    ...cantidad,

    ...eliminar,

    ...vaciar,

    ...total,
  };
};