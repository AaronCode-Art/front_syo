// src/pages/carrito/checkout/BoletaStep.tsx
// Paso final: pago exitoso + boleta/factura formal con opción de imprimir.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoletaDocumento from '../../../components/boleta/BoletaDocumento';
import type { Cliente } from '../../../types/Cliente.types';
import type { UseCheckoutReturn } from './useCheckout';

const BoletaStep: React.FC<{ ck: UseCheckoutReturn; user: Cliente | null; onClose: () => void }> = ({ ck, user, onClose }) => {
  const navigate = useNavigate();
  const { pedidoFinal } = ck;
  if (!pedidoFinal) return null;

  return (
    <div className="checkout-boleta-wrap">
      <div className="boleta-exito-header">
        <div className="boleta-check-icon">✓</div>
        <div>
          <h2>¡Pago exitoso!</h2>
          <p>Tu compra fue confirmada correctamente</p>
        </div>
      </div>

      <BoletaDocumento
        pedido={pedidoFinal}
        nombreCliente={`${user?.nombre ?? ''} ${user?.apellido ?? ''}`.trim()}
        dniCliente={user?.dni}
      />

      <div className="checkout-actions" style={{ marginTop: '20px' }}>
        <button className="btn-cancelar-checkout" onClick={() => { onClose(); navigate('/productos'); }}>
          Seguir comprando
        </button>
        <button className="btn-siguiente-checkout" onClick={() => { onClose(); navigate('/pedidos'); }}>
          Ver mis pedidos
        </button>
      </div>
    </div>
  );
};

export default BoletaStep;
