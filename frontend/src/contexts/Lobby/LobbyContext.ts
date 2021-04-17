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
    addUser: (user: User) => void
    removeUser: (user: User) => void
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
    setSocket: (socket: Socket) => {},
    setColour: (colour: string) => {},
    setRadius: (radius: number) => {},
    setWord: (word: string) => {},
    setCanDraw: (canDraw: boolean) => {},
    setCanChat: (canChat: boolean) => {},
    setIsFinished: (isFinished: boolean) => {},
    addUser: (user: User) => {},
    removeUser: (user: User) => {}
})
