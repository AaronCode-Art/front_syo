// src/pages/carrito/CarritoResumen.tsx
// Panel de resumen del carrito (total, envío, botón de pago).

import React from 'react';

interface Props {
  total: number;
  cantidadProductos: number;
  onProcederPago: () => void;
}

const CarritoResumen: React.FC<Props> = ({ total, cantidadProductos, onProcederPago }) => (
  <div className="carrito-resumen">
    <h2>Resumen</h2>
    <div className="resumen-linea">
      <span>Productos ({cantidadProductos})</span>
      <span>S/ {total.toFixed(2)}</span>
    </div>
    <div className="resumen-linea">
      <span>Envío</span>
      <span className="envio-gratis">Gratis</span>
    </div>
    <div className="resumen-total">
      <span>Total</span>
      <span className="total-monto">S/ {total.toFixed(2)}</span>
    </div>
    <button className="btn-proceder-pago" onClick={onProcederPago}>
      Proceder al pago
    </button>
    <div className="info-box">
      <span className="info-icon">🚚</span>
      <div><strong>Envío gratis</strong><p>En productos seleccionados</p></div>
    </div>
    <div className="info-box">
      <span className="info-icon">🛡️</span>
      <div><strong>Garantía SyO</strong><p>Todos nuestros productos tienen garantía</p></div>
    </div>
  </div>
);

export default CarritoResumen;
