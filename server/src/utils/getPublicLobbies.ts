import { ServerLobby } from '../ServerLobby'

export const getPublicLobbies = (lobbies: Map<string, ServerLobby>) => {
    return [...lobbies.values()].reduce((acc, lobby) => {
        if (lobby.isPrivate) return acc
        acc.push(lobby)
        return acc
    }, [])
}
