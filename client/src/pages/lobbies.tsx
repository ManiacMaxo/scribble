import { Lobby } from '@/types'
import { axios } from '@/utils'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, List } from 'semantic-ui-react'

interface Props {
    lobbies: Lobby[]
}

const Lobbies: React.FC<Props> = ({ lobbies }) => {
    const router = useRouter()

    return (
        <div className='default-card'>
            <List relaxed divided size='large'>
                {lobbies.length ? (
                    lobbies.map((lobby) => (
                        <List.Item key={lobby.id}>
                            <List.Icon
                                name='point'
                                size='large'
                                verticalAlign='middle'
                            />
                            <List.Content>
                                <List.Header>{lobby.name}</List.Header>
                                <List.Description>
                                    players: {lobby.users}/{lobby.maxUsers}{' '}
                                    round: {lobby.round}/{lobby.maxRounds}
                                    <Button
                                        floated='right'
                                        compact
                                        onClick={() =>
                                            router.push(`/play/${lobby.id}`)
                                        }
                                        disabled={
                                            lobby.users === lobby.maxUsers
                                        }
                                    >
                                        {lobby.users === lobby.maxUsers ? (
                                            <strong>FULL</strong>
                                        ) : (
                                            'Join'
                                        )}
                                    </Button>
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    ))
                ) : (
                    <>
                        <h3>There are currently no active public lobbies</h3>
                        <Button primary onClick={() => router.push('/create')}>
                            Create one
                        </Button>
                    </>
                )}
            </List>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const { data } = await axios.get<Array<Lobby>>('/api/lobbies', {
            params: { m: 20 }
        })

        return {
            props: {
                lobbies: data
            }
        }
    } catch (error) {
        return {
            props: {
                lobbies: []
            }
        }
    }
}

export default Lobbies
