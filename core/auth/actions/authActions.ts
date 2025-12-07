import { productsApi } from "@/core/api/productsApi";
import { User } from "../interfaces/user";

export interface AuthResponse {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    token:    string;
}

const returnUserToken = (data: AuthResponse) => {

    const { id, email, fullName, isActive, roles, token } = data
    const user: User = { id, email, fullName, isActive, roles }

    return { user, token }
}

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase()
    try {
        const { data } = await productsApi.post<AuthResponse>('/auth/login', { email, password })
        return returnUserToken(data) 

    } catch (error: any) {
        if (error.response?.status === 401) {
            throw new Error('Credenciales inválidas')
        }
        throw new Error('Error de conexión o credenciales inválidas')
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await productsApi.get<AuthResponse>('/auth/check-status')
        return returnUserToken(data)

    } catch (error) {
        console.log(error)
        return null
    }
}

export const authRegister = async (fullName: string, email: string, password: string) => {
    email = email.toLowerCase()
    try {
        const { data } = await productsApi.post<AuthResponse>('/auth/register', { fullName, email, password })
        return returnUserToken(data)

    } catch (error: any) {
        if (error.response?.status === 400) {
            throw new Error('Datos inválidos o usuario ya existe')
        }
        throw new Error('Error de conexión o registro inválido')
    }
}
