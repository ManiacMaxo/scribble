import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

interface Props {
    users: any[]
    isOwner?: boolean
}

const LobbyUsers: React.FC<Props> = (props) => {
    return (
        <div>
            <Card.Group>
                {props.users.map((user) => (
                    <Card key={user.id}>
                        <Image
                            floated='right'
                            size='small'
                            src={user.avatarURL}
                        />
                        <Card.Header>{user.name}</Card.Header>
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
