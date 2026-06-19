import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/cliente/useLogin";
import type {ClienteLogin,} from "../../types/Cliente.types";
import "./loguinpage.css";

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<ClienteLogin>({
    correo: "",
    contrasena: "",
  });

  const {
    iniciarSesion,
    loading,
    error,
  } = useLogin();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    await iniciarSesion(form);
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        <h1 className="auth-title">
          Iniciar Sesión
        </h1>

        <p className="auth-subtitle">
          Bienvenido a S&O Repuestos
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          <div className="form-group">
            <label>Correo electrónico</label>

            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>

            <input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? "Ingresando..."
              : "Iniciar Sesión"}
          </button>

        </form>

        <p className="auth-link">
          ¿No tienes cuenta?{" "}

          <Link
            to="/registro"
            className="auth-link-highlight"
          >
            Regístrate aquí
          </Link>
        </p>

      </div>

    </div>
  );
};

export default LoginPage;