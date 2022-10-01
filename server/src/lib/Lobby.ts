import { PrismaClient } from '@prisma/client'
import { Namespace, Socket } from 'socket.io'
import { v4 } from 'uuid'
import { GameRound } from '.'
import { Message, User } from '../types'

export class GameLobby {
    public readonly id: string
    private name: string
    public users: Map<string, User>
    public readonly maxUsers: number
    private sockets: Map<string, Socket>
    private round: number
    public currentRound?: GameRound
    private maxRounds: number
    private maxTime: number
    private nsp?: Namespace
    public isRunning: boolean
    public readonly isCustom: boolean
    public readonly isPrivate: boolean
    private client: PrismaClient

    constructor(
        maxUsers = 9,
        maxRounds = 6,
        maxTime = 120,
        isPrivate = false,
        isCustom = false,
        client: PrismaClient
    ) {
        this.id = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substring(0, 5)
        this.name = `Lobby ${this.id}`

        this.users = new Map()
        this.maxUsers = maxUsers
        this.sockets = new Map()

        this.round = 0
        this.maxRounds = maxRounds
        this.maxTime = maxTime

        this.isPrivate = isPrivate
        this.isCustom = isCustom
        this.isRunning = false
        this.client = client
    }

    init(nsp: Namespace) {
        if (this.nsp) return
        this.nsp = nsp
    }

    addUser(user: User, socket: Socket) {
        if (!user || this.users.has(user.id)) return

        socket.emit('users', [...this.users.values()])
        this.nsp?.emit('userJoin', user)

        this.currentRound?.addUser(user, socket)
        this.sockets.set(user.id, socket)
        this.users.set(user.id, user)

        if (!this.isCustom) this.run()
    }

    removeUser(user: User) {
        if (!user || !this.users.has(user.id)) return
        this.users.delete(user.id)
        this.sockets.delete(user.id)
        this.nsp?.emit('serverMessage', `${user.name} left`)
        this.currentRound?.removeUser(user)
        this.nsp?.emit('userLeave', user)
    }

    kick(userId: string) {
        const socket = this.sockets.get(userId)
        socket?.emit('kick')
    }

    toResponse() {
        return {
            id: this.id,
            name: this.name,
            users: this.users.size,
            maxUsers: this.maxUsers,
            round: this.round,
            maxRounds: this.maxRounds
        }
    }

    onMessage(message: Message, user: User) {
        console.log(this.currentRound?.currentTurn?.word)
        if (
            this.currentRound &&
            this.currentRound.currentTurn &&
            message.content.trim().toLowerCase() ===
                this.currentRound.currentTurn.word.toLowerCase()
        ) {
            console.log(`${user.name} is correct`)
            this.currentRound.currentTurn.onCorrect(user)
            this.sockets.get(user.id)?.emit('correct')
            this.nsp?.emit('serverMessage', `${user.name} guessed the word`)
            return
        }

        this.nsp?.emit('message', {
            ...message,
            id: v4(),
            timestamp: new Date().toString()
        })
    }

    async run() {
        if (!this.nsp || this.users.size < 3 || this.isRunning) return
        this.isRunning = true
        this.nsp.emit('start')

        const game = await this.client.game.create({
            data: { lobby: this.id },
            include: { rounds: true }
        })

        for (; this.round < this.maxRounds; this.round++) {
            this.currentRound = new GameRound(
                this.users,
                this.sockets,
                this.maxTime,
                this.nsp,
                this.client
            )

            await this.client.round.create({
                data: { gameId: game.id }
            })

            await this.currentRound.run()
        }
        this.reset()
    }

    reset() {
        const sortedUsers = [...this.users.values()].sort(
            (a, b) => b.points - a.points
        )
        this.nsp?.emit('end', sortedUsers)
        this.users.forEach((u) => (u.points = 0))
        this.round = 0
        this.isRunning = false
        this.nsp?.emit('users', this.users)
        if (this.users.size >= 3) this.run()
    }
}

export const lobbies = new Map<string, GameLobby>()
