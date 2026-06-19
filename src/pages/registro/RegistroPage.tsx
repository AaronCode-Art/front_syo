import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useRegister } from "../../hooks/cliente/useRegister";

import type {
  ClienteRegister,
} from "../../types/Cliente.types";

import "./registropage.css";

const RegistroPage: React.FC = () => {

  const [form, setForm] =
    useState<ClienteRegister>({
      nombre: "",
      apellido: "",
      dni: "",
      numero: "",
      direccion: "",
      referencia: "",
      distrito: "",
      codigopostal: "",
      correo: "",
      contrasena: "",
    });

  const {
    registrarUsuario,
    loading,
    error,
  } = useRegister();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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

    await registrarUsuario(form);
  };

  const distritosLima = [
    "Miraflores",
    "San Isidro",
    "Surco",
    "La Molina",
    "Barranco",
    "San Miguel",
    "Jesús María",
    "Lince",
    "Magdalena",
    "Pueblo Libre",
    "Surquillo",
    "San Borja",
    "Chorrillos",
    "Villa El Salvador",
    "Villa María del Triunfo",
    "Ate",
    "Santa Anita",
    "Breña",
    "Rímac",
    "Cercado de Lima",
    "Los Olivos",
    "Comas",
    "Independencia",
  ];

  return (
    <div className="auth-page">

      <div className="auth-container">

        <h1 className="auth-title">
          Crear Cuenta
        </h1>

        <p className="auth-subtitle">
          Únete a S&O Repuestos
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

          <div className="form-row">

            <div className="form-group">
              <label>Nombre</label>

              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Apellido</label>

              <input
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>DNI</label>

            <input
              type="text"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              required
              maxLength={8}
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>

            <input
              type="text"
              name="numero"
              value={form.numero}
              onChange={handleChange}
              required
              maxLength={9}
            />
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>

            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
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
            />
          </div>

          <div className="form-group">
            <label>Distrito</label>

            <select
              name="distrito"
              value={form.distrito}
              onChange={handleChange}
              required
            >
              <option value="">
                Selecciona tu distrito
              </option>

              {distritosLima.map((distrito) => (
                <option
                  key={distrito}
                  value={distrito}
                >
                  {distrito}
                </option>
              ))}

            </select>
          </div>

          <div className="form-group">
            <label>Código Postal</label>

            <input
              type="text"
              name="codigopostal"
              value={form.codigopostal}
              onChange={handleChange}
              maxLength={5}
            />
          </div>

          <div className="form-group">
            <label>Dirección</label>

            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Referencia</label>

            <input
              type="text"
              name="referencia"
              value={form.referencia}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? "Registrando..."
              : "Crear Cuenta"}
          </button>

        </form>

        <p className="auth-link">

          ¿Ya tienes cuenta?{" "}

          <Link
            to="/login"
            className="auth-link-highlight"
          >
            Inicia sesión aquí
          </Link>

        </p>

      </div>

    </div>
  );
};

export default RegistroPage;