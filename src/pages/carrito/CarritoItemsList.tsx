// src/pages/carrito/CarritoItemsList.tsx
// Lista de productos del carrito con controles de cantidad.

import React from 'react';
import type { CarritoItemDTO } from '../../types/Carrito.types';

interface Props {
  items: CarritoItemDTO[];
  onCambiarCantidad: (iditem: string, cantidad: number) => void;
  onEliminar: (iditem: string) => void;
}

const CarritoItemsList: React.FC<Props> = ({ items, onCambiarCantidad, onEliminar }) => (
  <div className="carrito-productos">
    {items.map((item) => (
      <div key={item.iditem} className="carrito-item">
        <div className="item-imagen">
          <img src={item.imgurl} alt={item.nombre} />
        </div>
        <div className="item-detalle">
          <h3>{item.nombre}</h3>
          <p className="item-marca">{item.marca}</p>
          <p className="item-precio">S/ {item.preciodesct.toFixed(2)}</p>
          {item.descuento > 0 && (
            <span className="item-descuento-badge">-{item.descuento}%</span>
          )}
        </div>
        <div className="item-cantidad">
          <button
            onClick={() => onCambiarCantidad(item.iditem, item.cantidad - 1)}
            disabled={item.cantidad <= 1}
          >−</button>
          <span>{item.cantidad}</span>
          <button
            onClick={() => onCambiarCantidad(item.iditem, item.cantidad + 1)}
            disabled={item.cantidad >= item.stockDisponible}
          >+</button>
        </div>
        <div className="item-subtotal">S/ {item.subtotal.toFixed(2)}</div>
        <button
          className="item-eliminar"
          onClick={() => onEliminar(item.iditem)}
          title="Eliminar"
        >✕</button>
      </div>
    ))}
  </div>
);

export default CarritoItemsList;
