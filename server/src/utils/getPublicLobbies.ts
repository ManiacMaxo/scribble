import { GameLobby } from '../Game'

export const getPublicLobbies = (lobbies: Map<string, GameLobby>) => {
    return [...lobbies.values()].reduce((acc, lobby) => {
        if (lobby.isPrivate) return acc
        acc.push(lobby)
        return acc
    }, [])
}
