import React from 'react'
import { Socket } from 'socket.io-client'

export interface ILobbyContext {
    socket: Socket | undefined
    colour: string
    word: string
    setSocket: (socket: Socket) => void
    setColour: (colour: string) => void
    setWord: (word: string) => void
}

export const LobbyContext = React.createContext<ILobbyContext>({
    socket: undefined,
    colour: 'black',
    word: '',
    setSocket: (socket: Socket) => {},
    setColour: (colour: string) => {},
    setWord: (word: string) => {}
})
