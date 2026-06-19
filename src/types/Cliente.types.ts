// src/types/cliente.types.ts

/**
 * Tipos relacionados con el módulo de Cliente / Autenticación
 * Estos tipos coinciden con los DTOs del backend (Spring Boot)
 */

/** Datos que se envían al registrar un nuevo cliente */
export interface ClienteRegister {
  nombre: string;
  apellido: string;
  dni: string;
  numero: string;
  direccion: string;
  referencia?: string;
  distrito?: string;
  codigopostal?: string;
  correo: string;
  contrasena: string;
}

/** Datos que se envían al hacer login */
export interface ClienteLogin {
  correo: string;
  contrasena: string;
}

/** Datos que se reciben al hacer login exitoso (con token) */
export interface AuthResponse {
  token: string;
  tipo: string;           // "Bearer"
  idcliente: string;
  nombre: string;
  apellido: string;
  dni: string;
  numero: string;
  direccion: string;
  referencia?: string;
  distrito?: string;
  codigopostal?: string;
  correo: string;
}

/** Datos del perfil del cliente (sin contraseña) */
export interface ClientePerfil {
  idcliente: string;
  nombre: string;
  apellido: string;
  dni: string;
  numero: string;
  direccion: string;
  referencia?: string;
  distrito?: string;
  codigopostal?: string;
  correo: string;
}

/** Datos que se envían para actualizar el perfil */
export interface UpdateCliente {
  nombre?: string;
  apellido?: string;
  numero?: string;
  direccion?: string;
  referencia?: string;
  distrito?: string;
  codigopostal?: string;
  correo?: string;
  contrasena?: string;
}

/** Tipo completo del cliente (usado internamente en AuthContext) */
export interface Cliente {
  idcliente: string;
  nombre: string;
  apellido: string;
  dni: string;
  numero: string;
  direccion: string;
  referencia?: string;
  distrito?: string;
  codigopostal?: string;
  correo: string;
}

// Tipo auxiliar para el contexto de autenticación
export interface AuthContextType {
  user: Cliente | null;
  token: string | null;
  login: (userData: Cliente, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAuthLoading: boolean;     // ← AÑADIDO (importante)
  actualizarUsuario: (data: Partial<Cliente>) => void;
}