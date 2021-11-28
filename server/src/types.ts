import { Socket } from 'socket.io'

export interface User {
    id: string
    name: string
    points: number
    avatarURL: string
}

export interface RoundUser extends User {
    socket: Socket
}

export interface Message {
    id: string
    username: string
    avatarURL: string
    content: string
    timestamp: string
}
