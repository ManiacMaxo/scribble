import React, { useContext } from 'react'
import { Button, Divider, Header, Icon, Input } from 'semantic-ui-react'
import { Avatar } from '../components'
import { IUserContext, UserContext } from '../contexts/User'
import styles from '../styles/index.module.scss'

const Index = (): JSX.Element => {
    const { username, setUsername } = useContext<IUserContext>(UserContext)

    const changeName = (event: any) => {
        setUsername(event.target.value)
    }

    const joinLobby: any = async () => {
        if (!username) {
            return console.log('username not provided')
        }
        const res: Response = await fetch('/api/find')
        if (res.ok) {
            const { lobby } = await res.json()
            return (window.location.href = `/play?lobby=${lobby}`)
        }
        return console.log('lobby not found')
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
                value={username}
                onChange={changeName}
                spellCheck='false'
            />
            <Divider horizontal>play</Divider>
            <Button.Group widths='2'>
                <Button primary onClick={joinLobby}>
                    join lobby
                </Button>
                <Button
                    secondary
                    onClick={() => (window.location.href = '/create')}
                >
                    create lobby
                </Button>
            </Button.Group>

            <span className={styles.footer}>
                Made with love by{' '}
                <a href='https://github.com/ManiacMaxo/'>ManiacMaxo</a>
            </span>
        </div>
    )
}

export default Index
