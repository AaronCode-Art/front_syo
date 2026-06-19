import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCliente } from '../../hooks/cliente/useCliente';
import { usePerfilStats } from '../../hooks/cliente/usePerfilStats';
import { useCarrito } from '../../hooks/carrito/useCarrito';
import Encabezado from '../../components/encabezado/Encabezado';
import PageLoader from '../../components/loading/PageLoader';
import Footer from '../../components/footer/Footer';
import TarjetaProducto from '../../components/producto/TarjetaProducto';
import { productoService } from '../../services/productoService';
import type { ProductoLista } from '../../types/Producto.types';
import '../../components/seccionproducto/seccionproducto.css';
import './perfilpage.css';

const PerfilPage: React.FC = () => {
  const { user, obtenerPerfil, actualizarPerfil, eliminarCuenta, logout } = useCliente();
  const { agregarAlCarrito } = useCarrito();
  const { stats, loading: loadingStats } = usePerfilStats(!!user?.idcliente);

  const [perfil, setPerfil] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Recomendaciones: productos en oferta para "te puede interesar"
  const [recomendados, setRecomendados] = useState<ProductoLista[]>([]);
  const [loadingRecomendados, setLoadingRecomendados] = useState(true);

  // Cargar perfil una sola vez cuando tengamos el usuario
  useEffect(() => {
    if (!user?.idcliente) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const cargarPerfil = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await obtenerPerfil();
        if (isMounted) {
          setPerfil(data);
          setFormData(data);
        }
      } catch (err: any) {
        console.error("Error al cargar perfil:", err);
        if (isMounted) setError(err.message || 'Error al cargar el perfil');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    cargarPerfil();

    return () => { isMounted = false; };
  }, [user?.idcliente, obtenerPerfil]);

  // Cargar productos recomendados (en oferta, los más baratos)
  useEffect(() => {
    let isMounted = true;

    const cargarRecomendados = async () => {
      try {
        setLoadingRecomendados(true);
        const data = await productoService.getMasBaratos(4);
        if (isMounted) setRecomendados(data);
      } catch (err) {
        console.error("Error al cargar recomendaciones:", err);
      } finally {
        if (isMounted) setLoadingRecomendados(false);
      }
    };

    cargarRecomendados();
    return () => { isMounted = false; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      setError(null);
      setSuccess(null);
      await actualizarPerfil(formData);
      setPerfil(formData);
      setSuccess('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el perfil');
    }
  };

  const handleEliminarCuenta = async () => {
    if (!window.confirm('¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible.')) return;
    try {
      await eliminarCuenta();
      logout();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar la cuenta');
    }
  };

  const formatearMoneda = (valor: number) =>
    `S/ ${valor.toFixed(2)}`;

  const formatearFecha = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  // Porcentajes para la barra comparativa delivery vs recojo
  const totalEntregas = stats.totalDelivery + stats.totalRecojo;
  const pctDelivery = totalEntregas > 0 ? Math.round((stats.totalDelivery / totalEntregas) * 100) : 0;
  const pctRecojo = totalEntregas > 0 ? 100 - pctDelivery : 0;

  // ==================== LOADER ====================
  if (loading) {
    return <PageLoader message="Cargando tu perfil..." />;
  }

  return (
    <div className="perfil-page">
      <Encabezado showBanner={false} />

      <div className="perfil-contenedor">
        <div className="perfil-header">
          <h1>Mi Perfil</h1>
          {perfil?.correo && <p className="perfil-email">{perfil.correo}</p>}
        </div>

        {error && <p className="perfil-error">{error}</p>}
        {success && <p className="perfil-success">{success}</p>}

        {/* ==================== DATOS PERSONALES ==================== */}
        <div className="perfil-card">
          <div className="perfil-info">
            {!isEditing ? (
              // Modo vista
              <>
                <div className="info-row">
                  <span className="info-label">Nombre</span>
                  <span className="info-value">{perfil?.nombre} {perfil?.apellido}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">DNI</span>
                  <span className="info-value">{perfil?.dni}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Teléfono</span>
                  <span className="info-value">{perfil?.numero}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Dirección</span>
                  <span className="info-value">{perfil?.direccion}</span>
                </div>
                {perfil?.referencia && (
                  <div className="info-row">
                    <span className="info-label">Referencia</span>
                    <span className="info-value">{perfil.referencia}</span>
                  </div>
                )}
                <div className="info-row">
                  <span className="info-label">Distrito</span>
                  <span className="info-value">{perfil?.distrito || 'No especificado'}</span>
                </div>
              </>
            ) : (
              // Modo edición
              <div className="perfil-form">
                <div className="form-grid">
                  <div>
                    <label>Nombre</label>
                    <input name="nombre" value={formData.nombre || ''} onChange={handleChange} />
                  </div>
                  <div>
                    <label>Apellido</label>
                    <input name="apellido" value={formData.apellido || ''} onChange={handleChange} />
                  </div>
                </div>

                <div>
                  <label>Teléfono</label>
                  <input name="numero" value={formData.numero || ''} onChange={handleChange} />
                </div>

                <div>
                  <label>Dirección</label>
                  <input name="direccion" value={formData.direccion || ''} onChange={handleChange} />
                </div>

                <div>
                  <label>Referencia</label>
                  <input name="referencia" value={formData.referencia || ''} onChange={handleChange} />
                </div>

                <div>
                  <label>Distrito</label>
                  <input name="distrito" value={formData.distrito || ''} onChange={handleChange} />
                </div>
              </div>
            )}
          </div>

          <div className="perfil-acciones">
            {!isEditing ? (
              <>
                <button className="btn-editar" onClick={() => setIsEditing(true)}>
                  Editar perfil
                </button>
                <button className="btn-eliminar" onClick={handleEliminarCuenta}>
                  Eliminar cuenta
                </button>
              </>
            ) : (
              <>
                <button className="btn-guardar" onClick={handleGuardar}>
                  Guardar cambios
                </button>
                <button className="btn-cancelar" onClick={() => { setIsEditing(false); setFormData(perfil); }}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>

        {/* ==================== ESTADÍSTICAS DE COMPRAS ==================== */}
        <section className="perfil-stats-section">
          <div className="stats-header">
            <h2>Mi actividad de compras</h2>
            <Link to="/pedidos" className="ver-mas-top">Ver todos mis pedidos →</Link>
          </div>

          {loadingStats ? (
            <div className="stats-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="stat-card stat-skeleton" />
              ))}
            </div>
          ) : stats.totalPedidos === 0 ? (
            <div className="seccion-mensaje">
              <span className="seccion-mensaje-icono">🛒</span>
              <p>Todavía no tienes pedidos. ¡Anímate a hacer tu primera compra!</p>
              <Link to="/productos" className="btn-editar" style={{ marginTop: 16 }}>
                Ver productos
              </Link>
            </div>
          ) : (
            <>
              {/* Tarjetas resumen */}
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-icono">📦</span>
                  <span className="stat-valor">{stats.totalPedidos}</span>
                  <span className="stat-label">Pedidos realizados</span>
                </div>

                <div className="stat-card">
                  <span className="stat-icono">💰</span>
                  <span className="stat-valor">{formatearMoneda(stats.totalGastado)}</span>
                  <span className="stat-label">Total gastado</span>
                </div>

                <div className="stat-card">
                  <span className="stat-icono">🧾</span>
                  <span className="stat-valor">{stats.totalItemsComprados}</span>
                  <span className="stat-label">Productos comprados</span>
                </div>

                <div className="stat-card">
                  <span className="stat-icono">⭐</span>
                  <span className="stat-valor">
                    {stats.pedidoMasAlto ? formatearMoneda(stats.pedidoMasAlto.total) : '—'}
                  </span>
                  <span className="stat-label">Pedido más alto</span>
                </div>
              </div>

              {/* Comparativa delivery vs recojo */}
              <div className="entrega-card">
                <h3>Forma de entrega preferida</h3>

                <div className="entrega-comparativa">
                  <div className="entrega-item">
                    <div className="entrega-item-top">
                      <span className="entrega-icono">🚚</span>
                      <div>
                        <span className="entrega-valor">{stats.totalDelivery}</span>
                        <span className="entrega-label">Delivery</span>
                      </div>
                    </div>
                  </div>

                  <div className="entrega-item">
                    <div className="entrega-item-top">
                      <span className="entrega-icono">🏪</span>
                      <div>
                        <span className="entrega-valor">{stats.totalRecojo}</span>
                        <span className="entrega-label">Recojo en tienda</span>
                      </div>
                    </div>
                  </div>
                </div>

                {totalEntregas > 0 && (
                  <div className="entrega-barra">
                    <div
                      className="entrega-barra-delivery"
                      style={{ width: `${pctDelivery}%` }}
                      title={`Delivery ${pctDelivery}%`}
                    />
                    <div
                      className="entrega-barra-recojo"
                      style={{ width: `${pctRecojo}%` }}
                      title={`Recojo ${pctRecojo}%`}
                    />
                  </div>
                )}

                <div className="entrega-leyenda">
                  <span><i className="dot dot-delivery" /> Delivery {pctDelivery}%</span>
                  <span><i className="dot dot-recojo" /> Recojo {pctRecojo}%</span>
                </div>
              </div>

              {/* Comprobantes y último pedido */}
              <div className="detalle-grid">
                <div className="detalle-card">
                  <h3>Comprobantes emitidos</h3>
                  <div className="detalle-row">
                    <span>📄 Boletas</span>
                    <strong>{stats.totalBoleta}</strong>
                  </div>
                  <div className="detalle-row">
                    <span>🧮 Facturas</span>
                    <strong>{stats.totalFactura}</strong>
                  </div>
                </div>

                {stats.ultimoPedido && (
                  <div className="detalle-card">
                    <h3>Último pedido</h3>
                    <div className="detalle-row">
                      <span>Ticket</span>
                      <strong>{stats.ultimoPedido.nroticket}</strong>
                    </div>
                    <div className="detalle-row">
                      <span>Fecha</span>
                      <strong>{formatearFecha(stats.ultimoPedido.fecha)}</strong>
                    </div>
                    <div className="detalle-row">
                      <span>Estado</span>
                      <strong>{stats.ultimoPedido.estado}</strong>
                    </div>
                    <Link
                      to="/pedidos"
                      className="btn-cancelar detalle-link"
                    >
                      Ver detalle
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        {/* ==================== PRODUCTOS QUE PUEDEN INTERESARTE ==================== */}
        <section className="perfil-recomendados-section">
          <div className="stats-header">
            <h2>Productos que pueden interesarte</h2>
            <Link to="/productos" className="ver-mas-top">Ver catálogo completo →</Link>
          </div>

          {loadingRecomendados ? (
            <div className="fila-productos">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="tarjeta-contenedor">
                  <div className="tarjeta-skeleton">
                    <div className="skeleton-img" />
                    <div className="skeleton-line skeleton-line-sm" />
                    <div className="skeleton-line skeleton-line-lg" />
                    <div className="skeleton-line skeleton-line-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : recomendados.length === 0 ? (
            <div className="seccion-mensaje">
              <span className="seccion-mensaje-icono">📦</span>
              <p>Aún no hay recomendaciones disponibles.</p>
            </div>
          ) : (
            <div className="fila-productos">
              {recomendados.map((producto) => (
                <div key={producto.idproducto} className="tarjeta-contenedor">
                  <TarjetaProducto
                    producto={producto}
                    onAgregarAlCarrito={agregarAlCarrito}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PerfilPage;