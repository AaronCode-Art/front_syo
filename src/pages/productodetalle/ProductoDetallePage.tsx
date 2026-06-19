import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productoService } from '../../services/productoService';
import type { ProductoDetalle, ProductoLista } from '../../types/Producto.types';
import TarjetaProducto from '../../components/producto/TarjetaProducto';
import { useCarrito } from '../../hooks/carrito/useCarrito';
import ModalAgregarCarrito from '../../components/modalcompra/ModalAgregarCarrito';
import './productodetallepage.css';
import Footer from '../../components/footer/Footer';
import Encabezado from '../../components/encabezado/Encabezado';

const ProductoDetallePage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();

  const [producto, setProducto] = useState<ProductoDetalle | null>(null);
  const [productosRelacionados, setProductosRelacionados] = useState<ProductoLista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const cargarPagina = async () => {
      if (!id) return;
      try {
        setLoading(true);

        // 1. Cargamos el detalle completo del producto
        const detalle = await productoService.getDetalle(id);
        setProducto(detalle);

        // 2. Cargamos productos relacionados (4 productos de "Te puede interesar")
        const todos = await productoService.getAll(0, 20);
        const relacionados = todos.content
          .filter(p => p.idproducto !== id)   // Excluimos el producto actual
          .slice(0, 4);

        setProductosRelacionados(relacionados);

      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el detalle del producto");
      } finally {
        setLoading(false);
      }
    };

    cargarPagina();
  }, [id]);

  if (loading) return <p className="text-center py-20 text-white">Cargando detalle...</p>;
  if (error || !producto) return <p className="text-center py-20 text-red-500">{error}</p>;

  const sinStock = producto.stock === 0;

  return (

    <div>
        <Encabezado showBanner={false} />
    
    <div className="producto-detalle-page">
      <div className="detalle-contenedor">
        <Link to="/productos" className="btn-volver">
          ← Volver a productos
        </Link>

        <div className="detalle-grid">

          {/* Imagen */}
          <div className="detalle-imagen">
            <img src={producto.imgurl} alt={producto.nombre} />
          </div>

          {/* Información */}
          <div className="detalle-info">
            <h1 className="detalle-nombre">{producto.nombre}</h1>
            <p className="detalle-marca">{producto.marca}</p>

            <div className="detalle-precios">
              {producto.descuento > 0 && (
                <span className="precio-original">S/ {producto.precio.toFixed(2)}</span>
              )}
              <span className="precio-final">S/ {producto.preciodesct.toFixed(2)}</span>
            </div>

            <div className={`stock-info ${sinStock ? 'outstock' : 'instock'}`}>
              {sinStock ? '❌ Sin stock' : `✅ En stock (${producto.stock} unidades)`}
            </div>

            <div className="detalle-descripcion">
              <h3>Descripción</h3>
              <p>{producto.descripcion}</p>
            </div>

            {producto.especificacionestecnicas && Object.keys(producto.especificacionestecnicas).length > 0 && (
              <div className="detalle-especificaciones">
                <h3>Especificaciones Técnicas</h3>
                <ul>
                  {Object.entries(producto.especificacionestecnicas).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {String(value)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="detalle-acciones">
              <button
                className="btn-comprar-detalle"
                disabled={sinStock}
                onClick={async () => {
                  if (!producto || sinStock) return;
                  const ok = await agregarAlCarrito(producto.idproducto, 1);
                  if (ok) navigate('/carrito');
                }}
              >
                {sinStock ? 'Sin stock' : 'Comprar ahora'}
              </button>
              <button
                className="btn-carrito"
                disabled={sinStock}
                onClick={async () => {
                  if (!producto || sinStock) return;
                  const ok = await agregarAlCarrito(producto.idproducto, 1);
                  if (ok) setMostrarModal(true);
                }}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>

        {/* TE PUEDE INTERESAR */}
        {productosRelacionados.length > 0 && (
          <div className="te-puede-interesar">
            <h2 className="seccion-relacionados-titulo">Te puede interesar</h2>
            <div className="productos-relacionados-grid">
              {productosRelacionados.map((prod) => (
                <TarjetaProducto
                  key={prod.idproducto}
                  producto={prod}
                  onAgregarAlCarrito={agregarAlCarrito}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
    <Footer/>

    <ModalAgregarCarrito
      open={mostrarModal}
      productoNombre={producto.nombre}
      onCerrar={() => setMostrarModal(false)}
      onIrPagar={() => navigate('/carrito')}
    />
    </div>
  );
};

export default ProductoDetallePage;