import { prisma } from '../'
import allWords from '../data/gameWords.json'

export const getWords = async (numWords: number = 3) => {
    const response = []
    const len = allWords.length

    const queries = []

    for (let i = 0; i < numWords; i++) {
        const word = allWords[Math.round(Math.random() * len)]
        response.push(word)

        queries.push(
            prisma.word.upsert({
                where: { string: word },
                update: { timesShown: { increment: 1 } },
                create: { string: word, timesShown: 1 }
            })
        )
    }

    await prisma.$transaction(queries)

    return response
}
