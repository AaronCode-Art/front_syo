import React from 'react';
import { Link } from 'react-router-dom';
import { useCategorias } from '../../hooks/categoria/useCategorias';
import './seccioncategorias.css';

const SeccionCategorias: React.FC = () => {
  const { categorias, loading, error } = useCategorias();

  if (loading) {
    return (
      <section className="categorias-seccion">
        <div className="categorias-loading">
          <span />
          <span />
          <span />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="categorias-seccion">
        <p className="categorias-error">{error}</p>
      </section>
    );
  }

  return (
    <section className="categorias-seccion">
      <div className="categorias-contenedor">

        <div className="categorias-header">
          <div className="categorias-label">catálogo</div>
          <h2 className="categorias-titulo">
            Explora nuestras <em>categorías</em>
          </h2>
        </div>

        <div className="categorias-cuadricula">
          {categorias.map((categoria) => (
            <Link
              key={categoria.idcategoria}
              to={`/categoria/${categoria.idcategoria}`}
              className="categoria-card"
            >
              {categoria.imgurl && (
                <div className="categoria-img-wrap">
                  <img
                    src={categoria.imgurl}
                    alt={categoria.nombre}
                    className="categoria-imagen"
                  />
                </div>
              )}

              <h3 className="categoria-nombre">{categoria.nombre}</h3>

              <div className="categoria-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SeccionCategorias;
