import React, {
  useState
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import type {
  ProductoLista
} from '../../types/Producto.types';

import ModalAgregarCarrito
from '../modalcompra/ModalAgregarCarrito';

import './tarjetaproducto.css';

interface Props {

  producto: ProductoLista;

  onAgregarAlCarrito?: (
    productoId: string,
    cantidad?: number
  ) => Promise<boolean>;
}

const TarjetaProducto: React.FC<Props> = ({
  producto,
  onAgregarAlCarrito
}) => {

  const navigate = useNavigate();

  const [mostrarModal, setMostrarModal] =
    useState(false);

  const sinStock =
    producto.stock <= 0;

  const handleComprarClick = async (
    e: React.MouseEvent
  ) => {

    e.preventDefault();

    e.stopPropagation();

    if (sinStock) return;

    if (!onAgregarAlCarrito) return;

    const ok =
      await onAgregarAlCarrito(
        producto.idproducto,
        1
      );

    if (ok) {
      setMostrarModal(true);
    }
  };

  return (

    <>

      <Link
        to={`/producto/${producto.idproducto}`}
        className="tarjeta-link-wrapper"
      >

        <div className="tarjeta-producto">

          {producto.descuento > 0 && (

            <div className="badge-descuento">
              {producto.descuento}% OFF
            </div>

          )}

          <div className="tarjeta-imagen-cont">

            <img
              src={producto.imgurl}
              alt={producto.nombre}
            />

          </div>

          <div className="meta-info">

            <span className="tarjeta-marca">
              {producto.marca}
            </span>

            <span
              className={`stock-status ${
                sinStock
                  ? 'outstock'
                  : 'instock'
              }`}
            >
              {sinStock
                ? 'sin stock'
                : 'en stock'}
            </span>

          </div>

          <h3 className="tarjeta-nombre">
            {producto.nombre}
          </h3>

          <div className="tarjeta-precios">

            {producto.descuento > 0 && (

              <span className="precio-original">
                S/ {producto.precio.toFixed(2)}
              </span>

            )}

            <span className="precio-final">
              S/ {producto.preciodesct.toFixed(2)}
            </span>

          </div>

          <div className="tarjeta-footer">

            <button
              className="btn-comprar"
              onClick={handleComprarClick}
              disabled={sinStock}
            >

              {sinStock
                ? 'Sin stock'
                : 'Agregar al carrito'}

            </button>

          </div>

        </div>

      </Link>

      <ModalAgregarCarrito
        open={mostrarModal}
        productoNombre={producto.nombre}
        onCerrar={() =>
          setMostrarModal(false)
        }
        onIrPagar={() =>
          navigate('/carrito')
        }
      />

    </>
  );
};

export default TarjetaProducto;