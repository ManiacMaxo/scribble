import { v4 } from 'uuid'

export interface User {
    id: string
    name: string
    points: number
    avatarURL: string
}

export interface Lobby {
    id: string
    name: string
    players: number
    maxPlayers: number
    round: number
    maxRounds: number
}

export class ServerLobby {
    id: string
    name: string
    players: User[]
    maxPlayers: number
    round: number
    maxRounds: number
    timer: number
    maxTime: number
    word: string
    hint: string

    constructor(
        maxPlayers: number = 10,
        maxRounds: number = 10,
        maxTime: number = 120
    ) {
        this.id = v4()
        this.name = `Lobby ${this.id}`
        this.players = []
        this.maxPlayers = maxPlayers
        this.round = 0
        this.maxRounds = maxRounds
        this.maxTime = maxTime
        this.timer = this.maxTime
        this.word = ''
        this.hint = ''
    }

    addPlayer(player: User) {
        this.players = [...this.players, player]
    }

    removePlayer(player: User) {
        this.players = this.players.filter((u) => u.id === player.id)
    }

    reset() {
        this.players.forEach((u) => (u.points = 0))
        this.round = 0
        this.timer = this.maxTime
    }
}

export interface Message {
    id: string
    username: string
    content: string
    timestamp: string
}
