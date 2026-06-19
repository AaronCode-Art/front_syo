/**
 * =============================================
 * TIPOS PARA CATEGORÍAS
 * =============================================
 * Se separaron en dos interfaces para mantener consistencia con los productos:
 * - CategoriaLista → para listas y cuadros (más ligero)
 * - CategoriaDetalle → para vista de detalle completo (con más información)
 */

export interface CategoriaLista {
  idcategoria: string;
  nombre: string;
  imgurl?: string;           // Imagen para mostrar en los cuadros
}

/**
 * Tipo completo para el detalle de una categoría
 * (Se usa si en el futuro quieres una página de detalle de categoría)
 */
export interface CategoriaDetalle extends CategoriaLista {
  descripcion: string;       // Descripción completa
}