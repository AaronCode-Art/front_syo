// src/pages/carrito/checkout/ComprobanteStep.tsx
// Paso 2: elegir tipo de comprobante (boleta/factura) y mostrar preview.

import React from 'react';
import type { Cliente } from '../../../types/Cliente.types';
import type { UseCheckoutReturn } from './useCheckout';

const ComprobanteStep: React.FC<{ ck: UseCheckoutReturn; user: Cliente | null }> = ({ ck, user }) => {
  const {
    tipocomprobante, setTipocomprobante,
    ruc, setRuc, razonSocial, setRazonSocial,
    total, errorMsg, volverAEntrega, irAPago,
  } = ck;

  return (
    <div className="checkout-step-content">
      <h2>¿Qué comprobante necesitas?</h2>

      <div className="checkout-field">
        <div className="checkout-options">
          <button
            className={`opt-btn ${tipocomprobante === 'boleta' ? 'active' : ''}`}
            onClick={() => setTipocomprobante('boleta')}
          >🧾 Boleta</button>
          <button
            className={`opt-btn ${tipocomprobante === 'factura' ? 'active' : ''}`}
            onClick={() => setTipocomprobante('factura')}
          >📄 Factura</button>
        </div>
      </div>

      {tipocomprobante === 'boleta' && (
        <div className="comprobante-preview boleta-preview">
          <div className="preview-header">
            <span className="preview-logo">S&O</span>
            <div>
              <p className="preview-title">BOLETA DE VENTA</p>
              <p className="preview-sub">Se emitirá al confirmar el pago</p>
            </div>
          </div>
          <div className="preview-cliente">
            <p><strong>Cliente:</strong> {user?.nombre} {user?.apellido}</p>
            <p><strong>DNI:</strong> {user?.dni ?? '—'}</p>
          </div>
          <div className="preview-total">
            <span>Total estimado</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
        </div>
      )}

      {tipocomprobante === 'factura' && (
        <>
          <div className="checkout-field">
            <label>RUC *</label>
            <input
              type="text"
              placeholder="20123456789"
              maxLength={11}
              value={ruc}
              onChange={e => setRuc(e.target.value.replace(/\D/g, ''))}
            />
            <label>Razón social *</label>
            <input
              type="text"
              placeholder="Empresa S.A.C."
              value={razonSocial}
              onChange={e => setRazonSocial(e.target.value)}
            />
          </div>
          {ruc.length === 11 && razonSocial && (
            <div className="comprobante-preview factura-preview">
              <div className="preview-header">
                <span className="preview-logo">S&O</span>
                <div>
                  <p className="preview-title">FACTURA ELECTRÓNICA</p>
                  <p className="preview-sub">Se emitirá al confirmar el pago</p>
                </div>
              </div>
              <p><strong>RUC:</strong> {ruc}</p>
              <p><strong>Razón social:</strong> {razonSocial}</p>
              <div className="preview-total">
                <span>Total estimado</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </>
      )}

      {errorMsg && <p className="checkout-error">{errorMsg}</p>}

      <div className="checkout-actions">
        <button className="btn-cancelar-checkout" onClick={volverAEntrega}>← Volver</button>
        <button className="btn-siguiente-checkout" onClick={irAPago}>Continuar →</button>
      </div>
    </div>
  );
};

export default ComprobanteStep;
