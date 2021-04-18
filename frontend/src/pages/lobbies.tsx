import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Button, List } from 'semantic-ui-react'
import { Lobby } from '../types'

const Lobbies: React.FC = (): JSX.Element => {
    const [lobbies, setLobbies] = useState<Lobby[]>([])
    const history = useHistory()

    useEffect(() => {
        getLobbies()
    }, [])

    const getLobbies = async (max: number = 10) => {
        try {
            const res = await fetch(
                process.env.REACT_APP_API_URL + `/lobbies?m=${max}`
            )
            if (res.ok) {
                setLobbies(await res.json())
            }
        } catch (e) {}
    }

    return (
        <div className='default-card'>
            <List relaxed divided size='large'>
                {lobbies.map((lobby) => (
                    <List.Item key={lobby.id}>
                        <List.Icon
                            name='point'
                            size='large'
                            verticalAlign='middle'
                        />
                        <List.Content>
                            <List.Header>{lobby.name}</List.Header>
                            <List.Description>
                                players: {lobby.players}/{lobby.maxPlayers}{' '}
                                round: {lobby.round}/{lobby.maxRounds}
                                {lobby.players === lobby.maxPlayers ? (
                                    <strong>FULL</strong>
                                ) : (
                                    <Button
                                        floated='right'
                                        compact
                                        onClick={() =>
                                            history.push(`/play/${lobby.id}`)
                                        }
                                    >
                                        Join
                                    </Button>
                                )}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </div>
    )
}

export default Lobbies
