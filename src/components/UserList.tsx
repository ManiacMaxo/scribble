import React, { useContext } from 'react'
import { Image, List } from 'semantic-ui-react'
import { ILobbyContext, LobbyContext } from '../contexts/Lobby'
import { User } from '../types'

interface Props {}

const UserList: React.FC<Props> = () => {
    const { users, socket, addUser, removeUser } = useContext<ILobbyContext>(
        LobbyContext
    )

    socket?.on('userJoin', (data: User) => {
        console.log('user joined ' + data)
        addUser(data)
    })

    socket?.on('userLeave', (data: User) => {
        console.log('user left ' + data)
        removeUser(data)
    })

    return (
        <List relaxed divided>
            {users.map((user) => (
                <List.Item key={user.id}>
                    <Image avatar src={user.avatarURL} />
                    <List.Content>
                        <List.Header>{user.name}</List.Header>
                        <List.Description>{user.points} pts</List.Description>
                    </List.Content>
                </List.Item>
            ))}
        </List>
    )
}

export { UserList }
