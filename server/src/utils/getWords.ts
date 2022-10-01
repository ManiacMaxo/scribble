import { Prisma, PrismaClient, Word } from '@prisma/client'

export const getWords = async (
    client: PrismaClient,
    numWords = 3,
    dictionaries = ['default']
) => {
    const dictionary = await client.dictionary.findMany({
        where: {
            name: { in: dictionaries }
        },
        select: {
            id: true
        }
    })

    const dictionaryIds = Prisma.join(dictionary.map((d) => d.id))
    const words = await client.$queryRaw<Word[]>`
        SELECT string FROM words
        WHERE "dictionaryId" IN (${dictionaryIds})
        ORDER BY RANDOM()
        LIMIT ${numWords}
    `

    const queries: Array<any> = []
    const response: Array<string> = []

    words.forEach((word) => {
        response.push(word.string)

        queries.push(
            client.word.upsert({
                where: { string: word.string },
                update: { timesShown: { increment: 1 } },
                create: { string: word.string, timesShown: 1 }
            })
        )
    })

    await client.$transaction(queries)

    return response
}
