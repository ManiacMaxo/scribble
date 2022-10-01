import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import { FastifyInstance } from 'fastify'
import words from '../data/randomWords.json'
import { GameLobby, lobbies } from './lib'
import { getPublicLobbies } from './utils'

interface ApiOptions {}

export const apiPlugin = (
    fastify: FastifyInstance,
    _opts: ApiOptions,
    done: () => void
): void => {
    const server = fastify.withTypeProvider<JsonSchemaToTsProvider>()

    server.get('/find', (_req, res) => {
        const publicLobbies = getPublicLobbies(lobbies)

        if (publicLobbies.length === 0) {
            const lobby = new GameLobby()
            lobbies.set(lobby.id, lobby)
            return res.send(lobby.id)
        }

        const random = Math.floor(Math.random() * publicLobbies.length)
        return res.send(publicLobbies[random].id)
    })

    server.get(
        '/lobbies',
        {
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        limit: { type: 'number' },
                        offset: { type: 'number' }
                    }
                }
            } as const
        },
        (req, res) => {
            const items = req.query.limit
                ? parseInt(req.query.limit as string)
                : 10
            const publicLobbies = getPublicLobbies(lobbies)
                .slice(0, items)
                .map((l: GameLobby) => l.toResponse())
            return res.send(publicLobbies)
        }
    )

    server.post(
        '/create',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        time: { type: 'number' },
                        rounds: { type: 'number' },
                        players: { type: 'number' },
                        isPrivate: { type: 'boolean' }
                    },
                    required: ['time', 'rounds', 'players']
                }
            }
        },
        (req, res) => {
            const { time, rounds, players, isPrivate } = req.body

            const lobby = new GameLobby(players, rounds, time, isPrivate, true)
            lobbies.set(lobby.id, lobby)

            return res.send(lobby.id)
        }
    )

    server.get('/word', (_req, res) => {
        const random = Math.round(Math.random() * words.length)
        return res.send(words[random])
    })

    done()
}
