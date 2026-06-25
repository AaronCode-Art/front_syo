// src/pages/carrito/CarritoPage.tsx
// Página del carrito + flujo de checkout.
// La lógica del checkout vive en hooks/componentes separados (carpeta ./checkout)
// para mantener este archivo corto y fácil de leer.

import React from 'react';
import { Link } from 'react-router-dom';

// Hooks
import { useCarrito } from '../../hooks/carrito/useCarrito';
import { useAuth } from '../../context/AuthContext';
import { useCheckout } from './checkout/useCheckout';

// Componentes
import Encabezado from '../../components/encabezado/Encabezado';
import Footer from '../../components/footer/Footer';
import CarritoItemsList from './CarritoItemsList';
import CarritoResumen from './CarritoResumen';
import CheckoutModal from './checkout/CheckoutModal';

// Estilos
import './carritopage.css';

const CarritoPage: React.FC = () => {
  const { user, actualizarUsuario } = useAuth();
  const {
    carrito, loading, error,
    cambiarCantidad, eliminarDelCarrito, vaciarCarrito,
  } = useCarrito();

  const ck = useCheckout({
    user,
    total: carrito?.total ?? 0,
    vaciarCarrito,
    actualizarUsuario,
  });

  // ── Guardias de carga ──────────────────────────────────────────────────────
  if (loading) return <div className="carrito-loading">Cargando tu carrito...</div>;
  if (error) return <div className="carrito-error">{error}</div>;

  if (!carrito || carrito.items.length === 0) {
    return (
      <div className="carrito-page">
        <Encabezado showBanner={false} />
        <div className="carrito-vacio">
          <div className="carrito-vacio-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Aún no has agregado productos.</p>
          <Link to="/productos" className="btn-ver-productos">Ver productos</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="carrito-page">
      <Encabezado showBanner={false} />

      <div className="carrito-contenedor">
        <h1 className="carrito-titulo">Tu Carrito</h1>

        <div className="carrito-grid">
          <CarritoItemsList
            items={carrito.items}
            onCambiarCantidad={cambiarCantidad}
            onEliminar={eliminarDelCarrito}
          />
          <CarritoResumen
            total={carrito.total}
            cantidadProductos={carrito.cantidadProductos}
            onProcederPago={ck.abrirModal}
          />
        </div>
      </div>

      <CheckoutModal ck={ck} user={user} />

      <Footer />
    </div>
  );
};

export default CarritoPage;
