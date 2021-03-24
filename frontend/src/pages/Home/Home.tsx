import React, { useContext } from 'react'
import { Button, Divider, Header, Icon, Input } from 'semantic-ui-react'
import { Avatar } from '../../components'
import { IUserContext, UserContext } from '../../contexts/UserContext'
import styles from './Home.module.scss'

interface Props {}

const Home: React.FC<Props> = () => {
    const { username, setUsername } = useContext<IUserContext>(UserContext)

    const changeName = (event: any) => {
        setUsername(event.target.value)
    }

    const joinLobby: any = async () => {
        if (!username) {
            return console.log('username not provided')
        }
        const res: Response = await fetch(
            process.env.REACT_APP_API_URL + '/find' || ''
        )
        if (res.ok) {
            const code = await res.json()
            return (window.location.href = `/play?lobby=${code}`)
        }
        return console.log('lobby not found')
    }
    const createPrivateLobby = () => {}

    return (
        <div className={styles.root}>
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
            />
            <Divider horizontal>play</Divider>
            <Button.Group widths='2'>
                <Button primary onClick={joinLobby}>
                    join random room
                </Button>
                <Button secondary onClick={createPrivateLobby}>
                    create private room
                </Button>
            </Button.Group>

            <span>
                Made with love by{' '}
                <a href='https://github.com/ManiacMaxo/'>ManiacMaxo</a>
            </span>
        </div>
    )
}

export default Home
