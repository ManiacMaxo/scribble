import EventEmitter from 'events'
import { Namespace } from 'socket.io'
import { prisma } from '..'
import { RoundUser, User } from '../types'

export class GameTurn {
    word: string
    hint: string
    currentUser: RoundUser
    timer: number
    maxTime: number
    numUsers: number
    correct: number
    nsp: Namespace
    emitter: EventEmitter

    constructor(
        word: string,
        currentUser: RoundUser,
        maxTime: number,
        numUsers: number,
        namespace: Namespace
    ) {
        this.word = word
        this.hint = word.replace(/\w/g, '_')
        this.currentUser = currentUser
        this.timer = maxTime
        this.maxTime = maxTime
        this.numUsers = numUsers
        this.correct = 0
        this.nsp = namespace
        this.emitter = new EventEmitter()
    }

    run() {
        let interval: NodeJS.Timeout

        prisma.word.update({
            where: { string: this.word },
            data: { timesShown: { increment: 1 } }
        })

        return new Promise(async (resolve) => {
            this.emitter.on('turnEnd', async () => {
                clearInterval(interval)

                this.currentUser.points += this.correct * 75
                const { id, name, points, avatarURL }: User = this.currentUser
                this.nsp.emit('userCorrect', { id, name, points, avatarURL })
                this.nsp.emit('turnEnd')
                this.nsp.emit('serverMessage', `The word was ${this.word}`)

                await prisma.turn.create({
                    data: { correct: this.correct, word: this.word }
                })

                resolve(true)

                const repoWord = await prisma.word.findFirst({
                    where: { string: this.word }
                })

                if (repoWord) {
                    repoWord.averageRoundDuration +=
                        (this.maxTime -
                            this.timer -
                            repoWord.averageRoundDuration) /
                        repoWord.timesChosen

                    prisma.word.update({
                        where: { string: this.word },
                        data: {
                            averageRoundDuration: repoWord.averageRoundDuration
                        }
                    })
                }
            })
            this.currentUser.socket.broadcast.emit('hint', this.hint)
            this.currentUser.socket.emit('turnStart', this.word)

            interval = setInterval(() => {
                this.nsp.emit('timer', --this.timer)

                if (this.timer <= 0 || this.correct === this.numUsers - 1) {
                    // timer has ended or everyone has guessed correctly
                    this.emitter.emit('turnEnd')
                }
            }, 1000)
        })
    }

    onCorrect(user: User) {
        const timePercent = (this.timer * 100) / this.maxTime
        const points = Math.round(Math.max(timePercent * 3, 50))

        this.correct++
        user.points += points
        this.nsp.emit('userCorrect', user)
    }
}
