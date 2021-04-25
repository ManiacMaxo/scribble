import { Router } from 'express'
import { lobbies } from '.'
import { ServerLobby } from './ServerLobby'
import { getPublicLobbies } from './utils'

const router = Router()

router.get('/find', (_req, res) => {
    if (lobbies.size === 0) {
        const lobby = new ServerLobby()
        lobbies.set(lobby.id, lobby)
        return res.send(lobby.id)
    }

    const publicLobbies = getPublicLobbies(lobbies)
    const random = Math.floor(Math.random() * publicLobbies.length)
    return res.send(publicLobbies[random].id)
})

router.get('/lobbies', (_req, res) => {
    const publicLobbies = getPublicLobbies(lobbies)
        .slice(0, 10)
        .map((l: ServerLobby) => l.toResponse())
    return res.send(publicLobbies)
})

router.post('/create', (req, res) => {
    const { time, rounds, players, isPrivate } = req.body

    const lobby = new ServerLobby(players, rounds, time, isPrivate, true)
    lobbies.set(lobby.id, lobby)

    return res.send(lobby.id)
})

export default router
