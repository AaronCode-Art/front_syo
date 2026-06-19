// src/services/PedidoService.ts
import api from '../api/Api';
import type { PedidoResumenDTO, PedidoDetalleDTO, ConfirmarPedidoDTO } from '../types/pedido.types';

/**
 * Servicio de pedidos. Coincide exactamente con PedidoController del backend.
 *
 * POST /api/pedidos/confirmar          → confirmar compra desde el carrito
 * GET  /api/pedidos/mis-pedidos        → todos mis pedidos
 * GET  /api/pedidos/{id}               → detalle completo
 * GET  /api/pedidos/estado?nombre=...  → filtrar por estado
 */
export const pedidoService = {

  // Lee el carrito del cliente autenticado, crea pedido, procesa pago y vacía el carrito.
  confirmarPedido: async (dto: ConfirmarPedidoDTO): Promise<PedidoDetalleDTO> => {
    const response = await api.post('/pedidos/confirmar', dto);
    return response.data;
  },

  // Todos los pedidos del cliente, del más reciente al más antiguo
  obtenerMisPedidos: async (): Promise<PedidoResumenDTO[]> => {
    const response = await api.get('/pedidos/mis-pedidos');
    return response.data;
  },

  // Detalle completo: items + historial + pago + dirección
  obtenerDetalle: async (pedidoid: string): Promise<PedidoDetalleDTO> => {
    const response = await api.get(`/pedidos/${pedidoid}`);
    return response.data;
  },

  // Filtrar por estado: "Pendiente" | "En preparacion" | "Enviado" | "Entregado" | "Cancelado"
  obtenerPorEstado: async (estado: string): Promise<PedidoResumenDTO[]> => {
    const response = await api.get(`/pedidos/estado?nombre=${encodeURIComponent(estado)}`);
    return response.data;
  },
};
