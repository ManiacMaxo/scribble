import { PrismaClient } from '@prisma/client'
import { Namespace, Socket } from 'socket.io'
import { GameTurn } from '.'
import { RoundUser, User } from '../types'
import { getWords } from '../utils'

export class GameRound {
    private maxTime: number
    private passed: RoundUser[]
    private notPassed: RoundUser[]
    private nsp: Namespace
    public currentTurn?: GameTurn
    private client: PrismaClient

    constructor(
        users: Map<string, User>,
        sockets: Map<string, Socket>,
        maxTime: number,
        namespace: Namespace,
        client: PrismaClient
    ) {
        this.maxTime = maxTime

        this.passed = []
        this.notPassed = [...users.values()].map((u) => ({
            ...u,
            socket: sockets.get(u.id) as Socket
        }))

        this.nsp = namespace
        this.client = client
    }

    addUser(user: User, socket: Socket) {
        console.log('ServerRound.addUser: %s', user.name)
        this.notPassed.push({ ...user, socket })
    }

    removeUser(user: User) {
        console.log('ServerRound.removeUser: %s', user.name)
        const isNotUser = (u: User) => u.id !== user.id
        this.notPassed = this.notPassed.filter(isNotUser)
        this.passed = this.passed.filter(isNotUser)

        if (this.currentTurn?.currentUser.id === user.id)
            this.currentTurn.emitter.emit('turnEnd')
    }

    users() {
        return this.passed.length + this.notPassed.length
    }

    async run() {
        console.log('ServerRound.run')

        while (this.notPassed.length > 0) {
            const currentUser = this.notPassed.shift()

            if (!currentUser) break
            this.passed.push(currentUser)
            this.nsp.emit('timer', this.maxTime)

            const words = await getWords(this.client)
            let word: string = words[Math.round(Math.random() * 2)]
            currentUser.socket.emit('drawing', words)

            // 20 seconds to think
            await new Promise((resolve) => {
                let timeout: NodeJS.Timeout

                currentUser.socket.on(
                    'drawingResponse',
                    async (data: string) => {
                        if (words.includes(data)) word = data
                        resolve(true)
                        clearTimeout(timeout)
                    }
                )

                timeout = setTimeout(resolve, 20000)
            })

            this.currentTurn = new GameTurn(
                word,
                currentUser,
                this.maxTime,
                this.passed.length + this.notPassed.length,
                this.nsp,
                this.client
            )
            await this.currentTurn.run()
        }
    }
}
