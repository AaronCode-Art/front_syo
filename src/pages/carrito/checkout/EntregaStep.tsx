// src/pages/carrito/checkout/EntregaStep.tsx
// Paso 1: tipo de entrega (recojo/delivery) + dirección.
// Si hay dirección guardada en el perfil, se muestra precargada en modo
// lectura, con opción de "Modificar" que abre el modal de confirmación.

import React from 'react';
import type { UseCheckoutReturn } from './useCheckout';

const EntregaStep: React.FC<{ ck: UseCheckoutReturn }> = ({ ck }) => {
  const {
    tipoentrega, handleElegirRecojo, handleElegirDelivery,
    modoEdicionDir, dir, dirMostrada, dirConfirmada, tieneDirPerfil,
    setCampoDir, handleClickModificar,
    errorMsg, cerrarModal, irAComprobante,
  } = ck;

  return (
    <div className="checkout-step-content">
      <h2>¿Cómo recibirás tu pedido?</h2>

      <div className="checkout-field">
        <div className="checkout-options">
          <button
            className={`opt-btn ${tipoentrega === 'recojo' ? 'active' : ''}`}
            onClick={handleElegirRecojo}
          >🏪 Recojo en tienda</button>
          <button
            className={`opt-btn ${tipoentrega === 'delivery' ? 'active' : ''}`}
            onClick={handleElegirDelivery}
          >🚚 Delivery</button>
        </div>
      </div>

      {/* Recojo */}
      {tipoentrega === 'recojo' && (
        <div className="recojo-info">
          <p>📍 <strong>Tienda SyO Repuestos</strong></p>
          <p>Av. Principal 123, Lima</p>
          <p className="recojo-horario">Lun–Sáb: 9am – 7pm</p>
        </div>
      )}

      {/* Delivery */}
      {tipoentrega === 'delivery' && (
        <div className="delivery-section">

          {/* Modo lectura: dirección actual (del perfil o ya editada) */}
          {!modoEdicionDir && (
            <div className="dir-actual-card">
              <div className="dir-actual-header">
                <span className="dir-actual-icono">📍</span>
                <div className="dir-actual-datos">
                  <p className="dir-actual-principal">
                    {dirMostrada.direccion || 'Sin dirección registrada'}
                  </p>
                  {dirMostrada.referencia && (
                    <p className="dir-actual-ref">Ref: {dirMostrada.referencia}</p>
                  )}
                  {dirMostrada.distrito && (
                    <p className="dir-actual-distrito">
                      {dirMostrada.distrito}
                      {dirMostrada.codigopostal && ` (${dirMostrada.codigopostal})`}
                    </p>
                  )}
                  {tieneDirPerfil && (
                    <p className="dir-actual-origen">Esta es la dirección de tu perfil</p>
                  )}
                </div>
                <button
                  className="btn-modificar-dir"
                  onClick={handleClickModificar}
                  disabled={dirConfirmada}
                  title={dirConfirmada ? 'Dirección ya confirmada' : 'Modificar dirección'}
                >
                  {dirConfirmada ? '🔒' : '✏️'}
                </button>
              </div>
              {dirConfirmada && (
                <div className="dir-confirmada-badge">
                  ✅ Dirección confirmada — no se puede modificar
                </div>
              )}
            </div>
          )}

          {/* Modo edición: campos editables */}
          {modoEdicionDir && (
            <div className="checkout-field">
              <label>Dirección *</label>
              <input
                type="text"
                placeholder="Av. Las Flores 123"
                value={dir.direccion}
                onChange={e => setCampoDir('direccion', e.target.value)}
              />
              <label>Referencia</label>
              <input
                type="text"
                placeholder="Frente al parque"
                value={dir.referencia}
                onChange={e => setCampoDir('referencia', e.target.value)}
              />
              <div className="checkout-row">
                <input
                  type="text"
                  placeholder="Distrito"
                  value={dir.distrito}
                  onChange={e => setCampoDir('distrito', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Cód. postal"
                  value={dir.codigopostal}
                  onChange={e => setCampoDir('codigopostal', e.target.value)}
                />
              </div>
            </div>
          )}

        </div>
      )}

      {errorMsg && <p className="checkout-error">{errorMsg}</p>}

      <div className="checkout-actions">
        <button className="btn-cancelar-checkout" onClick={cerrarModal}>Cancelar</button>
        <button className="btn-siguiente-checkout" onClick={irAComprobante}>Continuar →</button>
      </div>
    </div>
  );
};

export default EntregaStep;
