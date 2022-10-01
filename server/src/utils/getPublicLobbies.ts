import { GameLobby } from '../lib'

export const getPublicLobbies = (lobbies: Map<string, GameLobby>) => {
    return [...lobbies.values()].reduce<Array<GameLobby>>((acc, lobby) => {
        if (lobby.isPrivate) return acc
        acc.push(lobby)
        return acc
    }, [])
}
