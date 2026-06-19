// src/pages/carrito/checkout/ModalConfirmarDireccion.tsx
// Modal "Confirmar dirección de envío" — se muestra antes de avanzar al
// paso de comprobante. Si la dirección fue modificada, ofrece guardarla
// en el perfil del cliente para futuras compras.

import React from 'react';
import type { UseCheckoutReturn } from './useCheckout';

const ModalConfirmarDireccion: React.FC<{ ck: UseCheckoutReturn }> = ({ ck }) => {
  const {
    modalConfirmarDir, dirMostrada, dirPerfil,
    guardarComoPerfil, setGuardarComoPerfil,
    cancelarConfirmarDir, editarDesdeConfirmar, aceptarDireccionConfirmada,
  } = ck;
  if (!modalConfirmarDir) return null;

  // ¿La dirección a usar es distinta de la guardada en el perfil?
  const direccionDistinta =
    dirMostrada.direccion !== dirPerfil.direccion ||
    dirMostrada.referencia !== dirPerfil.referencia ||
    dirMostrada.distrito !== dirPerfil.distrito ||
    dirMostrada.codigopostal !== dirPerfil.codigopostal;

  return (
    <div className="mini-modal-overlay" onClick={cancelarConfirmarDir}>
      <div className="mini-modal" onClick={e => e.stopPropagation()}>
        <div className="mini-modal-icono">🚚</div>
        <h3>Confirmar dirección de envío</h3>
        <p>Revisa que tus datos de entrega sean correctos.</p>
        <div className="dir-resumen">
          <p><strong>{dirMostrada.direccion}</strong></p>
          {dirMostrada.referencia && <p className="dir-ref-text">Ref: {dirMostrada.referencia}</p>}
          {dirMostrada.distrito && (
            <p>{dirMostrada.distrito}{dirMostrada.codigopostal ? ` (${dirMostrada.codigopostal})` : ''}</p>
          )}
        </div>

        {direccionDistinta && (
          <label className="mini-modal-checkbox">
            <input
              type="checkbox"
              checked={guardarComoPerfil}
              onChange={e => setGuardarComoPerfil(e.target.checked)}
            />
            <span>Guardar esta dirección en mi perfil para futuras compras</span>
          </label>
        )}

        <div className="mini-modal-actions">
          <button className="btn-cancelar-checkout" onClick={editarDesdeConfirmar}>
            Editar dirección
          </button>
          <button className="btn-siguiente-checkout" onClick={aceptarDireccionConfirmada}>
            Confirmar y continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmarDireccion;
