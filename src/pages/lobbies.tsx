import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, List } from 'semantic-ui-react'
import { Lobby } from '../types'

const Lobbies: React.FC = (): JSX.Element => {
    const [lobbies, setLobbies] = useState<Lobby[]>([])
    const router = useRouter()

    useEffect(() => {
        getLobbies()
    }, [])

    const getLobbies = async (max: number = 10) => {
        try {
            const res = await axios(`/api/lobbies?m=${max}`)
            if (res.status !== 200) return
            setLobbies(res.data)
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
                                <Button
                                    floated='right'
                                    compact
                                    onClick={() =>
                                        router.push(`/play/${lobby.id}`)
                                    }
                                    disabled={
                                        lobby.players === lobby.maxPlayers
                                    }
                                >
                                    {lobby.players === lobby.maxPlayers ? (
                                        <strong>FULL</strong>
                                    ) : (
                                        'Join'
                                    )}
                                </Button>
                            </List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </div>
    )
}

export default Lobbies
