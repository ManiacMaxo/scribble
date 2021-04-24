import React, { useContext } from 'react'
import { Image, List } from 'semantic-ui-react'
import { ILobbyContext, LobbyContext } from '../contexts/Lobby'

interface Props {}

const UserList: React.FC<Props> = () => {
    const { users } = useContext<ILobbyContext>(LobbyContext)

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
