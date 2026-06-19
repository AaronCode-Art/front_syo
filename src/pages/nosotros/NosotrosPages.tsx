import React from 'react';
import { Link } from 'react-router-dom';
import Encabezado from '../../components/encabezado/Encabezado';
import Footer from '../../components/footer/Footer';
import PageLoader from "../../components/loading/PageLoader";
import './NosotrosPages.css';

const NosotrosPages: React.FC = () => {
  return (
    <div className="nosotros-page">
      <Encabezado showBanner={false} />

      <main className="nosotros-contenido">
        <header className="nosotros-header">
          <div className="nosotros-header-label">quiénes somos</div>
          <h1 className="nosotros-titulo">Sobre <em>Nosotros</em></h1>
          <p className="nosotros-subtitulo">Conoce la empresa detrás de tus repuestos favoritos</p>
        </header>

        <section className="nosotros-seccion">
          <div className="nosotros-texto">
            <div className="nosotros-texto-label">nuestra historia</div>
            <h2>Repuestos de calidad, <em>sin excusas</em></h2>
            <p>
              En S&amp;O, nos apasiona proporcionar repuestos de la más alta calidad para que tus
              dispositivos funcionen como nuevos. Fundada con la visión de ofrecer soluciones
              confiables y accesibles, hemos crecido para convertirnos en un referente en el
              mercado de repuestos.
            </p>
            <p>
              Nuestro compromiso va más allá de la venta: nos aseguramos de que cada producto
              cumpla con estándares estrictos de calidad, garantizando durabilidad y rendimiento
              excepcional.
            </p>
          </div>
          <div className="nosotros-imagen">
            <div className="nosotros-imagen-glow" />
            <img src="https://res.cloudinary.com/dfmveqhud/image/upload/q_auto/f_auto/v1777427970/9100d340-2590-4b91-8405-0cab25fb8384.png" alt="Equipo S&O" />
          </div>
        </section>

        <section className="nosotros-valores">
          <div className="nosotros-valores-header">
            <div className="nosotros-header-label">por qué elegirnos</div>
            <h2>Nuestras <em>ventajas</em></h2>
          </div>
          <div className="valores-grid">
            <div className="valor-item">
              <div className="valor-icon">🛡️</div>
              <h3>Calidad Garantizada</h3>
              <p>Cada repuesto pasa por rigurosos controles de calidad para asegurar su fiabilidad y durabilidad.</p>
            </div>
            <div className="valor-item">
              <div className="valor-icon">🚚</div>
              <h3>Envío Gratis</h3>
              <p>Disfruta de envío gratuito en todos tus pedidos. Tu satisfacción es nuestra prioridad.</p>
            </div>
            <div className="valor-item">
              <div className="valor-icon">⚡</div>
              <h3>Servicio Confiable</h3>
              <p>Atención al cliente excepcional y soporte técnico para resolver cualquier duda o problema.</p>
            </div>
            <div className="valor-item">
              <div className="valor-icon">💡</div>
              <h3>Innovación Continua</h3>
              <p>Mantenemos nuestro catálogo actualizado con las últimas tendencias y tecnologías en repuestos.</p>
            </div>
          </div>
        </section>

        <section className="nosotros-cta">
          <div className="nosotros-cta-inner">
            <div className="nosotros-header-label light">catálogo</div>
            <h2>¿Listo para encontrar <em>tus repuestos</em>?</h2>
            <p>Explora nuestro catálogo completo y descubre productos que se adaptan a tus necesidades.</p>
            <Link to="/productos" className="nosotros-boton">
              Ver Productos
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NosotrosPages;
