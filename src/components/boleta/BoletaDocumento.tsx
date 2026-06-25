// src/components/boleta/BoletaDocumento.tsx
// Componente de boleta formal — usado tanto en la confirmación de pago
// como en el modal de "Ver boleta" de la página de pedidos.
// Se puede imprimir o descargar desde aquí.

import React, { useRef } from 'react';
import type { PedidoDetalleDTO } from '../../types/pedido.types';
import './boleta.css';

// ── Helpers ────────────────────────────────────────────────────────────────────
const formatFechaHora = (iso: string) =>
  new Date(iso).toLocaleString('es-PE', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

const formatMetodo = (m: string): string =>
  ({
    yape: 'Yape',
    plin: 'Plin',
    tarjeta_credito: 'Tarjeta de crédito',
    tarjeta_debito: 'Tarjeta de débito',
    transferencia: 'Transferencia bancaria',
    efectivo: 'Efectivo',
  }[m] ?? m);

// ── Props ──────────────────────────────────────────────────────────────────────
interface BoletaDocumentoProps {
  pedido: PedidoDetalleDTO;
  nombreCliente: string;      // nombre + apellido del usuario autenticado
  dniCliente?: string;
  onCerrar?: () => void;
}

// ── Componente ─────────────────────────────────────────────────────────────────
const BoletaDocumento: React.FC<BoletaDocumentoProps> = ({
  pedido,
  nombreCliente,
  dniCliente,
  onCerrar,
}) => {
  const docRef = useRef<HTMLDivElement>(null);

  // ── Imprimir solo el documento ─────────────────────────────────────────────
  const handleImprimir = () => {
    const contenido = docRef.current?.innerHTML;
    if (!contenido) return;

    const ventana = window.open('', '_blank', 'width=800,height=900');
    if (!ventana) return;

    ventana.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>${pedido.tipocomprobante.toUpperCase()} ${pedido.nroticket}</title>
        <style>
          @page { size: A4; margin: 14mm; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { font-family: Arial, Helvetica, sans-serif; color: #111; background: #fff; }
          body { padding: 0; font-size: 12px; line-height: 1.45; }
          .boleta-print-wrap { max-width: 100%; margin: 0 auto; }

          .bp-header { display: flex; justify-content: space-between; align-items: flex-start;
            border-bottom: 3px solid #c0392b; padding-bottom: 14px; margin-bottom: 14px; }
          .bp-logo { font-size: 1.9rem; font-weight: 900; color: #c0392b; letter-spacing: -1px; line-height: 1; }
          .bp-logo small { display: block; font-size: 0.6rem; color: #888; font-weight: 400;
            letter-spacing: 0.05em; text-transform: uppercase; margin-top: 2px; }
          .bp-empresa { font-size: 0.72rem; color: #555; text-align: right; line-height: 1.6; }
          .bp-comprobante { text-align: right; }
          .bp-tipo { font-size: 1.05rem; font-weight: 800; color: #111; margin-bottom: 4px; }
          .bp-ticket { color: #c0392b; font-weight: 700; font-size: 0.95rem; margin-bottom: 2px; }
          .bp-fecha { font-size: 0.74rem; color: #777; }

          .bp-bloque { background: #f9f9f9; border: 1px solid #eee; border-radius: 8px;
            padding: 12px 14px; margin-bottom: 12px; font-size: 0.78rem; page-break-inside: avoid; }
          .bp-bloque-titulo { font-weight: 800; font-size: 0.66rem; text-transform: uppercase;
            letter-spacing: 0.08em; color: #888; margin-bottom: 8px; }

          .bp-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 18px; }
          .bp-fila { display: flex; justify-content: space-between; align-items: flex-start;
            font-size: 0.78rem; gap: 8px; }
          .bp-fila > span:first-child { color: #888; flex-shrink: 0; }
          .bp-fila > span:last-child { font-weight: 600; text-align: right; word-break: break-word; }
          .bp-fila-full { grid-column: 1 / -1; }
          .pago-ok { color: #27ae60; font-weight: 700; }
          .capitalize { text-transform: capitalize; }

          table.bp-tabla { width: 100%; border-collapse: collapse; font-size: 0.76rem; }
          .bp-tabla thead th { background: #c0392b; color: #fff; padding: 6px 8px; text-align: left;
            font-weight: 700; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.04em; }
          .bp-tabla thead th:first-child { border-radius: 4px 0 0 0; }
          .bp-tabla thead th:last-child { border-radius: 0 4px 0 0; }
          .bp-tabla tbody tr:nth-child(even) { background: #f3f3f3; }
          .bp-tabla tbody td { padding: 6px 8px; border-bottom: 1px solid #ebebeb; color: #333;
            vertical-align: middle; word-break: break-word; }
          .td-center { text-align: center; }
          .td-right { text-align: right; }

          .bp-subtotal-row td { padding: 4px 8px; font-size: 0.74rem; color: #777; border: none; }

          .bp-total-row td { background: #111 !important; color: #fff !important;
            font-weight: 800; font-size: 0.85rem; padding: 8px; border: none;
            -webkit-print-color-adjust: exact; print-color-adjust: exact; }

          .bp-pie { text-align: center; font-size: 0.7rem; color: #aaa; margin-top: 16px;
            padding-top: 12px; border-top: 1px solid #eee; display: flex; flex-direction: column; gap: 3px; }
          .bp-pie strong { color: #888; }

          @media print {
            .bp-bloque, table.bp-tabla, .bp-header { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="boleta-print-wrap">${contenido}</div>
      </body>
      </html>
    `);
    ventana.document.close();
    ventana.focus();
    setTimeout(() => { ventana.print(); }, 400);
  };

  return (
    <div className="boleta-wrapper">

      {/* ── Barra de acciones (no se imprime) ── */}
      <div className="boleta-acciones-bar">
        <div className="boleta-acciones-left">
          <span className="boleta-acciones-ticket">
            🧾 {pedido.tipocomprobante.charAt(0).toUpperCase() + pedido.tipocomprobante.slice(1)} — {pedido.nroticket}
          </span>
        </div>
        <div className="boleta-acciones-right">
          <button className="btn-boleta-imprimir" onClick={handleImprimir}>
            🖨️ Imprimir / Descargar
          </button>
          {onCerrar && (
            <button className="btn-boleta-cerrar" onClick={onCerrar}>✕</button>
          )}
        </div>
      </div>

      {/* ── Documento (lo que se imprime) ── */}
      <div className="boleta-documento" ref={docRef}>

        {/* Cabecera */}
        <div className="bp-header">
          <div>
            <div className="bp-logo">
              S&O
              <small>Repuestos</small>
            </div>
            <div className="bp-empresa">
              <p>SyO Repuestos S.A.C.</p>
              <p>RUC: 20123456789</p>
              <p>Av. Principal 123, Lima, Perú</p>
              <p>soporte@syo-repuestos.com</p>
            </div>
          </div>
          <div className="bp-comprobante">
            <p className="bp-tipo">
              {pedido.tipocomprobante === 'boleta' ? 'BOLETA DE VENTA' : 'FACTURA ELECTRÓNICA'}
            </p>
            <p className="bp-ticket">{pedido.nroticket}</p>
            <p className="bp-fecha">{formatFechaHora(pedido.fecha)}</p>
          </div>
        </div>

        {/* Datos del cliente y entrega */}
        <div className="bp-bloque">
          <p className="bp-bloque-titulo">Datos del pedido</p>
          <div className="bp-grid-2">
            <div className="bp-fila">
              <span>Cliente</span>
              <span><strong>{nombreCliente}</strong></span>
            </div>
            {dniCliente && (
              <div className="bp-fila">
                <span>DNI</span>
                <span>{dniCliente}</span>
              </div>
            )}
            <div className="bp-fila">
              <span>Comprobante</span>
              <span className="capitalize">{pedido.tipocomprobante}</span>
            </div>
            <div className="bp-fila">
              <span>Tipo de entrega</span>
              <span>{pedido.tipoentrega === 'delivery' ? '🚚 Delivery' : '🏪 Recojo en tienda'}</span>
            </div>
            {pedido.pago && (
              <>
                <div className="bp-fila">
                  <span>Método de pago</span>
                  <span>{formatMetodo(pedido.pago.metodopago)}</span>
                </div>
                <div className="bp-fila">
                  <span>Estado del pago</span>
                  <span className="pago-ok">✅ {pedido.pago.estadopago}</span>
                </div>
              </>
            )}
            {pedido.direccion && (
              <div className="bp-fila bp-fila-full">
                <span>Dirección de entrega</span>
                <span>
                  {pedido.direccion.direccion}
                  {pedido.direccion.referencia && ` — Ref: ${pedido.direccion.referencia}`}
                  {pedido.direccion.distrito && `, ${pedido.direccion.distrito}`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="bp-bloque">
          <p className="bp-bloque-titulo">Detalle de productos</p>
          <table className="bp-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th className="td-center">Cant.</th>
                <th className="td-right">P. Unit.</th>
                <th className="td-right">Desc.</th>
                <th className="td-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {pedido.items.map((item) => (
                <tr key={item.iddetalle}>
                  <td>{item.nombreProducto}</td>
                  <td className="td-center">{item.cantidad}</td>
                  <td className="td-right">S/ {item.preciounitario.toFixed(2)}</td>
                  <td className="td-right">
                    {item.descuento > 0 ? `${item.descuento}%` : '—'}
                  </td>
                  <td className="td-right">S/ {item.preciototal.toFixed(2)}</td>
                </tr>
              ))}
              {/* Filas de totales */}
              <tr className="bp-subtotal-row">
                <td colSpan={4} className="td-right">Subtotal</td>
                <td className="td-right">S/ {(pedido.total / 1.18).toFixed(2)}</td>
              </tr>
              <tr className="bp-subtotal-row">
                <td colSpan={4} className="td-right">IGV (18%)</td>
                <td className="td-right">S/ {(pedido.total - pedido.total / 1.18).toFixed(2)}</td>
              </tr>
              <tr className="bp-total-row">
                <td colSpan={4} className="td-right"><strong>TOTAL PAGADO</strong></td>
                <td className="td-right"><strong>S/ {pedido.total.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pie */}
        <div className="bp-pie">
          <p>Gracias por tu compra en <strong>SyO Repuestos</strong></p>
          <p>Este comprobante es válido como constancia de pago · {formatFechaHora(pedido.fecha)}</p>
        </div>

      </div>
    </div>
  );
};

export default BoletaDocumento;
