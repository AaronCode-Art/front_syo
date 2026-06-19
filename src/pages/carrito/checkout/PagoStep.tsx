// src/pages/carrito/checkout/PagoStep.tsx
// Paso 3: método de pago (Yape/Plin, tarjeta, transferencia, efectivo).

import React from 'react';
import type { UseCheckoutReturn } from './useCheckout';
import { formatMetodo, formatTarjeta } from './checkout.types';

const METODOS = ['yape', 'plin', 'tarjeta_credito', 'tarjeta_debito', 'transferencia', 'efectivo'] as const;

const PagoStep: React.FC<{ ck: UseCheckoutReturn }> = ({ ck }) => {
  const {
    metodopago, setMetodopago, total,
    nroYape, setNroYape, codigoAprobacion, setCodigoAprobacion,
    nroTarjeta, setNroTarjeta, vencimiento, setVencimiento, cvv, setCvv,
    nombreTarjeta, setNombreTarjeta, nroCuenta, setNroCuenta,
    errorMsg, volverAComprobante, confirmarPago,
  } = ck;

  return (
    <div className="checkout-step-content">
      <h2>¿Cómo deseas pagar?</h2>

      <div className="checkout-field">
        <div className="checkout-options checkout-options-wrap">
          {METODOS.map(m => (
            <button
              key={m}
              className={`opt-btn ${metodopago === m ? 'active' : ''}`}
              onClick={() => setMetodopago(m)}
            >{formatMetodo(m)}</button>
          ))}
        </div>
      </div>

      {/* Yape / Plin */}
      {(metodopago === 'yape' || metodopago === 'plin') && (
        <div className="pago-form">
          <div className="pago-qr">
            <div className="qr-simulado">
              <span className="qr-logo">{metodopago === 'yape' ? '💜' : '💚'}</span>
              <p>Escanea con {metodopago === 'yape' ? 'Yape' : 'Plin'}</p>
              <p className="qr-monto">S/ {total.toFixed(2)}</p>
            </div>
          </div>
          <p className="pago-o">— o ingresa el número —</p>
          <div className="checkout-field">
            <label>Número de {metodopago === 'yape' ? 'Yape' : 'Plin'} *</label>
            <input
              type="tel"
              placeholder="9XXXXXXXX"
              maxLength={9}
              value={nroYape}
              onChange={e => setNroYape(e.target.value.replace(/\D/g, ''))}
            />
          </div>
          <div className="checkout-field">
            <label>Código de aprobación *</label>
            <input
              type="text"
              placeholder="Ej: 123456"
              maxLength={8}
              value={codigoAprobacion}
              onChange={e => setCodigoAprobacion(e.target.value.replace(/\D/g, ''))}
            />
            <p className="pago-hint">Aparece en tu app después de la transferencia</p>
          </div>
        </div>
      )}

      {/* Tarjeta */}
      {(metodopago === 'tarjeta_credito' || metodopago === 'tarjeta_debito') && (
        <div className="pago-form">
          <div className="tarjeta-preview">
            <div className="tarjeta-chip" />
            <p className="tarjeta-numero">{nroTarjeta || '•••• •••• •••• ••••'}</p>
            <div className="tarjeta-footer">
              <span>{nombreTarjeta || 'NOMBRE APELLIDO'}</span>
              <span>{vencimiento || 'MM/AA'}</span>
            </div>
          </div>
          <div className="checkout-field">
            <label>Número de tarjeta *</label>
            <input
              type="text"
              placeholder="•••• •••• •••• ••••"
              maxLength={19}
              value={nroTarjeta}
              onChange={e => setNroTarjeta(formatTarjeta(e.target.value))}
            />
          </div>
          <div className="checkout-field">
            <label>Nombre en tarjeta</label>
            <input
              type="text"
              placeholder="JUAN PEREZ"
              value={nombreTarjeta}
              onChange={e => setNombreTarjeta(e.target.value.toUpperCase())}
            />
          </div>
          <div className="checkout-row">
            <div className="checkout-field">
              <label>Vencimiento *</label>
              <input
                type="text"
                placeholder="MM/AA"
                maxLength={5}
                value={vencimiento}
                onChange={e => {
                  let v = e.target.value.replace(/\D/g, '');
                  if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                  setVencimiento(v);
                }}
              />
            </div>
            <div className="checkout-field">
              <label>CVV *</label>
              <input
                type="password"
                placeholder="•••"
                maxLength={4}
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>
        </div>
      )}

      {/* Transferencia */}
      {metodopago === 'transferencia' && (
        <div className="pago-form">
          <div className="transferencia-info">
            <p><strong>Banco:</strong> BCP</p>
            <p><strong>CCI:</strong> 002-123456789012-34</p>
            <p><strong>Titular:</strong> SyO Repuestos S.A.C.</p>
            <p><strong>Monto:</strong> S/ {total.toFixed(2)}</p>
          </div>
          <div className="checkout-field">
            <label>Número de operación *</label>
            <input
              type="text"
              placeholder="Ej: 12345678"
              value={nroCuenta}
              onChange={e => setNroCuenta(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Efectivo */}
      {metodopago === 'efectivo' && (
        <div className="pago-form">
          <div className="efectivo-info">
            <p>💵 Paga al recibir tu pedido o en tienda.</p>
            <p>Monto exacto: <strong>S/ {total.toFixed(2)}</strong></p>
          </div>
        </div>
      )}

      <div className="checkout-total">
        <span>Total a pagar</span>
        <span className="checkout-total-monto">S/ {total.toFixed(2)}</span>
      </div>

      {errorMsg && <p className="checkout-error">{errorMsg}</p>}

      <div className="checkout-actions">
        <button className="btn-cancelar-checkout" onClick={volverAComprobante}>← Volver</button>
        <button className="btn-confirmar-checkout" onClick={confirmarPago}>Confirmar pago</button>
      </div>
    </div>
  );
};

export default PagoStep;
