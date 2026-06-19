// src/services/CarritoService.ts
import api from '../api/Api';
import type { CarritoResponseDTO, AgregarCarritoDTO, ActualizarItemDTO } from '../types/Carrito.types';

/**
 * Servicio del carrito. Coincide exactamente con CarritoController del backend.
 *
 * GET    /api/carrito              → obtener carrito
 * POST   /api/carrito/agregar      → agregar producto { productoid, cantidad }
 * PUT    /api/carrito/item/{id}    → actualizar cantidad de un item { cantidad }
 * DELETE /api/carrito/item/{id}    → eliminar un item
 * DELETE /api/carrito              → vaciar todo el carrito
 */
export const carritoService = {

  getCarrito: async (): Promise<CarritoResponseDTO> => {
    const response = await api.get('/carrito');
    return response.data;
  },

  // body: { productoid: uuid, cantidad: number }
  agregarProducto: async (dto: AgregarCarritoDTO): Promise<CarritoResponseDTO> => {
    const response = await api.post('/carrito/agregar', dto);
    return response.data;
  },

  // itemid = CarritoItem.iditem (NO es el productoid)
  // body: { cantidad: number }  — si cantidad = 0 el backend elimina el item
  actualizarItem: async (itemid: string, dto: ActualizarItemDTO): Promise<CarritoResponseDTO> => {
    const response = await api.put(`/carrito/item/${itemid}`, dto);
    return response.data;
  },

  // itemid = CarritoItem.iditem
  eliminarItem: async (itemid: string): Promise<CarritoResponseDTO> => {
    const response = await api.delete(`/carrito/item/${itemid}`);
    return response.data;
  },

  vaciarCarrito: async (): Promise<void> => {
    await api.delete('/carrito');
  },
};
