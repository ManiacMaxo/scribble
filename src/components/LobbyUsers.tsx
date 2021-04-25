import React, { useContext } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { ILobbyContext, LobbyContext } from '../contexts/Lobby'

interface Props {
    isOwner?: boolean
}

const LobbyUsers: React.FC<Props> = (props) => {
    const { users } = useContext<ILobbyContext>(LobbyContext)
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
                        </Card.Content>
                        {props.isOwner && (
                            <Card.Content extra>
                                <Button
                                    basic
                                    color='red'
                                    onClick={() => alert('Not implemented yet')}
                                >
                                    Remove
                                </Button>
                            </Card.Content>
                        )}
                    </Card>
                ))}
            </Card.Group>
        </div>
    )
}

export { LobbyUsers }
