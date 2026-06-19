// src/pages/carrito/checkout/ModalModificarDireccion.tsx
// Modal "¿Deseas modificar tu dirección?" — se muestra antes de pasar
// la dirección actual (precargada del perfil) a modo edición.

import React from 'react';
import type { UseCheckoutReturn } from './useCheckout';

const ModalModificarDireccion: React.FC<{ ck: UseCheckoutReturn }> = ({ ck }) => {
  const { modalModificarDir, dirMostrada, cancelarModificar, aceptarModificar } = ck;
  if (!modalModificarDir) return null;

  return (
    <div className="mini-modal-overlay" onClick={cancelarModificar}>
      <div className="mini-modal" onClick={e => e.stopPropagation()}>
        <div className="mini-modal-icono">📍</div>
        <h3>¿Deseas modificar tu dirección?</h3>
        <p>Tu dirección actual es:</p>
        <div className="dir-resumen">
          <p><strong>{dirMostrada.direccion}</strong></p>
          {dirMostrada.referencia && <p className="dir-ref-text">Ref: {dirMostrada.referencia}</p>}
          {dirMostrada.distrito && <p>{dirMostrada.distrito}</p>}
        </div>
        <p className="mini-modal-aviso">
          Si modificas la dirección, deberás confirmarla antes de continuar.
        </p>
        <div className="mini-modal-actions">
          <button className="btn-cancelar-checkout" onClick={cancelarModificar}>
            No, usar esta dirección
          </button>
          <button className="btn-siguiente-checkout" onClick={aceptarModificar}>
            Sí, modificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalModificarDireccion;
