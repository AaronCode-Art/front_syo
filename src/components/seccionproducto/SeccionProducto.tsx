import React from 'react';
 
import { Link }
from 'react-router-dom';
 
import {
  useProductosCategoria
}
from '../../hooks/producto/useProductosCategoria';
 
import TarjetaProducto
from '../producto/TarjetaProducto';
 
import './seccionproducto.css';
 
interface Props {
 
  categoriaId?: string;
 
  titulo: string;
 
  limit?: number;
 
  verMasLink?: string;
 
  onAgregarAlCarrito?: (
    productoId: string,
    cantidad?: number
  ) => Promise<boolean>;
}
 
const SeccionProducto: React.FC<Props> = ({
 
  categoriaId,
 
  titulo,
 
  limit,
 
  verMasLink,
 
  onAgregarAlCarrito
 
}) => {
 
  const {
 
    productos,
 
    loading,
 
    error
 
  } = useProductosCategoria(
    categoriaId,
    limit
  );
 
  // ===== ENCABEZADO REUTILIZABLE =====
  const Encabezado = () => (
    <div className="header-seccion">
 
      <h2 className="titulo-categoria">
        {titulo}
      </h2>
 
      {verMasLink && (
 
        <Link
          to={verMasLink}
          className="ver-mas-top"
        >
          Ver más →
        </Link>
 
      )}
 
    </div>
  );
 
  // ===== ESTADO: CARGANDO =====
  if (loading) {
 
    const placeholders = Array.from(
      { length: limit ?? 4 }
    );
 
    return (
 
      <section className="seccion-productos-inicio">
 
        <Encabezado />
 
        <div className="fila-productos">
 
          {placeholders.map((_, i) => (
 
            <div
              key={i}
              className="tarjeta-contenedor"
            >
              <div className="tarjeta-skeleton">
                <div className="skeleton-img" />
                <div className="skeleton-line skeleton-line-sm" />
                <div className="skeleton-line skeleton-line-lg" />
                <div className="skeleton-line skeleton-line-md" />
              </div>
            </div>
 
          ))}
 
        </div>
 
      </section>
 
    );
  }
 
  // ===== ESTADO: ERROR =====
  if (error) {
 
    return (
 
      <section className="seccion-productos-inicio">
 
        <Encabezado />
 
        <div className="seccion-mensaje seccion-mensaje-error">
          <span className="seccion-mensaje-icono">⚠️</span>
          <p>{error}</p>
        </div>
 
      </section>
 
    );
  }
 
  // ===== ESTADO: SIN PRODUCTOS =====
  if (productos.length === 0) {
 
    return (
 
      <section className="seccion-productos-inicio">
 
        <Encabezado />
 
        <div className="seccion-mensaje">
          <span className="seccion-mensaje-icono">📦</span>
          <p>Aún no hay productos disponibles en esta categoría.</p>
        </div>
 
      </section>
 
    );
  }
 
  return (
 
    <section className="seccion-productos-inicio">
 
      <Encabezado />
 
      <div className="fila-productos">
 
        {productos.map((producto) => (
 
          <div
            key={producto.idproducto}
            className="tarjeta-contenedor"
          >
 
            <TarjetaProducto
              producto={producto}
              onAgregarAlCarrito={
                onAgregarAlCarrito
              }
            />
 
          </div>
 
        ))}
 
      </div>
 
    </section>
  );
};
 
export default SeccionProducto;