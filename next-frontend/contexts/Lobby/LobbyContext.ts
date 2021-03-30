import React from 'react'
import { Socket } from 'socket.io-client'

export interface ILobbyContext {
    socket: Socket | undefined
    colour: string
    radius: number
    word: string
    setSocket: (socket: Socket) => void
    setColour: (colour: string) => void
    setRadius: (radius: number) => void
    setWord: (word: string) => void
}

export const LobbyContext = React.createContext<ILobbyContext>({
    socket: undefined,
    colour: 'black',
    radius: 12,
    word: '',
    setSocket: (socket: Socket) => {},
    setColour: (colour: string) => {},
    setRadius: (radius: number) => {},
    setWord: (word: string) => {}
})
