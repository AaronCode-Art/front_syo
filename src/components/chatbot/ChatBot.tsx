import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './chatbot.css';

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface Mensaje {
  tipo: 'bot' | 'user';
  texto: string;
  opciones?: string[];
}

// ── Respuestas del bot ────────────────────────────────────────────────────────
const RESPUESTAS: Record<string, { texto: string; opciones?: string[] }> = {
  inicio: {
    texto: '👋 ¡Hola! Soy el asistente de **SyO Repuestos**. ¿En qué puedo ayudarte?',
    opciones: ['¿En qué estado está mi pedido?', '¿Cómo comprar?', '¿Cómo pagar?', '¿Política de entregas?', '¿Garantías?', 'Contactar soporte'],
  },
  '¿En qué estado está mi pedido?': {
    texto: '📦 Para ver el estado de tu pedido:\n\n1. Ve a **Mis Pedidos** en el menú\n2. Busca el número de ticket (ej: S-93848)\n3. Haz clic en **Ver detalle**\n\nEncontrarás el historial completo con fechas de cada estado.',
    opciones: ['¿Cuánto demora el delivery?', '¿Puedo cancelar mi pedido?', 'Volver al inicio'],
  },
  '¿Cómo comprar?': {
    texto: '🛒 El proceso de compra es muy simple:\n\n1. Busca el producto que necesitas\n2. Haz clic en **Agregar al carrito**\n3. Ve al carrito y revisa tus productos\n4. Selecciona entrega, comprobante y forma de pago\n5. ¡Confirma y listo!',
    opciones: ['¿Cómo pagar?', '¿Qué tipos de entrega hay?', 'Volver al inicio'],
  },
  '¿Cómo pagar?': {
    texto: '💳 Aceptamos los siguientes métodos de pago:\n\n💜 **Yape** — Transfiere y verifica con código\n💚 **Plin** — Igual que Yape\n💳 **Tarjeta** — Crédito o débito\n🏦 **Transferencia** — BCP, con número de operación\n💵 **Efectivo** — Al recibir tu pedido',
    opciones: ['¿Cómo pago con Yape?', '¿Es seguro pagar con tarjeta?', 'Volver al inicio'],
  },
  '¿Cómo pago con Yape?': {
    texto: '💜 Para pagar con Yape:\n\n1. Selecciona **Yape** en el método de pago\n2. Escanea el QR que aparece o ingresa el número\n3. Realiza la transferencia\n4. Ingresa el **código de aprobación** que aparece en tu app Yape\n5. ¡Listo, compra confirmada!',
    opciones: ['¿Cómo pagar?', 'Volver al inicio'],
  },
  '¿Es seguro pagar con tarjeta?': {
    texto: '🔒 Sí, totalmente seguro. Utilizamos cifrado SSL para proteger tus datos. Nunca almacenamos los datos completos de tu tarjeta.',
    opciones: ['¿Cómo pagar?', 'Volver al inicio'],
  },
  '¿Política de entregas?': {
    texto: '🚚 Tenemos dos opciones de entrega:\n\n🏪 **Recojo en tienda** — Gratis, mismo día\n🚚 **Delivery** — Lima Metropolitana, 1-3 días hábiles\n\nEl envío es **GRATIS** en productos seleccionados.',
    opciones: ['¿Cuánto demora el delivery?', '¿En qué zonas hacen delivery?', 'Volver al inicio'],
  },
  '¿Cuánto demora el delivery?': {
    texto: '⏱️ El tiempo de entrega es:\n\n📦 **En preparacion:** 1-2 horas\n🚚 **Enviado (delivery):** 1-3 días hábiles\n\nPuedes seguir el estado en tiempo real desde **Mis Pedidos**.',
    opciones: ['¿En qué zonas hacen delivery?', 'Volver al inicio'],
  },
  '¿En qué zonas hacen delivery?': {
    texto: '📍 Hacemos delivery en toda **Lima Metropolitana** y Callao.\n\nPara otras regiones, por favor contáctanos directamente.',
    opciones: ['Contactar soporte', 'Volver al inicio'],
  },
  '¿Garantías?': {
    texto: '🛡️ Todos los productos de SyO Repuestos tienen **garantía contra defectos de fabricación**.\n\nSi tu producto presenta algún problema:\n1. Contáctanos dentro de los **30 días** de la compra\n2. Presenta tu número de ticket\n3. Coordinamos el cambio o devolución',
    opciones: ['Contactar soporte', 'Volver al inicio'],
  },
  '¿Puedo cancelar mi pedido?': {
    texto: '❌ Solo puedes cancelar un pedido si está en estado **Pendiente** (antes de que se procese el pago).\n\nUna vez que el pedido está **En preparacion** o **Enviado**, no se puede cancelar.\n\nPara cancelaciones especiales, contáctanos.',
    opciones: ['Contactar soporte', 'Volver al inicio'],
  },
  'Contactar soporte': {
    texto: '📞 Puedes contactarnos por:\n\n📧 **Email:** soporte@syo-repuestos.com\n📱 **WhatsApp:** +51 999 888 777\n🕐 **Horario:** Lun–Sab 9am – 7pm\n\nTambién puedes ir a la página de **Contacto**.',
    opciones: ['Volver al inicio'],
  },
  'Volver al inicio': {
    texto: '¿En qué más puedo ayudarte?',
    opciones: ['¿En qué estado está mi pedido?', '¿Cómo comprar?', '¿Cómo pagar?', '¿Política de entregas?', '¿Garantías?', 'Contactar soporte'],
  },
};

// ── Componente ────────────────────────────────────────────────────────────────
const ChatBot: React.FC = () => {
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [inputTexto, setInputTexto] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Mensaje inicial al abrir
  useEffect(() => {
    if (abierto && mensajes.length === 0) {
      agregarBot(RESPUESTAS.inicio.texto, RESPUESTAS.inicio.opciones);
    }
  }, [abierto]);

  // Scroll al fondo
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes, typing]);

  const agregarBot = (texto: string, opciones?: string[]) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMensajes(prev => [...prev, { tipo: 'bot', texto, opciones }]);
    }, 700);
  };

  const handleOpcion = (opcion: string) => {
    setMensajes(prev => [...prev, { tipo: 'user', texto: opcion }]);
    const resp = RESPUESTAS[opcion];
    if (resp) {
      agregarBot(resp.texto, resp.opciones);
    } else {
      agregarBot('Entendido. ¿Hay algo más en lo que pueda ayudarte?', ['Volver al inicio']);
    }
  };

  const handleEnviar = () => {
    const texto = inputTexto.trim();
    if (!texto) return;
    setInputTexto('');
    setMensajes(prev => [...prev, { tipo: 'user', texto }]);

    // Búsqueda básica por palabras clave
    const t = texto.toLowerCase();
    if (t.includes('pedido') || t.includes('estado') || t.includes('ticket')) {
      agregarBot(RESPUESTAS['¿En qué estado está mi pedido?'].texto, RESPUESTAS['¿En qué estado está mi pedido?'].opciones);
    } else if (t.includes('pag') || t.includes('yape') || t.includes('tarjeta')) {
      agregarBot(RESPUESTAS['¿Cómo pagar?'].texto, RESPUESTAS['¿Cómo pagar?'].opciones);
    } else if (t.includes('comprar') || t.includes('carrito')) {
      agregarBot(RESPUESTAS['¿Cómo comprar?'].texto, RESPUESTAS['¿Cómo comprar?'].opciones);
    } else if (t.includes('entrega') || t.includes('delivery') || t.includes('envio') || t.includes('envío')) {
      agregarBot(RESPUESTAS['¿Política de entregas?'].texto, RESPUESTAS['¿Política de entregas?'].opciones);
    } else if (t.includes('garantia') || t.includes('garantía') || t.includes('devoluc')) {
      agregarBot(RESPUESTAS['¿Garantías?'].texto, RESPUESTAS['¿Garantías?'].opciones);
    } else if (t.includes('cancelar') || t.includes('cancel')) {
      agregarBot(RESPUESTAS['¿Puedo cancelar mi pedido?'].texto, RESPUESTAS['¿Puedo cancelar mi pedido?'].opciones);
    } else if (t.includes('contacto') || t.includes('soporte') || t.includes('ayuda')) {
      agregarBot(RESPUESTAS['Contactar soporte'].texto, RESPUESTAS['Contactar soporte'].opciones);
    } else {
      agregarBot('No estoy seguro de cómo ayudarte con eso 🤔\nTe dejo las opciones principales:', RESPUESTAS.inicio.opciones);
    }
  };

  // Renderizar texto con **negrita**
  const renderTexto = (texto: string) =>
    texto.split('\n').map((linea, i) => {
      const partes = linea.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {partes.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : <span key={j}>{p}</span>)}
          {i < texto.split('\n').length - 1 && <br />}
        </span>
      );
    });

  return (
    <>
      {/* ── Botón flotante ── */}
      <button className={`chatbot-fab ${abierto ? 'abierto' : ''}`} onClick={() => setAbierto(!abierto)} aria-label="Asistente">
        {abierto ? '✕' : '💬'}
        {!abierto && <span className="chatbot-fab-badge">?</span>}
      </button>

      {/* ── Ventana del chat ── */}
      {abierto && (
        <div className="chatbot-ventana">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">🤖</div>
            <div>
              <p className="chatbot-nombre">Asistente SyO</p>
              <p className="chatbot-estado">● En línea</p>
            </div>
            <button className="chatbot-cerrar" onClick={() => setAbierto(false)}>✕</button>
          </div>

          {/* Mensajes */}
          <div className="chatbot-mensajes">
            {mensajes.map((m, i) => (
              <div key={i} className={`chatbot-msg-wrap ${m.tipo}`}>
                {m.tipo === 'bot' && <div className="chatbot-msg-avatar">🤖</div>}
                <div className={`chatbot-burbuja ${m.tipo}`}>
                  <p>{renderTexto(m.texto)}</p>
                  {m.tipo === 'bot' && m.opciones && (
                    <div className="chatbot-opciones">
                      {m.opciones.map(op => (
                        <button key={op} className="chatbot-opcion" onClick={() => handleOpcion(op)}>
                          {op}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="chatbot-msg-wrap bot">
                <div className="chatbot-msg-avatar">🤖</div>
                <div className="chatbot-burbuja bot chatbot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              value={inputTexto}
              onChange={e => setInputTexto(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleEnviar()}
            />
            <button onClick={handleEnviar} disabled={!inputTexto.trim()}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
