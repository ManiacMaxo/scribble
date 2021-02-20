import React, { useState } from 'react'
import { io } from 'socket.io-client'

interface Props {}

const Lobby: React.FunctionComponent<Props> = (props) => {
    const [users, setUsers] = useState<Array<string>>([])

    const socket = io(process.env.REACT_APP_ENDPOINT || '')

    socket.on('message', (message: any) => {
        console.log(message)
    })
    socket.on('connection userJoin userLeave', (users: Array<string>) => {
        setUsers(users)
    })

    return (
        <div>
            {users.map((user) => (
                <p>{user}</p>
            ))}
        </div>
    )
}

export default Lobby
