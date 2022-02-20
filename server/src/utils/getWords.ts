import { Prisma, Word } from '@prisma/client'
import { prisma } from '../'

export const getWords = async (numWords = 3, dictionaries = ['default']) => {
    const dictionary = await prisma.dictionary.findMany({
        where: {
            name: { in: dictionaries }
        },
        select: {
            id: true
        }
    })

    const dictionaryIds = Prisma.join(dictionary.map((d) => d.id))
    const words = await prisma.$queryRaw<Word[]>`
        SELECT string FROM words
        WHERE "dictionaryId" IN (${dictionaryIds})
        ORDER BY RANDOM()
        LIMIT ${numWords}
    `

    const queries = []
    const response = []

    words.forEach((word) => {
        response.push(word.string)

        queries.push(
            prisma.word.upsert({
                where: { string: word.string },
                update: { timesShown: { increment: 1 } },
                create: { string: word.string, timesShown: 1 }
            })
        )
    })

    await prisma.$transaction(queries)

    return response
}
