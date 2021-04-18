import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Divider, Header, Icon, Input, Label } from 'semantic-ui-react'
import { Avatar } from '../../components'
import { IUserContext, UserContext } from '../../contexts/User'
import styles from './Home.module.scss'

const Home: React.FC = (): JSX.Element => {
    const { username, setUsername } = useContext<IUserContext>(UserContext)
    const [error, setError] = useState<string | null>(null)
    const history = useHistory()

    const joinLobby: any = async () => {
        if (!username) {
            const wordAPI = await fetch(process.env.REACT_APP_API_URL + '/word')
            setUsername(await wordAPI.text())
        }

        try {
            const res: Response = await fetch(
                process.env.REACT_APP_API_URL + '/find'
            )
            if (res.ok) {
                const lobby = await res.text()
                return history.push(`/play/${lobby}`)
            }
        } catch (e) {
            console.error(e)
            return setError('The server is having problems right now')
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
                value={username ?? ''}
                onChange={(event) => setUsername(event.target.value)}
                spellCheck='false'
            />
            <Divider horizontal>play</Divider>
            <Button.Group widths='2'>
                <Button primary onClick={joinLobby}>
                    join lobby
                </Button>
                <Button secondary onClick={() => history.push('/create')}>
                    create lobby
                </Button>
            </Button.Group>

            {error && (
                <Label color='red' horizontal className={styles.error}>
                    {error}
                </Label>
            )}

            <span className={styles.footer}>
                Made with love by{' '}
                <a href='https://github.com/ManiacMaxo/'>ManiacMaxo</a>
            </span>
        </div>
    )
}

export default Home
