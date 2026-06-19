import React from "react";

import Encabezado from "../../components/encabezado/Encabezado";
import SeccionCategorias from "../../components/categoria/SeccionCategorias";
import SeccionProducto from "../../components/seccionproducto/SeccionProducto";
import Footer from "../../components/footer/Footer";

import { useCategorias } from "../../hooks/categoria/useCategorias";
import { useProductosBaratos } from "../../hooks/producto/useProductosBaratos";
import { useCarrito } from "../../hooks/carrito/useCarrito";

import PageLoader from "../../components/loading/PageLoader";

import "./iniciopage.css";

const InicioPage: React.FC = () => {

  const {
    categorias,
    loading: loadingCategorias
  } = useCategorias();

  const {
    loading: loadingDestacados
  } = useProductosBaratos(5);

  const {
    agregarAlCarrito
  } = useCarrito();

  if (
    loadingCategorias ||
    loadingDestacados
  ) {
    return <PageLoader />;
  }

  return (

    <div className="inicio-page">

      <Encabezado showBanner={true} />

      <SeccionCategorias />

      <main className="contenido-principal">

        <SeccionProducto
          titulo="Productos Destacados"
          limit={5}
          verMasLink="/productos"
          onAgregarAlCarrito={
            agregarAlCarrito
          }
        />

        {categorias.map((categoria) => (

          <SeccionProducto
            key={categoria.idcategoria}
            categoriaId={String(categoria.idcategoria)}
            titulo={categoria.nombre}
            limit={4}
            verMasLink={`/categoria/${categoria.idcategoria}`}
            onAgregarAlCarrito={
              agregarAlCarrito
            }
          />

        ))}

      </main>

      <Footer />

    </div>
  );
};

export default InicioPage;