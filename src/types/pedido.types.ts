// src/types/pedido.types.ts
// Coincide exactamente con los DTOs del backend (PedidoResumenDTO, PedidoDetalleDTO, ConfirmarPedidoDTO)

// ── Listado de pedidos (GET /api/pedidos/mis-pedidos) ─────────────────────────
export interface PedidoResumenDTO {
  idpedido: string;
  nroticket: string;
  fecha: string;            // ISO string
  estado: string;
  tipoentrega: string;      // "delivery" | "recojo"
  tipocomprobante: string;  // "boleta" | "factura"
  total: number;
  cantidadItems: number;
}

// ── Detalle completo (GET /api/pedidos/{id}) ──────────────────────────────────
export interface PedidoItemDTO {
  iddetalle: string;
  productoid: string;
  nombreProducto: string;
  imgurl: string;
  cantidad: number;
  preciounitario: number;
  descuento: number;
  preciototal: number;
}

export interface PedidoHistorialDTO {
  estado: string;
  fecha: string;            // ISO string
}

export interface PedidoPagoDTO {
  idpago: string;
  fechapago: string;
  estadopago: string;
  metodopago: string;
}

export interface DireccionPedidoDTO {
  iddireccion: string;
  direccion: string;
  referencia?: string;
  distrito?: string;
  codigopostal?: string;
}

export interface PedidoDetalleDTO {
  idpedido: string;
  nroticket: string;
  fecha: string;
  estadoActual: string;
  tipoentrega: string;
  tipocomprobante: string;
  total: number;
  items: PedidoItemDTO[];
  historial: PedidoHistorialDTO[];
  pago: PedidoPagoDTO | null;
  direccion: DireccionPedidoDTO | null; // null si tipoentrega = "recojo"
}

// ── Confirmar compra (POST /api/pedidos/confirmar) ────────────────────────────
export interface ConfirmarDireccionDTO {
  direccion: string;
  referencia?: string;
  distrito?: string;
  codigopostal?: string;
}

export interface ConfirmarPedidoDTO {
  tipoentrega: 'delivery' | 'recojo';
  tipocomprobante: 'boleta' | 'factura';
  metodopago: 'yape' | 'plin' | 'tarjeta_credito' | 'tarjeta_debito' | 'transferencia' | 'efectivo';
  direccion: ConfirmarDireccionDTO | null;
}
