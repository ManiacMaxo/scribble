import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, List } from 'semantic-ui-react'

interface Lobby {
    id: string
    name: string
    players: number
    round: number
}

const Lobbies = (): JSX.Element => {
    const [lobbies, setLobbies] = useState<Lobby[]>([])
    const router = useRouter()

    useEffect(() => {
        getLobbies()
    }, [])

    const maxPlayers = 12

    const getLobbies = async (max: number = 10) => {
        try {
            const res = await fetch(
                process.env.NEXT_PUBLIC_API_URL + `/lobbies?m=${max}`
            )
            if (res.ok) {
                setLobbies(await res.json())
            }
        } catch (e) {
            setLobbies([
                { id: '123', name: 'test lobby', players: 10, round: 2 },
                { id: 'adsqwe', name: 'test lobby 2', players: 7, round: 2 }
            ])
        }
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
                                players: {lobby.players}/{maxPlayers}
                                {lobby.players === maxPlayers ? (
                                    <strong>FULL</strong>
                                ) : (
                                    <Button
                                        floated='right'
                                        compact
                                        onClick={() =>
                                            router.push(`/play/${lobby.id}`)
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
