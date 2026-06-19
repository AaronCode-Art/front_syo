import React from "react";
import { Routes, Route } from "react-router-dom";

// Providers
import { AuthProvider } from './context/AuthContext';

// Components de protección
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";

// Chat global (flotante, aparece en toda la app)
import ChatBot from "./components/chatbot/ChatBot";

// Pages
import InicioPage from "./pages/inicio/InicioPage";
import NosotrosPages from "./pages/nosotros/NosotrosPages";
import ContactoPage from "./pages/contactos/ContactoPage";
import ProductoPage from "./pages/productos/ProductoPage";
import ProductoCatPage from "./pages/productoporcategoria/ProductoCatPage";
import ProductoDetallePage from "./pages/productodetalle/ProductoDetallePage";

// Páginas de autenticación
import LoginPage from "./pages/loguin/LoginPage";
import RegistroPage from "./pages/registro/RegistroPage";

// Páginas protegidas
import PedidosPage from "./pages/pedidos/PedidosPage";
import CarritoPage from "./pages/carrito/CarritoPage";
import PerfilPage from "./pages/perfil/PerfilPage";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<InicioPage />} />
        <Route path="/productos" element={<ProductoPage />} />
        <Route path="/categoria/:id" element={<ProductoCatPage />} />
        <Route path="/producto/:id" element={<ProductoDetallePage />} />
        <Route path="/nosotros" element={<NosotrosPages />} />
        <Route path="/contacto" element={<ContactoPage />} />

        {/* Rutas de autenticación (públicas) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />

        {/* Rutas PROTEGIDAS (solo si está logueado) */}
        <Route path="/perfil" element={
          <ProtectedRoute><PerfilPage /></ProtectedRoute>
        } />

        <Route path="/pedidos" element={
          <ProtectedRoute><PedidosPage /></ProtectedRoute>
        } />

        <Route path="/carrito" element={
          <ProtectedRoute><CarritoPage /></ProtectedRoute>
        } />

        {/* Ruta 404 */}
        <Route path="*" element={
          <div style={{ textAlign:'center', padding:'80px 20px', color:'white', fontSize:'2rem' }}>
            404 - Página no encontrada
          </div>
        } />

      </Routes>

      {/* ChatBot flotante — visible en toda la app */}
      <ChatBot />

    </AuthProvider>
  );
}

export default App;
