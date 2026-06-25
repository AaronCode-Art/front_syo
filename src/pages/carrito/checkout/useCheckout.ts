// src/pages/carrito/checkout/useCheckout.ts
// Hook que centraliza todo el estado y la lógica del flujo de checkout.
// Esto saca ~400 líneas de "const" sueltos del CarritoPage y los agrupa
// en un solo lugar reutilizable y fácil de seguir.

import { useState } from 'react';
import { pedidoService } from '../../../services/PedidoService';
import { clienteService } from '../../../services/clienteService';
import type { Cliente } from '../../../types/Cliente.types';
import type { ConfirmarPedidoDTO, PedidoDetalleDTO, CheckoutStep, DireccionForm } from './checkout.types';
import { DIRECCION_VACIA } from './checkout.types';

interface UseCheckoutParams {
  user: Cliente | null;
  total: number;
  vaciarCarrito: () => Promise<void>;
  actualizarUsuario?: (data: Partial<Cliente>) => void;
}

export function useCheckout({ user, total, vaciarCarrito, actualizarUsuario }: UseCheckoutParams) {
  // ── Estado general del modal ────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<CheckoutStep>('entrega');

  // ── Entrega / dirección ──────────────────────────────────────────────────
  const [tipoentrega, setTipoentrega] = useState<'delivery' | 'recojo'>('recojo');
  const [modoEdicionDir, setModoEdicionDir] = useState(false);
  const [dir, setDir] = useState<DireccionForm>(DIRECCION_VACIA);
  const [dirConfirmada, setDirConfirmada] = useState(false);
  const [guardarComoPerfil, setGuardarComoPerfil] = useState(false);

  // ── Modales de dirección ─────────────────────────────────────────────────
  const [modalModificarDir, setModalModificarDir] = useState(false);
  const [modalConfirmarDir, setModalConfirmarDir] = useState(false);

  // ── Comprobante ───────────────────────────────────────────────────────────
  const [tipocomprobante, setTipocomprobante] = useState<'boleta' | 'factura'>('boleta');
  const [ruc, setRuc] = useState('');
  const [razonSocial, setRazonSocial] = useState('');

  // ── Pago ──────────────────────────────────────────────────────────────────
  const [metodopago, setMetodopago] = useState<ConfirmarPedidoDTO['metodopago']>('yape');
  const [nroYape, setNroYape] = useState('');
  const [codigoAprobacion, setCodigoAprobacion] = useState('');
  const [nroTarjeta, setNroTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [nroCuenta, setNroCuenta] = useState('');

  // ── Resultado ────────────────────────────────────────────────────────────
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pedidoFinal, setPedidoFinal] = useState<PedidoDetalleDTO | null>(null);

  // ── Datos de dirección del perfil del cliente ───────────────────────────
  const dirPerfil: DireccionForm = {
    direccion: user?.direccion ?? '',
    referencia: user?.referencia ?? '',
    distrito: user?.distrito ?? '',
    codigopostal: user?.codigopostal ?? '',
  };
  const tieneDirPerfil = !!dirPerfil.direccion;

  // Combina lo escrito por el usuario con lo guardado en su perfil (fallback)
  const dirMostrada: DireccionForm = {
    direccion: dir.direccion || dirPerfil.direccion,
    referencia: dir.referencia || dirPerfil.referencia,
    distrito: dir.distrito || dirPerfil.distrito,
    codigopostal: dir.codigopostal || dirPerfil.codigopostal,
  };

  const setCampoDir = (campo: keyof DireccionForm, valor: string) => {
    setDir(prev => ({ ...prev, [campo]: valor }));
    if (campo === 'direccion') setDirConfirmada(false);
  };

  // Al elegir delivery: precarga la dirección del perfil en modo lectura
  const handleElegirDelivery = () => {
    setTipoentrega('delivery');
    setDirConfirmada(false);
    setModoEdicionDir(false);
    if (tieneDirPerfil) setDir(dirPerfil);
  };

  const handleElegirRecojo = () => {
    setTipoentrega('recojo');
    setDirConfirmada(false);
    setModoEdicionDir(false);
  };

  // Click en "Modificar" sobre la dirección mostrada
  const handleClickModificar = () => setModalModificarDir(true);

  // Acepta modificar → abre modo edición con los campos actuales precargados
  const aceptarModificar = () => {
    setModalModificarDir(false);
    setDir(dirMostrada);
    setModoEdicionDir(true);
    setDirConfirmada(false);
  };

  const cancelarModificar = () => setModalModificarDir(false);

  // ── Navegación entre pasos ────────────────────────────────────────────────
  const irAComprobante = () => {
    setErrorMsg(null);
    if (tipoentrega === 'delivery') {
      if (!dirMostrada.direccion.trim()) {
        setErrorMsg('La dirección es obligatoria para delivery.');
        return;
      }
      if (!dirConfirmada) {
        setModalConfirmarDir(true);
        return;
      }
    }
    setStep('comprobante');
  };

  // Confirma la dirección (modal) y, si el usuario lo pidió, la guarda en su perfil
  const aceptarDireccionConfirmada = async () => {
    setDirConfirmada(true);
    setModoEdicionDir(false);
    setModalConfirmarDir(false);

    if (guardarComoPerfil && actualizarUsuario) {
      try {
        if (user) {
          await clienteService.actualizarPerfil(user.idcliente, {
            direccion: dirMostrada.direccion,
            referencia: dirMostrada.referencia,
            distrito: dirMostrada.distrito,
            codigopostal: dirMostrada.codigopostal,
          });
          actualizarUsuario(dirMostrada);
        }
      } catch {
        // No bloquea el checkout si falla guardar el perfil
      }
    }

    setStep('comprobante');
  };

  const cancelarConfirmarDir = () => setModalConfirmarDir(false);
  const editarDesdeConfirmar = () => {
    setModalConfirmarDir(false);
    setDir(dirMostrada);
    setModoEdicionDir(true);
  };

  const irAPago = () => {
    setErrorMsg(null);
    if (tipocomprobante === 'factura' && !ruc.trim()) {
      setErrorMsg('El RUC es obligatorio para factura.');
      return;
    }
    setStep('pago');
  };

  const volverAEntrega = () => setStep('entrega');
  const volverAComprobante = () => setStep('comprobante');
  const volverAPago = () => setStep('pago');

  // ── Confirmar pago ────────────────────────────────────────────────────────
  const confirmarPago = async () => {
    setErrorMsg(null);

    if ((metodopago === 'yape' || metodopago === 'plin') && nroYape.length < 9) {
      setErrorMsg('Ingresa un número válido de 9 dígitos.');
      return;
    }
    if ((metodopago === 'yape' || metodopago === 'plin') && codigoAprobacion.length < 4) {
      setErrorMsg('El código de aprobación debe tener al menos 4 dígitos.');
      return;
    }
    if (metodopago === 'tarjeta_credito' || metodopago === 'tarjeta_debito') {
      if (nroTarjeta.replace(/\s/g, '').length < 16) { setErrorMsg('Número de tarjeta inválido.'); return; }
      if (!vencimiento) { setErrorMsg('Ingresa la fecha de vencimiento.'); return; }
      if (cvv.length < 3) { setErrorMsg('CVV inválido.'); return; }
    }
    if (metodopago === 'transferencia' && !nroCuenta.trim()) {
      setErrorMsg('Ingresa el número de operación.');
      return;
    }

    setStep('procesando');

    try {
      const dto: ConfirmarPedidoDTO = {
        tipoentrega,
        tipocomprobante,
        metodopago,
        direccion: tipoentrega === 'delivery' ? { ...dirMostrada } : null,
      };
      const pedido = await pedidoService.confirmarPedido(dto);
      setPedidoFinal(pedido);
      await vaciarCarrito();
      setStep('boleta');
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message ?? 'Error al procesar el pago.');
      setStep('pago');
    }
  };

  // ── Abrir / cerrar modal ──────────────────────────────────────────────────
  const abrirModal = () => {
    setStep('entrega');
    setTipoentrega('recojo');
    setModoEdicionDir(false);
    setDirConfirmada(false);
    setDir(DIRECCION_VACIA);
    setGuardarComoPerfil(false);
    setErrorMsg(null);
    setPedidoFinal(null);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    if (step !== 'procesando') setModalOpen(false);
  };

  return {
    // estado general
    modalOpen, step, errorMsg, pedidoFinal, total,
    abrirModal, cerrarModal,

    // entrega
    tipoentrega, modoEdicionDir, dir, dirMostrada, dirPerfil, tieneDirPerfil,
    dirConfirmada, guardarComoPerfil, setGuardarComoPerfil,
    setCampoDir, handleElegirDelivery, handleElegirRecojo,
    handleClickModificar, aceptarModificar, cancelarModificar,

    // modales de dirección
    modalModificarDir, modalConfirmarDir,
    aceptarDireccionConfirmada, cancelarConfirmarDir, editarDesdeConfirmar,

    // comprobante
    tipocomprobante, setTipocomprobante, ruc, setRuc, razonSocial, setRazonSocial,

    // pago
    metodopago, setMetodopago,
    nroYape, setNroYape, codigoAprobacion, setCodigoAprobacion,
    nroTarjeta, setNroTarjeta, vencimiento, setVencimiento, cvv, setCvv,
    nombreTarjeta, setNombreTarjeta, nroCuenta, setNroCuenta,

    // navegación
    irAComprobante, irAPago, volverAEntrega, volverAComprobante, volverAPago, confirmarPago,
  };
}

export type UseCheckoutReturn = ReturnType<typeof useCheckout>;
