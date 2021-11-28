import React from 'react'
import { Socket } from 'socket.io-client'
import { User } from '../../types'

export interface ILobbyContext {
    socket: Socket | undefined
    colour: string
    radius: number
    word: string
    canDraw: boolean
    canChat: boolean
    isFinished: boolean
    users: User[]
    setSocket: (socket: Socket) => void
    setColour: (colour: string) => void
    setRadius: (radius: number) => void
    setWord: (word: string) => void
    setCanDraw: (canDraw: boolean) => void
    setCanChat: (canChat: boolean) => void
    setIsFinished: (isFinished: boolean) => void
    setUsers: (users: User[]) => void
}

export const LobbyContext = React.createContext<ILobbyContext>({
    socket: undefined,
    colour: 'black',
    radius: 12,
    word: '',
    canDraw: false,
    canChat: true,
    isFinished: false,
    users: [],
    setSocket: (_socket: Socket) => {},
    setColour: (_colour: string) => {},
    setRadius: (_radius: number) => {},
    setWord: (_word: string) => {},
    setCanDraw: (_canDraw: boolean) => {},
    setCanChat: (_canChat: boolean) => {},
    setIsFinished: (_isFinished: boolean) => {},
    setUsers: (_users: User[]) => {}
})
