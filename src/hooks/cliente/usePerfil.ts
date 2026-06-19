import { useCallback } from "react";

import { clienteService } from "../../services/clienteService";

import { useSession } from "./useSession";

import type {
  UpdateCliente,
} from "../../types/Cliente.types";

export const usePerfil = () => {

  const {
    user,
    logout,
  } = useSession();

  const obtenerPerfil = useCallback(async () => {

    if (!user?.idcliente) {
      throw new Error("No hay usuario logueado");
    }

    return await clienteService.obtenerPerfil(user.idcliente);

  }, [user]);

  const actualizarPerfil = useCallback(
    async (data: UpdateCliente) => {

      if (!user?.idcliente) {
        throw new Error("No hay usuario logueado");
      }

      return await clienteService.actualizarPerfil(
        user.idcliente,
        data
      );

    },
    [user]
  );

  const eliminarCuenta = useCallback(async () => {

    if (!user?.idcliente) {
      throw new Error("No hay usuario logueado");
    }

    await clienteService.eliminarCuenta(user.idcliente);

    logout();

  }, [user, logout]);

  return {
    obtenerPerfil,
    actualizarPerfil,
    eliminarCuenta,
  };
};