import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-principal">
      <div className="footer-contenedor">
        
        <div className="footer-columna marca">
          <h3 className="footer-logo">S&O <span>Repuestos</span></h3>
          <p className="footer-descripcion">Repuestos al mejor precio con calidad garantizada</p>
        </div>

        <div className="footer-columna">
          <h4 className="footer-titulo">Enlaces</h4>
          <ul className="footer-lista">
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/nosotros">Nosotros</a></li>
          </ul>
        </div>

        <div className="footer-columna">
          <h4 className="footer-titulo">Soporte</h4>
          <ul className="footer-lista">
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="/pedidos">Mis Pedidos</a></li>
            <li><a href="/legal">Términos y Condiciones</a></li>
          </ul>
        </div>

        <div className="footer-columna">
          <h4 className="footer-titulo">Síguenos</h4>
          <div className="footer-redes">
            <a href="#" target="_blank"><FaFacebook size={24} /></a>
            <a href="#" target="_blank"><FaInstagram size={24} /></a>
            <a href="#" target="_blank"><FaTwitter size={24} /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} S&O Repuestos. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;