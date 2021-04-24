/* eslint-disable global-require */
/* eslint-disable no-console */
import express from 'express'
import { createServer } from 'http'
import next from 'next'
import nextBuild from 'next/dist/build'
import { join, resolve } from 'path'
import { Server } from 'socket.io'
import apiRouter from './api'
import { ServerLobby } from './ServerLobby'
import socketEvents from './socketEvents'

require('dotenv').config({ path: resolve(__dirname, '../.env') })

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT ?? 3000

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const server = createServer(app)
export const lobbies: Map<string, ServerLobby> = new Map()

if (!process.env.NEXT_BUILD) {
    const nextApp = next({ dev })
    const nextHandler = nextApp.getRequestHandler()

    app.use('/api', apiRouter)
    app.get('*', (req, res) => nextHandler(req, res))

    const io = new Server(server, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: !dev
    })

    socketEvents(io, lobbies)
    ;(async () => {
        await nextApp.prepare()
        console.log('NextJS started')

        server.listen(port, async () => {
            console.log(`Server listening on ${port}...`)
        })
    })()
} else {
    server.listen(port, async () => {
        console.log('NextJS is now building...')
        await nextBuild(join(__dirname, '../src/'))
        process.exit()
    })
}
