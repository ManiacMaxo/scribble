import { prisma } from '../'

export const getWords = async (numWords = 3, dictionaries = ['default']) => {
    const response = []

    const dictionary = await prisma.dictionary.findMany({
        where: {
            name: {
                in: dictionaries
            }
        },
        include: { words: true }
    })

    const queries = []
    const words = dictionary.flatMap((d) => d.words)

    for (let i = 0; i < numWords; i++) {
        const word = words[Math.round(Math.random() * words.length)]
        response.push(word)

        queries.push(
            prisma.word.upsert({
                where: { string: word.string },
                update: { timesShown: { increment: 1 } },
                create: { string: word.string, timesShown: 1 }
            })
        )
    }

    await prisma.$transaction(queries)

    return response
}
