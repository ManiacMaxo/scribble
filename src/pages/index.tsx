import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { Button, Divider, Header, Icon, Input } from 'semantic-ui-react'
import { Avatar } from '../components'
import { UserContext } from '../contexts/User'
import styles from '../styles/home.module.scss'

const Home: React.FC = (): JSX.Element => {
    const { name, setName } = useContext(UserContext)
    const router = useRouter()

    const joinLobby: any = async () => {
        if (!name) {
            const res = await axios('/api/word')
            setName(res.data)
        }

        if (router.query.lobby) {
            router.push(`/play/${router.query.lobby}`)
        }

        try {
            const res = await axios('/api/find')
            if (res.status !== 200) return
            const lobby = res.data
            return router.push(`/play/${lobby}`)
        } catch (e) {
            console.error(e)
            toast.error('The server is having problems right now')
        }
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
                <a href='https://github.com/ManiacMaxo/'>ManiacMaxo</a>
            </span>
        </div>
    )
}

export default Home
