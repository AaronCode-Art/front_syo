import api from '../api/Api';
import type {
    ClienteRegister,
    ClienteLogin,
    AuthResponse,
    ClientePerfil,
    UpdateCliente
} from '../types/Cliente.types';

/**
 * clienteService.ts
 * Servicio para comunicarse con el backend de clientes
 */
export const clienteService = {

    /**
     * Registro de nuevo cliente
     */
    registro: async (data: ClienteRegister): Promise<any> => {
        const response = await api.post('/clientes/registro', data);
        return response.data;
    },

    /**
     * Login del cliente (devuelve token + datos)
     */
    login: async (data: ClienteLogin): Promise<AuthResponse> => {
        const response = await api.post('/clientes/login', data);
        return response.data;
    },

    /**
     * Obtener perfil del cliente (requiere JWT)
     */
    obtenerPerfil: async (id: string): Promise<ClientePerfil> => {
        const response = await api.get(`/clientes/${id}`);
        return response.data;
    },

    /**
     * Actualizar perfil del cliente (requiere JWT)
     */
    actualizarPerfil: async (id: string, data: UpdateCliente): Promise<any> => {
        const response = await api.put(`/clientes/${id}`, data);
        return response.data;
    },

    /**
     * Eliminar cuenta del cliente (requiere JWT)
     */
    eliminarCuenta: async (id: string): Promise<void> => {
        await api.delete(`/clientes/${id}`);
    },
};