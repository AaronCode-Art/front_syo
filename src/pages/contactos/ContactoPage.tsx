import React from 'react';
import { 
  Phone, Mail, MapPin, Clock, ArrowRight, 
  Send, MessageCircle, Facebook, Instagram 
} from 'lucide-react';
import Encabezado from '../../components/encabezado/Encabezado';
import Footer from '../../components/footer/Footer';
import './ContactoPage.css';

const ContactoPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar el formulario
    alert('Mensaje enviado. Nos pondremos en contacto pronto.');
  };

  return (
    
    <div className="cp-container">
      <Encabezado showBanner={false} />
      <div className="cp-inner">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="eyebrow">S&O Store · Lima, Perú</div>
          <h1>Contácta<em>nos</em></h1>
          <p>Estamos aquí para ayudarte. Escríbenos o llámanos y te responderemos a la brevedad.</p>
        </section>

        <hr className="divider" />

        {/* INFO CARDS */}
        <section className="section-block">
          <div className="section-header">
            <div className="eyebrow">canales directos</div>
            <h2 className="sec-title">Cómo <em>encontrarnos</em></h2>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <div className="ic-icon"><Phone size={18} /></div>
              <h3>Teléfono</h3>
              <p>+51 999 999 999</p>
              <a href="tel:+51999999999" className="ic-link">
                Llamar ahora <ArrowRight size={14} />
              </a>
            </div>

            <div className="info-card">
              <div className="ic-icon"><Mail size={18} /></div>
              <h3>Email</h3>
              <p>contacto@so-repuestos.com</p>
              <a href="mailto:contacto@so-repuestos.com" className="ic-link">
                Enviar email <ArrowRight size={14} />
              </a>
            </div>

            <div className="info-card">
              <div className="ic-icon"><MapPin size={18} /></div>
              <h3>Dirección</h3>
              <p>Av. Principal 123<br />Lima, Perú</p>
              <a href="#" className="ic-link">
                Ver mapa <ArrowRight size={14} />
              </a>
            </div>

            <div className="info-card">
              <div className="ic-icon"><Clock size={18} /></div>
              <h3>Horarios</h3>
              <div className="horario-row"><span>Lun – Vie</span><span>9:00 – 18:00 <span className="badge-open">Abierto</span></span></div>
              <div className="horario-row"><span>Sáb</span><span>9:00 – 14:00</span></div>
              <div className="horario-row"><span>Dom</span><span>Cerrado</span></div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* SOCIAL MEDIA */}
        <section className="section-block">
          <div className="section-header">
            <div className="eyebrow">redes sociales</div>
            <h2 className="sec-title">Síguenos en <em>nuestras redes</em></h2>
          </div>

          <div className="redes-grid">
            <a href="#" className="red-card">
              <div className="red-icon-wrap"><MessageCircle /></div>
              <h3>WhatsApp</h3>
              <p>Chatea con nosotros</p>
            </a>
            <a href="#" className="red-card">
              <div className="red-icon-wrap"><Facebook /></div>
              <h3>Facebook</h3>
              <p>Síguenos</p>
            </a>
            <a href="#" className="red-card">
              <div className="red-icon-wrap"><Instagram /></div>
              <h3>Instagram</h3>
              <p>Novedades</p>
            </a>
            <a href="#" className="red-card">
              <div className="red-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </div>
              <h3>TikTok</h3>
              <p>Contenido exclusivo</p>
            </a>
          </div>
        </section>

        <hr className="divider" />

        {/* FORM SECTION */}
        <section className="section-block">
          <div className="section-header">
            <div className="eyebrow">formulario de contacto</div>
            <h2 className="sec-title">Envíanos un <em>mensaje</em></h2>
          </div>

          <div className="form-layout">
            <div className="form-info">
              <h3>Respondemos en menos de 24 horas</h3>
              <p>Nuestro equipo de soporte técnico y comercial está listo para resolver tus dudas sobre repuestos y pedidos.</p>
              <div className="resp-tag"><div className="resp-dot" />Tiempo de respuesta: &lt; 24h</div>
            </div>

            <form className="form-box" onSubmit={handleSubmit}>
              <div className="form-row">
                <input className="fi" type="text" placeholder="Tu nombre" required />
                <input className="fi" type="email" placeholder="Tu email" required />
              </div>
              <input className="fi" type="tel" placeholder="Teléfono (opcional)" />
              <div className="select-wrap">
                <select className="fi" defaultValue="">
                  <option value="" disabled>Motivo de contacto</option>
                  <option value="prod">Consulta sobre un producto</option>
                  <option value="order">Seguimiento de pedido</option>
                  <option value="gar">Garantía o devolución</option>
                </select>
              </div>
              <textarea className="fi" placeholder="¿En qué podemos ayudarte?"></textarea>
              <button type="submit" className="submit-btn">
                Enviar Mensaje <Send size={16} />
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactoPage;