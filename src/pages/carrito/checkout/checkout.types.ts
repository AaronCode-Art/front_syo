// src/pages/carrito/checkout/checkout.types.ts
// Tipos compartidos entre los componentes del flujo de checkout.

import type { ConfirmarPedidoDTO, PedidoDetalleDTO } from '../../../types/pedido.types';

export type CheckoutStep = 'entrega' | 'comprobante' | 'pago' | 'procesando' | 'boleta';

export interface DireccionForm {
  direccion: string;
  referencia: string;
  distrito: string;
  codigopostal: string;
}

export const DIRECCION_VACIA: DireccionForm = {
  direccion: '',
  referencia: '',
  distrito: '',
  codigopostal: '',
};

// ── Helpers de formato compartidos ──────────────────────────────────────────
export const formatMetodo = (m: string): string =>
  ({
    yape: '💜 Yape',
    plin: '💚 Plin',
    tarjeta_credito: '💳 T. Crédito',
    tarjeta_debito: '💳 T. Débito',
    transferencia: '🏦 Transferencia',
    efectivo: '💵 Efectivo',
  }[m] ?? m);

export const formatTarjeta = (v: string): string =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

export type { ConfirmarPedidoDTO, PedidoDetalleDTO };
