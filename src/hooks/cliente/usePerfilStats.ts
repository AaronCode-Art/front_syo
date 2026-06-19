// hooks/cliente/usePerfilStats.ts
// Calcula estadísticas del historial de compras del cliente
// (delivery vs recojo, comprobantes, gasto total, último pedido)
// a partir de GET /api/pedidos/mis-pedidos.

import { useEffect, useState } from "react";
import { pedidoService } from "../../services/PedidoService";
import type { PedidoResumenDTO } from "../../types/pedido.types";

export interface PerfilStats {
  totalPedidos: number;
  totalDelivery: number;
  totalRecojo: number;
  totalBoleta: number;
  totalFactura: number;
  totalGastado: number;
  totalItemsComprados: number;
  ultimoPedido: PedidoResumenDTO | null;
  pedidoMasAlto: PedidoResumenDTO | null;
}

const STATS_VACIO: PerfilStats = {
  totalPedidos: 0,
  totalDelivery: 0,
  totalRecojo: 0,
  totalBoleta: 0,
  totalFactura: 0,
  totalGastado: 0,
  totalItemsComprados: 0,
  ultimoPedido: null,
  pedidoMasAlto: null,
};

const calcularStats = (pedidos: PedidoResumenDTO[]): PerfilStats => {
  if (pedidos.length === 0) return STATS_VACIO;

  // El backend ya los devuelve del más reciente al más antiguo
  const ordenados = [...pedidos].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const stats = pedidos.reduce<PerfilStats>((acc, p) => {
    const esDelivery = p.tipoentrega?.toLowerCase() === "delivery";
    const esBoleta = p.tipocomprobante?.toLowerCase() === "boleta";

    return {
      ...acc,
      totalPedidos: acc.totalPedidos + 1,
      totalDelivery: acc.totalDelivery + (esDelivery ? 1 : 0),
      totalRecojo: acc.totalRecojo + (esDelivery ? 0 : 1),
      totalBoleta: acc.totalBoleta + (esBoleta ? 1 : 0),
      totalFactura: acc.totalFactura + (esBoleta ? 0 : 1),
      totalGastado: acc.totalGastado + (p.total || 0),
      totalItemsComprados: acc.totalItemsComprados + (p.cantidadItems || 0),
      pedidoMasAlto:
        !acc.pedidoMasAlto || p.total > acc.pedidoMasAlto.total ? p : acc.pedidoMasAlto,
      ultimoPedido: acc.ultimoPedido,
    };
  }, STATS_VACIO);

  return { ...stats, ultimoPedido: ordenados[0] };
};

export const usePerfilStats = (habilitado: boolean) => {
  const [stats, setStats] = useState<PerfilStats>(STATS_VACIO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!habilitado) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);
        const pedidos = await pedidoService.obtenerMisPedidos();
        if (isMounted) setStats(calcularStats(pedidos));
      } catch (err) {
        console.error("Error al cargar estadísticas del perfil:", err);
        if (isMounted) setError("No se pudo cargar tu historial de compras");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    cargar();
    return () => {
      isMounted = false;
    };
  }, [habilitado]);

  return { stats, loading, error };
};