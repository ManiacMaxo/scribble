import { PrismaClient } from '@prisma/client'
import { PrismaClientOptions } from '@prisma/client/runtime'
import fp from 'fastify-plugin'

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient
    }
}

const prismaPlugin = fp<Omit<PrismaClientOptions, '__internal'>>(
    async (fastify, options) => {
        const prisma = new PrismaClient(options)
        await prisma.$connect()

        fastify.decorate('prisma', prisma)
        fastify.addHook('onClose', async (server) => {
            await server.prisma.$disconnect()
        })
    }
)

export default prismaPlugin
