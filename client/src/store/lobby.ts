import { User } from '@/utils/types'
import { Socket } from 'socket.io-client'
import create from 'zustand'

export interface ILobbyStore {
    socket?: Socket
    word: string
    canDraw: boolean
    canChat: boolean
    isFinished: boolean
    users: User[]
    id: string | null
    addUser: (user: User) => void
    removeUser: (user: User) => void
}

const initialValues = {
    socket: undefined,
    id: null,
    word: '',
    canDraw: false,
    canChat: true,
    isFinished: false,
    users: []
}

export const useLobby = create<ILobbyStore>((set) => ({
    ...initialValues,
    addUser: (user: User) => set(({ users }) => ({ users: [...users, user] })),
    removeUser: (user: User) =>
        set(({ users }) => ({ users: users.filter((u) => u.id !== user.id) })),
    leave: () =>
        set((state) => {
            if (state.socket) {
                state.socket.emit('leave')
                state.socket.disconnect()
            }

            return initialValues
        })
}))
