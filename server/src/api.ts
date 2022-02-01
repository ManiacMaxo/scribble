import { Router } from 'express'
import { lobbies } from '.'
import words from '../data/randomWords.json'
import { GameLobby } from './Game'
import { getPublicLobbies } from './utils'

const router = Router()

router.get('/find', (_req, res) => {
    const publicLobbies = getPublicLobbies(lobbies)

    if (publicLobbies.length === 0) {
        const lobby = new GameLobby()
        lobbies.set(lobby.id, lobby)
        return res.send(lobby.id)
    }

    const random = Math.floor(Math.random() * publicLobbies.length)
    return res.send(publicLobbies[random].id)
})

router.get('/lobbies', (req, res) => {
    const items = req.query.limit ? parseInt(req.query.limit as string) : 10
    const publicLobbies = getPublicLobbies(lobbies)
        .slice(0, items)
        .map((l: GameLobby) => l.toResponse())
    return res.send(publicLobbies)
})

router.post('/create', (req, res) => {
    const { time, rounds, players, isPrivate } = req.body

    const lobby = new GameLobby(players, rounds, time, isPrivate, true)
    lobbies.set(lobby.id, lobby)

    return res.send(lobby.id)
})

router.get('/word', (_req, res) => {
    const random = Math.round(Math.random() * words.length)
    return res.send(words[random])
})

export default router
