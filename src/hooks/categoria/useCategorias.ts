import { useEffect, useState } from 'react';
import { categoriaService } from '../../services/categoriaService';
import type { CategoriaLista } from '../../types/Categoria.types';

/**
 * Custom Hook: useCategorias
 * Separa toda la lógica de carga de categorías del componente UI
 */
export const useCategorias = () => {
  const [categorias, setCategorias] = useState<CategoriaLista[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await categoriaService.getAll();
        setCategorias(data);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
        setError('No se pudieron cargar las categorías. Inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    cargarCategorias();
  }, []); // Solo se ejecuta una vez al montar

  return { categorias, loading, error };
};