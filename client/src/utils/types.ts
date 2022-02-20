export interface User {
    id: string
    name: string
    points: number
    avatarURL: string
}

export interface Lobby {
    id: string
    name: string
    users: number
    maxUsers: number
    round: number
    maxRounds: number
}

export interface Message {
    id: string
    username: string
    avatarURL: string
    content: string
    timestamp: string
}
