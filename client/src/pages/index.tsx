import { Avatar } from '@/components'
import { UserContext } from '@/contexts'
import styles from '@/styles/home.module.scss'
import { axios } from '@/utils'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Button, Divider, Header, Icon, Input } from 'semantic-ui-react'

const Home: React.FC = () => {
    const { name, setName } = useContext(UserContext)
    const router = useRouter()

    const joinLobby: any = async () => {
        if (!name) axios.get('/api/word').then((res) => setName(res.data))

        if (router.query.lobby) router.push(`/play/${router.query.lobby}`)

        axios.get('/api/find').then((res) => {
            if (res.status !== 200) return
            const lobby = res.data
            router.push(`/play/${lobby}`)
        })
    }

    return (
        <div className='default-card'>
            <Header as='h1' icon textAlign='center'>
                <Icon name='pencil square' />
                <Header.Content>Scribble</Header.Content>
            </Header>

            <Avatar />
            <Input
                fluid
                placeholder='Enter your name'
                value={name ?? ''}
                onChange={(event) => setName(event.target.value)}
                spellCheck='false'
            />
            <Divider horizontal>play</Divider>
            <Button.Group widths='3'>
                <Button onClick={() => router.push('/create')}>
                    Create lobby
                </Button>
                <Button primary onClick={joinLobby}>
                    Join lobby
                </Button>
                <Button onClick={() => router.push('/lobbies')}>
                    All lobbies
                </Button>
            </Button.Group>

            <span className={styles.footer}>
                Made with love by{' '}
                <a
                    href='https://github.com/ManiacMaxo/'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    ManiacMaxo
                </a>
            </span>
        </div>
    )
}

export default Home
