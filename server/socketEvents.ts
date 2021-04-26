import { Server, Socket } from 'socket.io'
import { v4 } from 'uuid'
import { ServerLobby } from './ServerLobby'
import { User } from './types'

const socketEvents = (io: Server, lobbies: Map<string, ServerLobby>) => {
    const namespaces = io.of(/^\/\w+$/)

    namespaces.on('connection', (socket: Socket) => {
        let user: User
        const namespace = socket.nsp
        const namespaceName = namespace.name.slice(1)

        console.log('connection at', namespaceName)

        const lobby = lobbies.get(namespaceName)
        if (!lobby) return socket.emit('error', 'Lobby does not exist')
        if (lobby.maxUsers === lobby.currentRound?.users())
            return socket.emit('error', 'Lobby is full')
        lobby.init(namespace)

        socket.onAny((event, data) => {
            if (event === 'draw') return console.log('draw')
            console.log(event, data)
        })

        socket.once('user', ({ name, avatarURL }) => {
            user = { name, avatarURL, id: v4(), points: 0 }
            socket.emit('id', user.id)
            lobby.addUser(user, socket)
        })

        socket.once('disconnect', () => {
            lobby.removeUser(user)
            if (lobby.users.size === 0) lobbies.delete(lobby.id)
        })

        socket.on('message', (message) => lobby.onMessage(message, user))

        socket.on('draw', (data) => socket.nsp.emit('draw', data))

        socket.on('start', async () => await lobby.run())

        socket.on('kick', (userId: string) => lobby.kick(userId))
    })
}

export default socketEvents
