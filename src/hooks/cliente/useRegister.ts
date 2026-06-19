import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { clienteService } from "../../services/clienteService";

import { useSession } from "./useSession";

import type {
  ClienteRegister,
  ClienteLogin,
  Cliente,
} from "../../types/Cliente.types";

export const useRegister = () => {

  const navigate = useNavigate();

  const { login } = useSession();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validarFormulario = (form: ClienteRegister): string => {

    if (form.dni.length !== 8) {
      return "El DNI debe tener 8 dígitos";
    }

    if (
      form.numero.length !== 9 ||
      !form.numero.startsWith("9")
    ) {
      return "El teléfono debe tener 9 dígitos";
    }

    if (!form.correo.includes("@")) {
      return "Correo inválido";
    }

    if (form.contrasena.length < 8) {
      return "La contraseña debe tener mínimo 8 caracteres";
    }

    return "";
  };

  const registrarUsuario = async (form: ClienteRegister) => {

    try {

      setLoading(true);
      setError("");

      const errorValidacion = validarFormulario(form);

      if (errorValidacion) {
        setError(errorValidacion);
        return false;
      }

      await clienteService.registro(form);

      const loginData: ClienteLogin = {
        correo: form.correo,
        contrasena: form.contrasena,
      };

      const response = await clienteService.login(loginData);

      const userData: Cliente = {
        idcliente: response.idcliente,
        nombre: response.nombre,
        apellido: response.apellido,
        dni: form.dni,
        numero: form.numero,
        direccion: form.direccion,
        referencia: form.referencia,
        distrito: form.distrito,
        codigopostal: form.codigopostal,
        correo: response.correo,
      };

      login(userData, response.token);

      navigate("/perfil");

      return true;

    } catch (err: any) {

      const msg =
        (
          err.response?.data?.message ||
          err.message ||
          ""
        ).toLowerCase();

      if (msg.includes("dni")) {
        setError("El DNI ya está registrado");
      } else if (msg.includes("correo")) {
        setError("El correo ya está registrado");
      } else {
        setError("Error al registrar usuario");
      }

      return false;

    } finally {
      setLoading(false);
    }
  };

  return {
    registrarUsuario,
    loading,
    error,
    setError,
  };
};