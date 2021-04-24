import { ServerLobby } from './ServerLobby'

export const getPublicLobbies = (lobbies: Map<string, ServerLobby>) => {
    const publicLobbies: ServerLobby[] = []

    lobbies.forEach((lobby) => {
        if (lobby.isPrivate) return
        publicLobbies.push(lobby)
    })

    return publicLobbies
}
