import React, { useState } from 'react';
import { useCategorias } from '../../hooks/categoria/useCategorias';
import { useProductosFiltro } from '../../hooks/producto/useProductosFiltro';
import { useCarrito } from '../../hooks/carrito/useCarrito'; // ← IMPORTAR

import TarjetaProducto from '../../components/producto/TarjetaProducto';
import Encabezado from '../../components/encabezado/Encabezado';
import PageLoader from '../../components/loading/PageLoader';
import Footer from '../../components/footer/Footer';

import './productopage.css';

const ProductoPage: React.FC = () => {

  const { categorias, loading: loadingCategorias } = useCategorias();

  // ← Hook carrito
  const { agregarAlCarrito } = useCarrito();

  const [categoriaId, setCategoriaId] = useState<string | undefined>(undefined);
  const [precioMin, setPrecioMin] = useState<number | undefined>(undefined);
  const [precioMax, setPrecioMax] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

const {
  productos,
  loading: loadingProductos,
  error
} = useProductosFiltro({
  categoriaId,
  precioMin,
  precioMax,
  sort,
});

  if (loadingCategorias || loadingProductos) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <p className="text-center py-20 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div>

      <Encabezado showBanner={false} />

      <div className="productos-page">

        <div className="productos-header">

          <h1 className="productos-titulo">
            Todos los Productos
          </h1>

          <div className="filtros-container">

            <div className="filtro-grupo">
              <label>Categoría</label>

              <select
                value={categoriaId || ''}
                onChange={(e) =>
                  setCategoriaId(
                    e.target.value || undefined
                  )
                }
              >
                <option value="">
                  Todas las categorías
                </option>

                {categorias.map(cat => (
                  <option
                    key={cat.idcategoria}
                    value={cat.idcategoria}
                  >
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="filtro-grupo">
              <label>Precio mínimo</label>

              <input
                type="number"
                placeholder="S/ 0"
                value={precioMin || ''}
                onChange={(e) =>
                  setPrecioMin(
                    e.target.value
                      ? Number(e.target.value)
                      : undefined
                  )
                }
              />
            </div>

            <div className="filtro-grupo">
              <label>Precio máximo</label>

              <input
                type="number"
                placeholder="S/ 9999"
                value={precioMax || ''}
                onChange={(e) =>
                  setPrecioMax(
                    e.target.value
                      ? Number(e.target.value)
                      : undefined
                  )
                }
              />
            </div>

            <div className="filtro-grupo">
              <label>Ordenar</label>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(
                    e.target.value as 'asc' | 'desc'
                  )
                }
              >
                <option value="asc">
                  Menor a mayor precio
                </option>

                <option value="desc">
                  Mayor a menor precio
                </option>
              </select>
            </div>

            <button
              className="btn-limpiar"
              onClick={() => {
                setCategoriaId(undefined);
                setPrecioMin(undefined);
                setPrecioMax(undefined);
                setSort('asc');
              }}
            >
              Limpiar filtros
            </button>

          </div>
        </div>

        <div className="productos-grid">

          {productos.map((producto) => (

            <TarjetaProducto
              key={producto.idproducto}
              producto={producto}
              onAgregarAlCarrito={agregarAlCarrito} // ← AQUI
            />

          ))}

        </div>

        {productos.length === 0 && (
          <p className="text-center py-16 text-gray-500">
            No se encontraron productos con los filtros aplicados.
          </p>
        )}

      </div>

      <Footer />

    </div>
  );
};

export default ProductoPage;