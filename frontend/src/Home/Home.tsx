import React from 'react'
import { Redirect } from 'react-router-dom'
import { Input } from '../components'
import styles from './Home.module.scss'

interface Props {}

const Home: React.FunctionComponent<Props> = () => {
    const joinLobby = () => {
        fetch(process.env.REACT_APP_ENDPOINT || '').then((res: Response) => {
            if (res.ok) {
                return <Redirect to={`/play?lobby=${res.body}`} />
            } else {
                return joinLobby() // try again if no lobby found
            }
        })
    }
    const createPrivateLobby = () => {}

    return (
        <div className={styles.root}>
            <Input
                name='name'
                type='text'
                placeholder='Enter your name'
                options={{
                    maxLength: 32,
                    autocomplete: 'off',
                    spellCheck: false
                }}
            />
            <button className={styles['primary-button']} onClick={joinLobby}>
                play
            </button>
            <button
                className={styles['secondary-button']}
                onClick={createPrivateLobby}
            >
                create private room
            </button>

            <span>
                Made with love by{' '}
                <a href='https://github.com/ManiacMaxo/'>ManiacMaxo</a>
            </span>
        </div>
    )
}

export default Home
