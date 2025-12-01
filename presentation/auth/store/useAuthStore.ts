import { create } from 'zustand';

import { authCheckStatus, authLogin, authRegister, User } from "@/core";
import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking'

export interface AuthState {
    status: AuthStatus
    token?: string
    user?: User
    changeStatus: (token?: string, user?: User) => Promise<boolean>
    login: (email: string, password: string) => Promise<boolean>
    register: (fullName: string, email: string, password: string) => Promise<boolean>
    checkStatus: () => Promise<void>
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    
    //* Properties
    status: 'checking',
    token: undefined,
    user: undefined,

    //* Actions
    changeStatus: async (token?: string, user?: User) => {
        if ( !token || !user ) {
            set({ status: 'unauthenticated', token: undefined, user: undefined })
            await SecureStorageAdapter.deleteItem('token')
            return false
        }

        set({ status: 'authenticated', token, user })

        await SecureStorageAdapter.setItem('token', token)
        return true
    },

    login: async (email: string, password: string) => {

        const res = await authLogin(email, password)
        return get().changeStatus(res?.token, res?.user)
    },

    register: async (fullName: string, email: string, password: string) => {
        const res = await authRegister(fullName, email, password)
        return get().changeStatus(res?.token, res?.user)
    },

    checkStatus: async () => {
        const res = await authCheckStatus()
        get().changeStatus(res?.token, res?.user)
    },

    logout: async () => {
        SecureStorageAdapter.deleteItem('token')
        set({
            status: 'unauthenticated',
            token: undefined,
            user: undefined
        })
    }
}))