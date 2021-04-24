import { Server, Socket } from 'socket.io'
import { v4 } from 'uuid'
import { Message, ServerLobby, User } from '../src/types'

const socketEvents = (io: Server, lobbies: ServerLobby[]) => {
    const namespaces = io.of(/^\/\w+$/)

    namespaces.on('connection', (socket: Socket) => {
        let user: User
        const namespace = socket.nsp
        const namespaceName = namespace.name.slice(1)

        console.log('connection at', namespaceName)

        const lobby = lobbies.find((l) => l.id === namespaceName)
        if (!lobby) return socket.emit('error')

        socket.onAny((event, data) => {
            console.log(event, data)
        })

        socket.once('user', ({ name, avatarURL }) => {
            user = { name, avatarURL, id: v4(), points: 0 }

            socket.emit('users', lobby.players)
            namespace.emit('userJoin', user)
        })

        socket.once('disconnect', () => {
            namespace.emit('userLeave', user)
        })

        socket.on('message', (data) => {
            const message: Message = {
                id: v4(),
                username: data.name,
                content: data.content,
                timestamp: new Date().toString()
            }

            namespace.emit('message', message)
        })
    })
}

export default socketEvents
