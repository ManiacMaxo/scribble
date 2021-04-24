/* eslint-disable global-require */
/* eslint-disable no-console */
import { createServer } from 'http'
import next from 'next'
import nextBuild from 'next/dist/build'
import { join, resolve } from 'path'
import { Server, Socket } from 'socket.io'
import express from 'express'

require('dotenv').config({ path: resolve(__dirname, '../.env') })

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)

if (!process.env.NEXT_BUILD) {
    const nextApp = next({ dev })
    const nextHandler = nextApp.getRequestHandler()
    app.get('*', (req, res) => nextHandler(req, res))

    const io = new Server(server, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: !dev
    })

    io.on('connection', (socket: Socket) => {
        socket.onAny((event, data) => {
            console.log(event, data)
        })
    })

    nextApp.prepare().then(() => {
        console.log('NextJS started')

        server.listen(port, async () => {
            console.log(`Server listening on ${port}...`)
        })
    })
} else {
    server.listen(port, async () => {
        console.log('NextJS is now building...')
        await nextBuild(join(__dirname, '../src/'))
        process.exit()
    })
}
