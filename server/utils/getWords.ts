import { prisma } from '../'
import allWords from '../data/gameWords.json'

export const getWords = (numWords: number = 3) => {
    const response = []
    const len = allWords.length

    for (let i = 0; i < numWords; i++) {
        const word = allWords[Math.round(Math.random() * len)]
        response.push(word)
        prisma.word.upsert({
            where: { string: word },
            update: { timesShown: { increment: 1 } },
            create: { string: word, timesShown: 1 }
        })
    }

    return response
}
