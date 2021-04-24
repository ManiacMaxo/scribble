import { Namespace, Socket } from 'socket.io'
import { v4 } from 'uuid'
import { User } from './types'
import { Round } from './Round'

export class ServerLobby {
    id: string
    name: string
    users: Map<string, User>
    maxUsers: number
    round: number
    currentRound?: Round
    maxRounds: number
    maxTime: number
    isPrivate: boolean
    nsp?: Namespace
    running: boolean

    constructor(
        maxUsers: number = 9,
        maxRounds: number = 6,
        maxTime: number = 120,
        isPrivate: boolean = false
    ) {
        this.id = v4().slice(0, 5)
        this.name = `Lobby ${this.id}`
        this.users = new Map()
        this.maxUsers = maxUsers
        this.round = 0
        this.maxRounds = maxRounds
        this.maxTime = maxTime
        this.isPrivate = isPrivate
        this.running = false
    }

    init(nsp: Namespace) {
        console.log('init namespace: %s', nsp.name)
        if (this.nsp) return
        this.nsp = nsp
    }

    addUser(user: User, socket: Socket) {
        if (this.users.has(user.id)) return
        console.log('Lobby.addUser: %s', user.name)

        socket.emit('users', Array.from(this.users.values()))
        this.nsp?.emit('userJoin', user)

        this.currentRound?.addUser(user)
        this.users.set(user.id, user)
    }

    removeUser(user: User) {
        this.users.delete(user.id)
        this.currentRound?.removeUser(user)
        this.nsp?.emit('userLeave', user)
    }

    async run() {
        console.log('Lobby.run')
        if (!this.nsp) return
        for (; this.round < this.maxRounds; this.round++) {
            this.currentRound = new Round(this.users, this.maxTime, this.nsp)
            await this.currentRound.run()
        }
        this.reset()
    }

    reset() {
        console.log('Lobby.reset')
        const sortedUsers = Array.from(this.users.values()).sort(
            (a, b) => b.points - a.points
        )
        this.nsp?.emit('end', sortedUsers)
        this.users.forEach((u) => (u.points = 0))
        this.round = 0
    }

    toResponse() {
        console.log('Lobby.toResponse')
        return {
            id: this.id,
            name: this.name,
            users: this.users.size,
            maxUsers: this.maxUsers,
            round: this.round,
            maxRounds: this.maxRounds
        }
    }

    calcScore() {
        console.log('Lobby.calcScore')
        if (!this.currentRound) return 0
        const timePercent = (this.currentRound.timer * 100) / this.maxTime
        return Math.min(timePercent * 5, 50)
    }

    onMessage(message: any, user: User, socket: Socket) {
        console.log('Lobby.onMessage from %s', user.name)
        if (
            this.currentRound &&
            message.content.trim() === this.currentRound.word
        ) {
            socket.emit('correct')
            this.currentRound.correct++
            user.points += this.calcScore()

            return this.nsp?.emit('userCorrect', user)
        }

        this.nsp?.emit('message', {
            ...message,
            id: v4(),
            timestamp: new Date().toString()
        })
    }
}
