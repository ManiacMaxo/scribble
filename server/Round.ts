import { Namespace } from 'socket.io'
import { User } from './types'

export class Round {
    word: string | null
    hint: string | null
    timer: number
    maxTime: number
    drawing?: User
    correct: number
    passed: User[]
    notPassed: User[]
    nsp: Namespace

    constructor(
        users: Map<string, User>,
        maxTime: number,
        namespace: Namespace
    ) {
        this.maxTime = maxTime
        this.timer = this.maxTime

        this.correct = 0
        this.passed = []
        this.notPassed = Array.from(users.values())

        this.word = null
        this.hint = null

        this.nsp = namespace
    }

    addUser(user: User) {
        console.log('Round.addUser: %s', user.name)
        this.notPassed.push(user)
    }

    removeUser(user: User) {
        console.log('Round.removeUser: %s', user.name)
        const isNotUser = (u: User) => u.id !== user.id
        this.notPassed = this.notPassed.filter(isNotUser)
        this.passed = this.passed.filter(isNotUser)
    }

    getWords() {
        console.log('Round.getWords')
        return ['one', 'two', 'three']
    }

    async run() {
        console.log('Round.run')
        this.notPassed.reverse()
        while (this.notPassed.length > 0) {
            this.drawing = this.notPassed.pop()
            if (!this.drawing) break
            this.passed.push(this.drawing)

            this.drawing.socket.emit('words', this.getWords())
            this.drawing.socket.on('words', await this.turn)
        }
    }

    async turn(word: string) {
        console.log('Round.turn')
        this.word = word
        this.hint = this.word.replace(/\W/g, '_')
        this.nsp.emit('turnStart')
        this.nsp.emit('hint', this.hint)

        while (this.timer > 0) {
            // sleep 1 second
            await new Promise((resolve) => setTimeout(resolve, 1000))

            this.nsp.emit('timer', --this.timer)
        }

        this.nsp.emit('turnEnd')
        if (this.drawing) this.drawing.points += this.correct * 30

        this.word = null
        this.hint = null
    }
}
