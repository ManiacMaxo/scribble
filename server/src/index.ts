import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import apiRouter from './api'
import { ServerLobby } from './ServerLobby'
import { socketEvents } from './socketEvents'

require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT ?? 3000

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)
app.use(express.json())

const server = createServer(app)
export const lobbies: Map<string, ServerLobby> = new Map()
export const prisma = new PrismaClient()

app.use('/api', apiRouter)

const io = new Server(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: !dev
})
socketEvents(io, lobbies)

server.listen(port, () => {
    prisma.$connect()
    console.log(`Server listening on ${port}...`)
})
