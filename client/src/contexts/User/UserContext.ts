import React from 'react'

export interface IUserContext {
    name: string | null
    avatarURL: string | null
    setName: (name: string) => void
    setAvatarURL: (url: string) => void
}

export const UserContext = React.createContext<IUserContext>({
    name: '',
    avatarURL: '',
    setName: (_name: string) => {},
    setAvatarURL: (_url: string) => {}
})
