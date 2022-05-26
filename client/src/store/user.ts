import create from 'zustand'
import { persist } from 'zustand/middleware'

export interface IUserStore {
    name: string | null
    avatarId: number
    avatarURL: () => string
    setAvatar: (avatarId: number) => void
}

export const useUser = create(
    persist<IUserStore>(
        (set, get) => ({
            name: null,
            avatarId: Math.round(Math.random() * 50),
            avatarURL: () => `/assets/avatars/${get().avatarId}.png`,
            setAvatar: (id: number) => set(() => ({ avatarId: id }))
        }),
        {
            name: 'user',
            getStorage: () => localStorage
        }
    )
)
