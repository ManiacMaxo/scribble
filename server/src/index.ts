import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import apiRouter from './api'
import { GameLobby } from './Game'
import { socketEvents } from './utils'

require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT ?? 4000

const corsOptions = { origin: [process.env.APP_HOSTNAME, /(localhost)./] }

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(express.json())

const server = createServer(app)
export const lobbies = new Map<string, GameLobby>()
export const prisma = new PrismaClient()

app.use('/api', apiRouter)

const io = new Server(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: !dev,
    cors: corsOptions
})
socketEvents(io, lobbies)

server.listen(port, async () => {
    prisma.$connect()
    console.log(`Server listening on port ${port}...`)
})
