import React, { useContext } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { ILobbyContext, LobbyContext } from '../contexts/Lobby'

interface Props {}

const LobbyUsers: React.FC<Props> = () => {
    const { users, socket } = useContext<ILobbyContext>(LobbyContext)
    const id = localStorage.getItem('id')
    return (
        <div>
            <Card.Group centered>
                {users.map((user) => (
                    <Card key={user.id} style={{ width: '200px' }}>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src={user.avatarURL}
                            />
                            <Card.Header>{user.name}</Card.Header>
                            {id !== user.id ? (
                                <Button
                                    basic
                                    color='red'
                                    onClick={() =>
                                        socket?.emit('kick', user.id)
                                    }
                                >
                                    Remove
                                </Button>
                            ) : null}
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </div>
    )
}

export { LobbyUsers }
