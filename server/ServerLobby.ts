import { Namespace, Socket } from 'socket.io'
import { v4 } from 'uuid'
import { prisma } from '.'
import { ServerRound } from './ServerRound'
import { Message, User } from './types'

export class ServerLobby {
    id: string
    name: string
    users: Map<string, User>
    maxUsers: number
    sockets: Map<string, Socket>
    round: number
    currentRound?: ServerRound
    maxRounds: number
    maxTime: number
    isPrivate: boolean
    nsp?: Namespace
    isRunning: boolean
    isCustom: boolean

    constructor(
        maxUsers: number = 9,
        maxRounds: number = 6,
        maxTime: number = 120,
        isPrivate: boolean = false,
        isCustom: boolean = false
    ) {
        this.id = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 5)
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

        const game = await prisma.game.create({
            data: { lobby: this.id },
            include: { rounds: true }
        })

        for (; this.round < this.maxRounds; this.round++) {
            this.currentRound = new ServerRound(
                this.users,
                this.sockets,
                this.maxTime,
                this.nsp
            )
            await prisma.round.create({
                data: {
                    gameId: game.id
                }
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
