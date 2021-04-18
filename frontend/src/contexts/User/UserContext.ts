import React from 'react'

export interface IUserContext {
    username: string | null
    avatarURL: string | null
    setUsername: (name: string) => void
    setAvatarURL: (url: string) => void
}

export const UserContext = React.createContext<IUserContext>({
    username: '',
    avatarURL: '',
    setUsername: (_name: string) => {},
    setAvatarURL: (_url: string) => {}
})
