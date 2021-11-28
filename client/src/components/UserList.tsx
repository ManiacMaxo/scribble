import { LobbyContext } from '@/contexts'
import React, { useContext } from 'react'
import { Image, List } from 'semantic-ui-react'

const UserList: React.FC = () => {
    const { users } = useContext(LobbyContext)

    return (
        <List relaxed divided>
            {users.map((user) => (
                <List.Item key={user.id}>
                    <Image
                        avatar
                        src={user.avatarURL}
                        style={{ borderRadius: 0 }}
                    />
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
