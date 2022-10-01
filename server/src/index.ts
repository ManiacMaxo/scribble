import cors from '@fastify/cors'
import Fastify from 'fastify'
import { apiPlugin } from './api'
import { lobbies } from './lib'
import prismaPlugin from './plugins/prisma'
import socketioPlugin from './plugins/socketio'
import { socketEvents } from './utils'

require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'
const port = (process.env.PORT ?? 4000) as number

const corsOptions = {
    origin: [process.env.APP_HOSTNAME as string, /(localhost)./]
}

const app = Fastify({
    logger: true
})

app.register(cors, {
    origin: corsOptions.origin
})

app.register(apiPlugin, { prefix: '/api' })
app.register(prismaPlugin)
app.register(socketioPlugin, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: !dev,
    cors: corsOptions
})

const start = async () => {
    try {
        await app.listen({ port, host: '0.0.0.0' })
        socketEvents(app.io, lobbies)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
