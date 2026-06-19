// hooks/encabezado/useEncabezado.ts

import { useCarrito } from "../carrito/useCarrito";

import { useHeaderMenu } from "./useHeaderMenu";
import { useHeaderScroll } from "./useHeaderScroll";
import { useHeaderSearch } from "./useHeaderSearch";
import { useHeaderProfile } from "./useHeaderProfile";
import { useHeaderNavigation } from "./useHeaderNavigation";

export const useEncabezado = () => {

  const menu = useHeaderMenu();

  const scroll = useHeaderScroll();

  const search = useHeaderSearch();

  const profile = useHeaderProfile();

  const navigation = useHeaderNavigation();

  const { carrito } = useCarrito();

  const cartCount =
    carrito?.items?.reduce(
      (total, item) => total + item.cantidad,
      0
    ) || 0;

  return {

    // menu
    ...menu,

    // scroll
    ...scroll,

    // search
    ...search,

    // profile
    ...profile,

    // navigation
    ...navigation,

    // carrito
    cartCount,
  };
};