import { Namespace, Socket } from 'socket.io'
import { Message } from '../src/types'
import { ServerTurn } from './ServerTurn'
import { RoundUser, User } from './types'
import { getWords, sleep } from './utils'

export class ServerRound {
    private maxTime: number
    private passed: RoundUser[]
    private notPassed: RoundUser[]
    private nsp: Namespace
    private currentTurn?: ServerTurn

    constructor(
        users: Map<string, User>,
        sockets: Map<string, Socket>,
        maxTime: number,
        namespace: Namespace
    ) {
        this.maxTime = maxTime

        this.passed = []
        this.notPassed = Array.from(users.values()).map((u) => ({
            ...u,
            socket: sockets.get(u.id) as Socket
        }))

        this.nsp = namespace
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
    }

    checkCorrect(message: Message, user: User) {
        const content = message.content.trim()
        if (content !== this.currentTurn?.word) return false

        this.currentTurn?.onCorrect(user)
        return true
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

            await sleep(5000)

            const words = getWords()
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

            await new ServerTurn(
                word,
                currentUser,
                this.maxTime,
                this.passed.length + this.notPassed.length,
                this.nsp
            ).run()
        }
    }
}
