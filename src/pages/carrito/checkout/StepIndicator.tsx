// src/pages/carrito/checkout/StepIndicator.tsx
import React from 'react';
import type { CheckoutStep } from './checkout.types';

const ORDEN: CheckoutStep[] = ['entrega', 'comprobante', 'pago'];
const LABELS: Record<string, string> = {
  entrega: 'Entrega',
  comprobante: 'Comprobante',
  pago: 'Pago',
};

const StepIndicator: React.FC<{ step: CheckoutStep }> = ({ step }) => {
  if (step === 'procesando' || step === 'boleta') return null;

  return (
    <div className="checkout-steps">
      {ORDEN.map((s, i) => {
        const completado = ORDEN.indexOf(step) > i;
        const activo = step === s;
        return (
          <React.Fragment key={s}>
            <div className={`checkout-step ${activo ? 'activo' : completado ? 'completado' : ''}`}>
              <div className="step-circle">{completado ? '✓' : i + 1}</div>
              <span>{LABELS[s]}</span>
            </div>
            {i < ORDEN.length - 1 && <div className="step-line" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
