import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { clienteService } from "../../services/clienteService";
import { useSession } from "./useSession";

import type {
  ClienteLogin,
  Cliente,
} from "../../types/Cliente.types";

export const useLogin = () => {
  const navigate = useNavigate();

  const { login } = useSession();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const iniciarSesion = async (form: ClienteLogin) => {
    try {
      setLoading(true);
      setError("");

      const response = await clienteService.login(form);

      const userData: Cliente = {
        idcliente: response.idcliente,
        nombre: response.nombre,
        apellido: response.apellido,
        dni: response.dni,
        numero: response.numero,
        direccion: response.direccion,
        referencia: response.referencia,
        distrito: response.distrito,
        codigopostal: response.codigopostal,
        correo: response.correo,
      };

      login(userData, response.token);

      navigate("/perfil");

      return true;

    } catch (err: any) {

      setError(
        err.response?.data?.message ||
        "Correo o contraseña incorrectos"
      );

      return false;

    } finally {
      setLoading(false);
    }
  };

  return {
    iniciarSesion,
    loading,
    error,
    setError,
  };
};