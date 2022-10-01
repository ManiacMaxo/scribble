import fp from 'fastify-plugin'
import { Server, ServerOptions } from 'socket.io'

declare module 'fastify' {
    interface FastifyInstance {
        io: Server
    }
}

const socketioPlugin = fp<Partial<ServerOptions>>(async (fastify, options) => {
    const io = new Server(fastify.server, options)
    fastify.decorate('io', io)
    fastify.addHook('onClose', (server) => {
        server.io.close()
    })
})

export default socketioPlugin
