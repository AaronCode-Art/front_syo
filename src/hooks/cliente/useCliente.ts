import { useSession } from "./useSession";
import { usePerfil } from "./usePerfil";

export const useCliente = () => {

  const session = useSession();

  const perfil = usePerfil();

  return {
    ...session,
    ...perfil,
  };
};