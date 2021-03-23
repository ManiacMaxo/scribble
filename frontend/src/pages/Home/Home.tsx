import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Header, Icon, Input } from 'semantic-ui-react'
import styles from './Home.module.scss'

interface Props {}

const Home: React.FC<Props> = () => {
    const joinLobby: any = async () => {
        const res: Response = await fetch(
            process.env.REACT_APP_API_URL + '/find' || ''
        )
        if (res.ok) {
            return <Redirect to={`/play?lobby=${res.body}`} />
        } else {
            return joinLobby() // try again if no lobby found
        }
    }
    const createPrivateLobby = () => {}

    return (
        <div className={styles.root}>
            <Header as='h1' icon textAlign='center'>
                <Icon name='pencil square' />
                <Header.Content>Scribble</Header.Content>
            </Header>
            <Input fluid placeholder='Enter your name' />
            <Button.Group widths='2'>
                <Button primary onClick={joinLobby}>
                    play
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
