// src/types/Carrito.types.ts
// Coincide exactamente con CarritoResponseDTO y CarritoItemResponseDTO del backend

export interface CarritoItemDTO {
  iditem: string;           // UUID del item en carritoitems
  productoid: string;
  nombre: string;
  marca: string;
  imgurl: string;
  precioUnitario: number;
  preciodesct: number;      // precio con descuento aplicado
  descuento: number;
  cantidad: number;
  subtotal: number;         // preciodesct * cantidad
  stockDisponible: number;
}

export interface CarritoResponseDTO {
  idcarrito: string;
  fechacreacion: string;
  items: CarritoItemDTO[];
  total: number;            // suma de subtotales
  cantidadProductos: number; // total de unidades en el carrito
}

// Payload para POST /api/carrito/agregar
export interface AgregarCarritoDTO {
  productoid: string;
  cantidad: number;
}

// Payload para PUT /api/carrito/item/{itemid}
export interface ActualizarItemDTO {
  cantidad: number;
}
