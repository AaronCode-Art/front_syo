import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { categoriaService } from '../../services/categoriaService';
import Footer from '../../components/footer/Footer';
import Encabezado from '../../components/encabezado/Encabezado';
import type { CategoriaDetalle } from '../../types/Categoria.types';
import { useProductos } from '../../hooks/producto/useProductos';
import TarjetaProducto from '../../components/producto/TarjetaProducto';
import { useCarrito } from '../../hooks/carrito/useCarrito';
import './productocatpage.css';

/**
 * ProductoCategoria Page
 * Muestra todos los productos de una categoría + su nombre y descripción completa
 */
const ProductoCatPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<CategoriaDetalle | null>(null);
  const [loadingCategoria, setLoadingCategoria] = useState(true);

  // Cargamos los productos de esta categoría
  const { productos, loading: loadingProductos, error } = useProductos(id);

  const { agregarAlCarrito } = useCarrito();

  // Cargamos el detalle completo de la categoría (incluye descripción)
  useEffect(() => {
    const cargarDetalleCategoria = async () => {
      if (!id) return;
      try {
        setLoadingCategoria(true);
        const data = await categoriaService.getDetalle(id);
        setCategoria(data);
      } catch (err) {
        console.error('Error al cargar detalle de categoría:', err);
      } finally {
        setLoadingCategoria(false);
      }
    };

    cargarDetalleCategoria();
  }, [id]);

  if (loadingCategoria || loadingProductos) {
    return <p className="text-center py-20 text-white">Cargando categoría...</p>;
  }

  if (error || !categoria) {
    return <p className="text-center py-20 text-red-500">No se encontró la categoría</p>;
  }
  return (
    <div>
      <Encabezado showBanner={false} />
  
    <div className="producto-categoria-page">
      
      {/* Header de la categoría */}
      <div className="categoria-header">
        <h1 className="categoria-titulo">
          {categoria.nombre}
        </h1>
        {categoria.descripcion && (
          <p className= "categoria-descripcion">
            {categoria.descripcion}
          </p>
        )}
      </div>

      {/* Grid de productos */}
      <div className="productos-grid">
        {productos.map((producto) => (
          <TarjetaProducto 
            key={producto.idproducto} 
            producto={producto}
            onAgregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>

      {productos.length === 0 && (
        <p className="text-center py-16 text-gray-400">
          No hay productos disponibles en esta categoría por el momento.
        </p>
      )}
    </div>
    <Footer />
      </div>
  );
};

export default ProductoCatPage;