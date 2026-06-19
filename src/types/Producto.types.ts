/**
 * Tipos relacionados con los productos
 * Aquí definimos la estructura de datos que viene del backend
 */

export interface ProductoLista {
  idproducto: string;
  nombre: string;
  marca: string;
  precio: number;
  descuento: number;
  preciodesct: number;
  imgurl: string;
  stock:number;
}

/**
 * Tipo completo para el detalle de un producto
 * Se usa en el endpoint: /api/productos/detalle/{id}
 */
export interface ProductoDetalle extends ProductoLista {
  stock: number;
  descripcion: string;
  especificacionestecnicas: Record<string, any>; // Map<String, Object> del backend
  categoriaNombre?: string;
}

/**
 * Tipo para las respuestas paginadas que devuelve Spring Boot
 */
export interface PageResponse<T> {
  content: T[];           // Lista de productos de la página actual
  totalElements: number;  // Cantidad total de productos
  totalPages: number;     // Total de páginas
  size: number;           // Tamaño de página
  number: number;         // Página actual
  first: boolean;
  last: boolean;
}