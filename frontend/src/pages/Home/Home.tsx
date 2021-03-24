import React, { useRef, useState } from 'react'
import { Button, Header, Icon, Input, Ref } from 'semantic-ui-react'
import styles from './Home.module.scss'

interface Props {}

const Home: React.FC<Props> = () => {
    const inputRef = useRef(null)
    const [name, setName] = useState(localStorage.getItem('name'))

    const changeName = (event: any) => {
        setName(event.target.value)
    }

    const joinLobby: any = async () => {
        if (!name) {
            return console.log('name not provided')
        }
        localStorage.setItem('name', name)
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
            <Ref innerRef={inputRef}>
                <Input
                    fluid
                    placeholder='Enter your name'
                    value={name}
                    onChange={changeName}
                />
            </Ref>
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
