import React from 'react'

export interface IUserContext {
    username: string
    avatarURL: string
    setUsername: (name: string) => void
    setAvatarURL: (url: string) => void
}

export const UserContext = React.createContext<IUserContext>({
    username: '',
    avatarURL: '',
    setUsername: (name: string) => {},
    setAvatarURL: (url: string) => {}
})
