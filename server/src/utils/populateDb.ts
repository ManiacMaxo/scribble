import { PrismaClient } from '@prisma/client'
import wordsDb from '../../data/dictionary.json'

export const addWords = async (client: PrismaClient) => {
    const dictionary = await client.dictionary.upsert({
        update: {},
        create: {
            name: 'default'
        },
        where: {
            name: 'default'
        }
    })

    await client.word.createMany({
        data: wordsDb.map((word) => ({
            string: word,
            dictionaryId: dictionary.id
        })),
        skipDuplicates: true
    })
}
