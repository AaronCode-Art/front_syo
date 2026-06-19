import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Cliente, AuthResponse, AuthContextType } from '../types/Cliente.types';
import { clienteService } from '../services/clienteService';

/**
 * AuthContext - Contexto global de autenticación
 * Maneja el usuario y el token JWT de forma persistente
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [user, setUser] = useState<Cliente | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);   // ← Nuevo: evita flash

  // Cargar sesión guardada al iniciar la aplicación
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      try {
        const parsedUser: Cliente = JSON.parse(savedUser);
        setUser(parsedUser);
        setToken(savedToken);

        // Si faltan campos (dni, dirección, etc.) por sesiones antiguas
        // que no los incluían, refrescamos el perfil completo desde el backend.
        const faltanDatos = !parsedUser.dni || !parsedUser.direccion;
        if (faltanDatos) {
          clienteService.obtenerPerfil(parsedUser.idcliente)
            .then(perfil => {
              const actualizado = { ...parsedUser, ...perfil };
              setUser(actualizado);
              localStorage.setItem('user', JSON.stringify(actualizado));
            })
            .catch(() => { /* si falla, se mantiene lo que había en localStorage */ });
        }
      } catch (e) {
        console.error("Error al parsear usuario guardado");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }

    setIsAuthLoading(false);   // ← Ya terminó de cargar
  }, []);

  const login = (userData: Cliente, jwtToken: string) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Actualiza parcialmente los datos del usuario (ej: tras editar su dirección)
  const actualizarUsuario = (data: Partial<Cliente>) => {
    setUser(prev => {
      if (!prev) return prev;
      const actualizado = { ...prev, ...data };
      localStorage.setItem('user', JSON.stringify(actualizado));
      return actualizado;
    });
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated,
      isAuthLoading,          // ← Nuevo
      actualizarUsuario,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook para usar el contexto de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};