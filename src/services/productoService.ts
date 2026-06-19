import api from '../api/Api';
import type { ProductoLista, PageResponse } from '../types/Producto.types';

export const productoService = {

  getByCategoria: async (
    categoriaId: string,
    page: number = 0,
    size: number = 20
  ): Promise<PageResponse<ProductoLista>> => {
    const response = await api.get(`/productos/categoria/${categoriaId}`, {
      params: { page, size }
    });
    return response.data;
  },

  getAll: async (page: number = 0, size: number = 20): Promise<PageResponse<ProductoLista>> => {
    const response = await api.get('/productos', {
      params: { page, size }
    });
    return response.data;
  },

  getDetalle: async (id: string) => {
    const response = await api.get(`/productos/detalle/${id}`);
    return response.data;
  },

  /**
 * Obtiene los productos más baratos (ordenados por preciodesct)
 */
getMasBaratos: async (limit: number = 5): Promise<ProductoLista[]> => {
  const response = await api.get('/productos', {
    params: { 
      page: 0, 
      size: 50, 
      sort: 'preciodesct,asc' 
    }
  });
  const data: PageResponse<ProductoLista> = response.data;
  return data.content.slice(0, limit);
},

/**
   * BÚSQUEDA AVANZADA CON FILTROS
   * Este método es el que usa tu página de productos
   */
  buscarConFiltros: async (
    categoriaId?: string,
    precioMin?: number,
    precioMax?: number,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<PageResponse<ProductoLista>> => {

    const params: any = {
      page: 0,
      size: 50,
      sort: sort === 'asc' ? 'preciodesct,asc' : 'preciodesct,desc'
    };

    if (categoriaId) params.categoriaId = categoriaId;
    if (precioMin !== undefined) params.precioMin = precioMin;
    if (precioMax !== undefined) params.precioMax = precioMax;

    const response = await api.get('/productos', { params });
    return response.data;
  }
};