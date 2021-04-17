import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

interface Props {
    players: any[]
    isOwner?: boolean
}

const LobbyPlayers: React.FC<Props> = (props) => {
    return (
        <div>
            {/* {props.players.map((player) => (
                <Label image>
                    <img src={player.avatarURL} />
                    {player.name}
                    {props.isOwner && <Icon name='delete' />}
                </Label>
            ))} */}
            <Card.Group>
                {props.players.map((player) => (
                    <Card>
                        <Image
                            floated='right'
                            size='small'
                            src={player.avatarURL}
                        />
                        <Card.Header>{player.name}</Card.Header>
                        <Card.Content extra>
                            <Button basic color='red'>
                                Remove
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </div>
    )
}

export { LobbyPlayers }
