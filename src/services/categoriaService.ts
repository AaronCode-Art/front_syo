import api from '../api/Api';
import type { CategoriaDetalle, CategoriaLista } from '../types/Categoria.types';

export const categoriaService = {

  /**
   * Obtiene todas las categorías en formato ligero
   * Se usa principalmente en SeccionCategorias.tsx para mostrar los cuadros
   */
  getAll: async (): Promise<CategoriaLista[]> => {
    const response = await api.get('/categorias');
    return response.data;
  },

  /**
   * Obtiene el detalle completo de una categoría (opcional por ahora)
   */
  getDetalle: async (id: string): Promise<CategoriaDetalle> => {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  }

};