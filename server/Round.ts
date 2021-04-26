import EventEmitter from 'events'
import { Namespace, Socket } from 'socket.io'
import { RoundUser, User } from './types'
import allWords from './words.json'

export class Round {
    word: string | null
    hint: string | null
    timer: number
    maxTime: number
    correct: number
    drawing?: RoundUser
    passed: RoundUser[]
    notPassed: RoundUser[]
    nsp: Namespace

    emitter: EventEmitter

    constructor(
        users: Map<string, User>,
        sockets: Map<string, Socket>,
        maxTime: number,
        namespace: Namespace
    ) {
        this.maxTime = maxTime
        this.timer = this.maxTime

        this.correct = 0
        this.passed = []
        this.notPassed = Array.from(users.values()).map((u) => ({
            ...u,
            socket: sockets.get(u.id) as Socket
        }))

        this.word = null
        this.hint = null

        this.nsp = namespace

        this.emitter = new EventEmitter()
    }

    addUser(user: User, socket: Socket) {
        console.log('Round.addUser: %s', user.name)
        this.notPassed.push({ ...user, socket })
    }

    removeUser(user: User) {
        console.log('Round.removeUser: %s', user.name)
        if (user.id === this.drawing?.id) this.emitter.emit('turnEnd')
        const isNotUser = (u: User) => u.id !== user.id
        this.notPassed = this.notPassed.filter(isNotUser)
        this.passed = this.passed.filter(isNotUser)
    }

    getWords(numWords: number = 3) {
        const response = []
        const len = allWords.length
        for (let i = 0; i < numWords; i++) {
            response.push(allWords[Math.round(Math.random() * len)])
        }
        return response
    }

    async run() {
        console.log('Round.run')

        while (42) {
            await this.sleep(3000)

            this.drawing = this.notPassed.shift()
            if (!this.drawing) break
            this.nsp.emit('timer', this.maxTime)

            this.passed.push(this.drawing)
            const words = this.getWords()

            console.log('emitting to %s words', this.drawing.name, words)

            this.drawing.socket.emit('drawing', words)

            // 20 seconds to think
            await new Promise((resolve) => {
                let timeout: NodeJS.Timeout

                this.drawing?.socket.on('drawingResponse', (word: string) => {
                    if (words.includes(word)) this.word = word
                    else this.word = words[Math.round(Math.random() * 2)]
                    resolve(true)
                    clearTimeout(timeout)
                    console.log('cleared timeout', timeout)
                })

                timeout = setTimeout(() => {
                    this.word = words[Math.round(Math.random() * 2)]
                    resolve(true)
                }, 20000)
            })

            await this.turn()
            this.reset()
        }
    }

    sleep(ms: number) {
        new Promise((resolve) => setTimeout(resolve, ms))
    }

    turn() {
        return new Promise(async (resolve) => {
            console.log('Round.turn', this.drawing?.name)
            const word = this.word ?? ''
            this.hint = word.replace(/\w/g, '_')
            this.timer = this.maxTime
            let interval: NodeJS.Timeout

            this.drawing?.socket.emit('turnStart', this.word)

            this.emitter.on('turnEnd', () => {
                clearInterval(interval)
                if (this.drawing) this.drawing.points += this.correct * 75
                this.nsp.emit('turnEnd')
                resolve(true)
            })

            this.drawing?.socket.broadcast.emit('hint', this.hint)
            interval = setInterval(() => {
                this.nsp.emit('timer', --this.timer)

                if (
                    this.timer <= 0 ||
                    this.correct ===
                        this.passed.length + this.notPassed.length - 1
                ) {
                    this.emitter.emit('turnEnd')
                }
            }, 1000)
        })
    }

    reset() {
        this.nsp.emit('serverMessage', `The word was ${this.word}`)
        this.word = null
        this.hint = null
        this.correct = 0
    }
}
