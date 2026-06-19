import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { pedidoService } from '../../services/PedidoService';
import { useAuth } from '../../context/AuthContext';
import type { PedidoResumenDTO, PedidoDetalleDTO } from '../../types/pedido.types';
import Encabezado from '../../components/encabezado/Encabezado';
import Footer from '../../components/footer/Footer';
import BoletaDocumento from '../../components/boleta/BoletaDocumento';
import './pedidospage.css';

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatFecha = (iso: string) =>
  new Date(iso).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });

const formatFechaHora = (iso: string) =>
  new Date(iso).toLocaleString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const formatMetodo = (m: string) =>
  ({ yape: '💜 Yape', plin: '💚 Plin', tarjeta_credito: '💳 T. Crédito',
     tarjeta_debito: '💳 T. Débito', transferencia: '🏦 Transferencia', efectivo: '💵 Efectivo' }[m] ?? m);

const iconoEstado: Record<string, string> = {
  Pendiente: '🛒', Pagado: '✅', 'En preparacion': '📦',
  Enviado: '🚚', Entregado: '🏠', Cancelado: '❌',
};

// ── Badge de estado ────────────────────────────────────────────────────────────
const EstadoBadge: React.FC<{ estado: string }> = ({ estado }) => {
  const cls: Record<string, string> = {
    Pendiente: 'estado-pendiente', Pagado: 'estado-pagado',
    'En preparacion': 'estado-preparacion', Enviado: 'estado-enviado',
    Entregado: 'estado-entregado', Cancelado: 'estado-cancelado',
  };
  return <span className={`estado-badge ${cls[estado] ?? 'estado-otro'}`}>{estado}</span>;
};

const ESTADOS = ['todos', 'Pendiente', 'En preparacion', 'Enviado', 'Entregado', 'Cancelado'];

const PedidosPage: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const nroticketNuevo = (location.state as any)?.nroticket;

  const [pedidos, setPedidos]           = useState<PedidoResumenDTO[]>([]);
  const [detalle, setDetalle]           = useState<PedidoDetalleDTO | null>(null);
  const [loading, setLoading]           = useState(true);
  const [loadingDetalle, setLoadingDetalle] = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busquedaTicket, setBusquedaTicket] = useState('');
  const [boletaOpen, setBoletaOpen]     = useState(false);

  // Cargar pedidos
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setPedidos(await pedidoService.obtenerMisPedidos());
      } catch { setError('No se pudieron cargar tus pedidos.'); }
      finally { setLoading(false); }
    })();
  }, []);

  // Abrir detalle
  const verDetalle = async (pedidoid: string) => {
    try {
      setLoadingDetalle(true);
      setDetalle(await pedidoService.obtenerDetalle(pedidoid));
    } catch { console.error('Error al cargar detalle'); }
    finally { setLoadingDetalle(false); }
  };

  // Filtrado combinado: estado + búsqueda de ticket
  const pedidosFiltrados = pedidos
    .filter(p => filtroEstado === 'todos' || p.estado === filtroEstado)
    .filter(p => !busquedaTicket.trim() || p.nroticket.toLowerCase().includes(busquedaTicket.toLowerCase()));

  return (
    <div className="pedidos-page">
      <Encabezado showBanner={false} />

      <div className="pedidos-contenedor">
        <h1 className="pedidos-titulo">Mis Pedidos</h1>

        {/* Alerta compra exitosa */}
        {nroticketNuevo && (
          <div className="pedidos-alerta-exito">
            🎉 ¡Compra confirmada! Tu ticket: <strong>{nroticketNuevo}</strong>
          </div>
        )}

        {/* Buscador de ticket */}
        <div className="pedidos-search-bar">
          <span className="pedidos-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar por número de ticket (ej: S-93848)"
            value={busquedaTicket}
            onChange={e => setBusquedaTicket(e.target.value)}
          />
          {busquedaTicket && (
            <button className="pedidos-search-clear" onClick={() => setBusquedaTicket('')}>✕</button>
          )}
        </div>

        {/* Filtros */}
        <div className="pedidos-filtros">
          {ESTADOS.map(e => (
            <button key={e} className={`filtro-btn ${filtroEstado === e ? 'active' : ''}`}
              onClick={() => setFiltroEstado(e)}>
              {e === 'todos' ? 'Todos' : e}
            </button>
          ))}
        </div>

        {/* Estados */}
        {loading && <p className="pedidos-loading">Cargando tus pedidos...</p>}
        {error   && <p className="pedidos-error">{error}</p>}

        {!loading && !error && pedidosFiltrados.length === 0 && (
          <div className="pedidos-vacio">
            <p className="pedidos-vacio-icon">📋</p>
            <p>{busquedaTicket ? `No se encontró el ticket "${busquedaTicket}"` : `No tienes pedidos ${filtroEstado !== 'todos' ? `en estado "${filtroEstado}"` : 'aún'}.`}</p>
            {!busquedaTicket && <Link to="/productos" className="btn-ir-productos">Ver productos</Link>}
          </div>
        )}

        {/* Lista */}
        {!loading && !error && pedidosFiltrados.length > 0 && (
          <div className="pedidos-lista">
            {pedidosFiltrados.map(p => (
              <div key={p.idpedido} className="pedido-card">
                <div className="pedido-card-header">
                  <div className="pedido-ticket">
                    <span className="ticket-label">Ticket</span>
                    <span className="ticket-num">{p.nroticket}</span>
                  </div>
                  <EstadoBadge estado={p.estado} />
                </div>

                <div className="pedido-card-body">
                  <div className="pedido-info-item">
                    <span className="info-label">Fecha</span>
                    <span>{formatFecha(p.fecha)}</span>
                  </div>
                  <div className="pedido-info-item">
                    <span className="info-label">Entrega</span>
                    <span>{p.tipoentrega === 'delivery' ? '🚚 Delivery' : '🏪 Recojo'}</span>
                  </div>
                  <div className="pedido-info-item">
                    <span className="info-label">Productos</span>
                    <span>{p.cantidadItems} {p.cantidadItems === 1 ? 'item' : 'items'}</span>
                  </div>
                  <div className="pedido-info-item">
                    <span className="info-label">Comprobante</span>
                    <span className="capitalize">{p.tipocomprobante}</span>
                  </div>
                </div>

                <div className="pedido-card-footer">
                  <span className="pedido-total">S/ {p.total.toFixed(2)}</span>
                  <div className="pedido-card-actions">
                    <button className="btn-boleta" onClick={async () => {
                      await verDetalle(p.idpedido);
                      setBoletaOpen(true);
                    }}>
                      🧾 Boleta
                    </button>
                    <button className="btn-ver-detalle" onClick={() => { verDetalle(p.idpedido); setBoletaOpen(false); }}>
                      Ver detalle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          PANEL LATERAL DE DETALLE
      ══════════════════════════════════════════════════════════════════════ */}
      {(detalle || loadingDetalle) && !boletaOpen && (
        <div className="detalle-overlay" onClick={() => setDetalle(null)}>
          <div className="detalle-panel" onClick={e => e.stopPropagation()}>
            {loadingDetalle && <p className="detalle-loading">Cargando detalle...</p>}

            {detalle && !loadingDetalle && (
              <>
                <div className="detalle-panel-header">
                  <div>
                    <h2>Pedido {detalle.nroticket}</h2>
                    <p className="detalle-fecha">{formatFechaHora(detalle.fecha)}</p>
                    <div className="detalle-estado-badge">
                      <EstadoBadge estado={detalle.estadoActual} />
                    </div>
                  </div>
                  <div className="detalle-header-actions">
                    <button className="btn-boleta-panel" title="Ver boleta" onClick={() => setBoletaOpen(true)}>🧾</button>
                    <button className="btn-cerrar-detalle" onClick={() => setDetalle(null)}>✕</button>
                  </div>
                </div>

                <div className="detalle-panel-body">
                  {/* Productos */}
                  <div className="detalle-seccion">
                    <h3>Productos</h3>
                    <div className="detalle-items">
                      {detalle.items.map(item => (
                        <div key={item.iddetalle} className="detalle-item">
                          <img src={item.imgurl} alt={item.nombreProducto} />
                          <div className="detalle-item-info">
                            <p className="detalle-item-nombre">{item.nombreProducto}</p>
                            <p className="detalle-item-meta">
                              {item.cantidad} × S/ {item.preciounitario.toFixed(2)}
                              {item.descuento > 0 && <span className="descuento-badge"> -{item.descuento}%</span>}
                            </p>
                          </div>
                          <span className="detalle-item-total">S/ {item.preciototal.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dirección */}
                  {detalle.direccion && (
                    <div className="detalle-seccion">
                      <h3>Dirección de entrega</h3>
                      <div className="detalle-dir">
                        <p>📍 {detalle.direccion.direccion}</p>
                        {detalle.direccion.referencia && <p className="dir-ref">{detalle.direccion.referencia}</p>}
                        {detalle.direccion.distrito && <p>{detalle.direccion.distrito} {detalle.direccion.codigopostal && `(${detalle.direccion.codigopostal})`}</p>}
                      </div>
                    </div>
                  )}

                  {/* Pago */}
                  {detalle.pago && (
                    <div className="detalle-seccion">
                      <h3>Pago</h3>
                      <div className="detalle-pago">
                        <span>{formatMetodo(detalle.pago.metodopago)}</span>
                        <span className="pago-estado">✅ {detalle.pago.estadopago}</span>
                        <span className="pago-fecha">{formatFechaHora(detalle.pago.fechapago)}</span>
                      </div>
                    </div>
                  )}

                  {/* Historial / Seguimiento */}
                  <div className="detalle-seccion">
                    <h3>Seguimiento</h3>
                    <div className="historial-timeline">
                      {detalle.historial.map((h, i) => (
                        <div key={i} className={`historial-step ${i === detalle.historial.length - 1 ? 'ultimo' : ''}`}>
                          <div className="historial-icono">{iconoEstado[h.estado] ?? '📌'}</div>
                          <div className="historial-info">
                            <span className="historial-estado">{h.estado}</span>
                            <span className="historial-fecha">{formatFechaHora(h.fecha)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detalle-total-row">
                    <span>Total pagado</span>
                    <span className="detalle-total-monto">S/ {detalle.total.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL BOLETA — reutiliza el componente compartido BoletaDocumento,
          que ya incluye su propia impresión aislada (ventana nueva).
      ══════════════════════════════════════════════════════════════════════ */}
      {boletaOpen && detalle && (
        <div className="boleta-overlay" onClick={() => setBoletaOpen(false)}>
          <div className="boleta-modal-wrap" onClick={e => e.stopPropagation()}>
            <BoletaDocumento
              pedido={detalle}
              nombreCliente={`${user?.nombre ?? ''} ${user?.apellido ?? ''}`.trim()}
              dniCliente={user?.dni}
              onCerrar={() => setBoletaOpen(false)}
            />
          </div>
        </div>
      )}


      <Footer />
    </div>
  );
};

export default PedidosPage;
