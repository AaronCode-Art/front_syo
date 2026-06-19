// src/pages/carrito/checkout/CheckoutModal.tsx
// Orquesta el modal de checkout: indicador de pasos + paso activo + modales
// de dirección. Reemplaza el bloque gigante que antes vivía en CarritoPage.

import React from 'react';
import type { Cliente } from '../../../types/Cliente.types';
import type { UseCheckoutReturn } from './useCheckout';
import StepIndicator from './StepIndicator';
import EntregaStep from './EntregaStep';
import ComprobanteStep from './ComprobanteStep';
import PagoStep from './PagoStep';
import BoletaStep from './BoletaStep';
import ModalModificarDireccion from './ModalModificarDireccion';
import ModalConfirmarDireccion from './ModalConfirmarDireccion';

const CheckoutModal: React.FC<{ ck: UseCheckoutReturn; user: Cliente | null }> = ({ ck, user }) => {
  const { modalOpen, step, cerrarModal } = ck;
  if (!modalOpen) return null;

  return (
    <>
      <div className="checkout-overlay" onClick={cerrarModal}>
        <div className="checkout-modal" onClick={e => e.stopPropagation()}>
          <StepIndicator step={step} />

          {step === 'entrega' && <EntregaStep ck={ck} />}
          {step === 'comprobante' && <ComprobanteStep ck={ck} user={user} />}
          {step === 'pago' && <PagoStep ck={ck} />}

          {step === 'procesando' && (
            <div className="checkout-procesando">
              <div className="procesando-spinner" />
              <p>Procesando tu pago...</p>
              <p className="procesando-sub">No cierres esta ventana</p>
            </div>
          )}

          {step === 'boleta' && <BoletaStep ck={ck} user={user} onClose={cerrarModal} />}
        </div>
      </div>

      <ModalModificarDireccion ck={ck} />
      <ModalConfirmarDireccion ck={ck} />
    </>
  );
};

export default CheckoutModal;
