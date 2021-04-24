import { Server, Socket } from 'socket.io'
import { v4 } from 'uuid'
import { User } from './types'
import { ServerLobby } from './ServerLobby'

const socketEvents = (io: Server, lobbies: Map<string, ServerLobby>) => {
    const namespaces = io.of(/^\/\w+$/)

    namespaces.on('connection', (socket: Socket) => {
        let user: User
        const namespace = socket.nsp
        const namespaceName = namespace.name.slice(1)

        console.log('connection at', namespaceName)

        const lobby = lobbies.get(namespaceName)
        if (!lobby) return socket.emit('error')
        lobby.init(namespace)

        socket.onAny((event, data) => console.log(event, data))

        socket.once('user', ({ name, avatarURL }) => {
            user = { name, avatarURL, id: v4(), points: 0 }
            lobby.addUser(user, socket)
        })

        socket.once('disconnect', () => lobby.removeUser(user))

        socket.on('message', (message) =>
            lobby.onMessage(message, user, socket)
        )
        socket.on('draw', (data) => namespace.emit('draw', data))

        socket.on('start', () => {
            lobby.run()
        })
    })
}

export default socketEvents
