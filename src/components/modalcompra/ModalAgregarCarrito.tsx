import React from 'react';

import './modalagregarcarrito.css';

interface Props {

  open: boolean;

  productoNombre: string;

  onCerrar: () => void;

  onIrPagar: () => void;
}

const ModalAgregarCarrito: React.FC<Props> = ({

  open,

  productoNombre,

  onCerrar,

  onIrPagar,

}) => {

  if (!open) return null;

  return (

    <div className="modal-overlay">

      <div className="modal-carrito">

        <div className="modal-icono">
          ✓
        </div>

        <h2>
          Producto agregado
        </h2>

        <p>

          <strong>
            {productoNombre}
          </strong>

          {' '}fue agregado correctamente al carrito.

        </p>

        <span className="modal-subtext">
          ¿Deseas ver los productos en oferta?
        </span>

        <div className="modal-botones">

          <button
            className="btn-seguir"
            onClick={onCerrar}
          >
            Seguir comprando
          </button>

          <button
            className="btn-pagar"
            onClick={onIrPagar}
          >
            Ir a pagar
          </button>

        </div>

      </div>

    </div>
  );
};

export default ModalAgregarCarrito;