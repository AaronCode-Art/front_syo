# SyO Repuestos — Frontend

E-commerce de repuestos construido en **React + TypeScript**, con catálogo de productos, carrito de compras, checkout multi-paso, gestión de pedidos, autenticación de clientes y un chatbot de soporte integrado.

Este repositorio contiene únicamente el **frontend** (`src/`). Consume una API REST externa (backend en Spring Boot).

## Características

- 🛍️ **Catálogo de productos** con categorías, búsqueda, filtros y paginación
- 🛒 **Carrito de compras** persistente (agregar, actualizar cantidad, eliminar, vaciar)
- 💳 **Checkout multi-paso**: entrega (delivery / recojo en tienda), comprobante (boleta / factura) y método de pago
- 📦 **Gestión de pedidos**: historial, detalle y seguimiento de estado
- 🔐 **Autenticación de clientes** con JWT (login, registro, perfil, sesión persistente)
- 🤖 **ChatBot** flotante de soporte con respuestas guiadas
- 🧾 **Generación de boleta/comprobante** de compra
- 🔒 **Rutas protegidas** para secciones que requieren sesión iniciada

## Stack técnico

| Tecnología | Uso |
|---|---|
| [React](https://react.dev/) + TypeScript | Librería de UI y tipado estático |
| [React Router](https://reactrouter.com/) | Enrutamiento SPA |
| [Axios](https://axios-http.com/) | Cliente HTTP hacia la API |
| Context API | Estado global de autenticación |
| Custom Hooks | Lógica de negocio desacoplada de la UI |
| CSS Modules por componente | Estilos aislados por feature |

> El proyecto está organizado para usarse con **Vite** (estructura `src/main.tsx`, `index.css`). Si falta `package.json`/`vite.config.ts` en tu copia local, inicializa el proyecto con `npm create vite@latest` (template `react-ts`) y reemplaza la carpeta `src/` generada por la de este repositorio.

## Estructura del proyecto

```
src/
├── api/                  # Configuración de Axios (baseURL, interceptores JWT)
├── components/           # Componentes reutilizables de UI
│   ├── boleta/           # Documento/boleta de compra
│   ├── categoria/        # Sección de categorías en home
│   ├── chatbot/          # ChatBot flotante de soporte
│   ├── encabezado/       # Header / navegación
│   ├── footer/           # Footer
│   ├── loading/          # Spinners / loaders
│   ├── modalcompra/      # Modal "agregado al carrito"
│   ├── producto/         # Tarjeta de producto
│   ├── protectedroute/   # HOC de rutas protegidas
│   └── seccionproducto/  # Grillas/secciones de productos
├── context/
│   └── AuthContext.tsx   # Estado global de sesión (usuario, token, login/logout)
├── hooks/                # Hooks por dominio (carrito, cliente, producto, categoria, encabezado...)
├── pages/                # Páginas/vistas de la app
│   ├── carrito/          # Carrito + flujo de checkout (steps, modales)
│   ├── contactos/
│   ├── inicio/
│   ├── loguin/
│   ├── nosotros/
│   ├── pedidos/
│   ├── perfil/
│   ├── productodetalle/
│   ├── productoporcategoria/
│   ├── productos/
│   └── registro/
├── services/              # Llamadas a la API por dominio (Carrito, Cliente, Categoria, Producto, Pedido)
├── types/                 # Interfaces TypeScript / DTOs (alineados con el backend)
├── App.tsx                # Definición de rutas
└── main.tsx                # Punto de entrada
```

## Rutas de la aplicación

| Ruta | Página | Acceso |
|---|---|---|
| `/` | Inicio | Público |
| `/productos` | Listado de productos | Público |
| `/categoria/:id` | Productos por categoría | Público |
| `/producto/:id` | Detalle de producto | Público |
| `/nosotros` | Nosotros | Público |
| `/contacto` | Contacto | Público |
| `/login` | Iniciar sesión | Público |
| `/registro` | Registro de cliente | Público |
| `/perfil` | Perfil del cliente | 🔒 Protegida |
| `/pedidos` | Mis pedidos | 🔒 Protegida |
| `/carrito` | Carrito y checkout | 🔒 Protegida |
| `*` | 404 | — |

## Instalación

```bash
# 1. Clonar el repositorio

# 2. Instalar dependencias
npm install

# 3. Levantar el entorno de desarrollo
npm run dev
```

## Conexión con el backend

El cliente HTTP está centralizado en `src/api/Api.ts`:

- **Base URL** apunta por defecto a la API en producción (`https://backendsyo.onrender.com/api`).
- Se inyecta automáticamente el header `Authorization: Bearer <token>` en cada request si existe sesión.
- Ante una respuesta `401`, la sesión se limpia automáticamente y se redirige a `/login`.

Para apuntar a un backend local, edita la constante `baseURL` en `src/api/Api.ts` (o adapta el archivo para leerla desde una variable de entorno, p. ej. `import.meta.env.VITE_API_URL`).

## Autenticación

La sesión se maneja mediante `AuthContext` (`src/context/AuthContext.tsx`):

- Persiste `user` y `token` en `localStorage`.
- Expone `login`, `logout`, `isAuthenticated`, `isAuthLoading` y `actualizarUsuario`.
- Las rutas protegidas usan el componente `ProtectedRoute`, que redirige a `/login` si no hay sesión activa.

## Módulos principales

- **Productos** (`services/productoService.ts`, `hooks/producto/*`): listado, detalle, búsqueda, filtros por precio/orden, productos por categoría y productos en oferta.
- **Categorías** (`services/categoriaService.ts`): listado y detalle de categorías.
- **Carrito** (`services/CarritoService.ts`, `hooks/carrito/*`): agregar, actualizar cantidad, eliminar ítem y vaciar carrito.
- **Pedidos** (`services/PedidoService.ts`): confirmar compra desde el carrito, historial de pedidos y detalle (items, pago, dirección, historial de estados).
- **Cliente** (`services/clienteService.ts`, `hooks/cliente/*`): registro, login, perfil y actualización de datos.
- **Checkout** (`pages/carrito/checkout/`): flujo guiado por pasos — entrega → comprobante → pago → confirmación, con modales para confirmar/modificar dirección.

## Scripts disponibles

```bash
npm run dev       # Entorno de desarrollo
npm run build     # Build de producción
npm run preview   # Previsualizar el build de producción
```



## Notas

- Los tipos en `src/types/` están diseñados para coincidir exactamente con los DTOs del backend (Spring Boot), facilitando el tipado end-to-end.
- Cada servicio en `src/services/` documenta en comentarios los endpoints exactos del backend que consume.
