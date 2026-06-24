import { useState } from 'react';
import type { CarritoResponseDTO } from '../../types/Carrito.types';

export interface CarritoState {
  carrito: CarritoResponseDTO | null;
  setCarrito: React.Dispatch<React.SetStateAction<CarritoResponseDTO | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useCarritoState = (): CarritoState => {
  const [carrito, setCarrito] = useState<CarritoResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return {
    carrito,
    setCarrito,
    loading,
    setLoading,
    error,
    setError,
  };
};