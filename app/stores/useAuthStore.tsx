import { create } from "zustand"
import { persist } from "zustand/middleware"

import Cookies from "js-cookie"

// Interfaces
import { IUser } from "~/interfaces/User"

interface authState {
  user: IUser | null
  isAauthenticated: boolean
  auth_token?: string
  login: (user: IUser) => void
  logout: () => void
}

export const useAuthStore = create<authState>()(
  persist(
    (set) => ({
      user: null,
      isAauthenticated: false,
      login: (user) => {
        //TODO: Este Token lo usaremos mas adelante como el JWT de autenticación
        Cookies.set("auth_token", "123456789", { expires: 7 })

        set({ user, isAauthenticated: true })
      },
      logout: () => {
        // Aquí se remueve el token con el cual se protegen las rutas
        Cookies.remove("auth_token")
        set({ user: null, isAauthenticated: false })
      },
    }),
    { name: "auth-storage" }
  )
)
