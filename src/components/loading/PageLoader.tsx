import React from 'react';
import './pageloader.css';

/**
 * PageLoader
 * Loader premium de S&O - SIEMPRE muestra el diseño completo.
 * 
 * Uso:
 *   if (loading) return <PageLoader />;
 *   if (loading) return <PageLoader message="Cargando perfil..." />;
 */
interface Props {
  message?: string;
}

const PageLoader: React.FC<Props> = ({ message = "Cargando" }) => {
  return (
    <div className="page-loader full-screen">
      <div className="loader-glow" aria-hidden="true" />

      <div className="loader-logo">
        <div className="loader-logo-mark">
          S<span>&amp;</span>O
        </div>
        <div className="loader-logo-sub">Repuestos</div>
      </div>

      <div className="loader-bar-wrap" role="progressbar" aria-label="Cargando">
        <div className="loader-bar" />
      </div>

      <p className="loader-text">{message}</p>
    </div>
  );
};

export default PageLoader;