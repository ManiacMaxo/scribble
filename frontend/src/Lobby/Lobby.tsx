import React, { useState } from 'react'
import styles from './Lobby.module.scss'

interface Props {}

const Lobby: React.FunctionComponent<Props> = (props) => {
    const [users, setUsers] = useState<Array<string>>([])
    const [isDrawing, setIsDrawing] = useState<boolean>(true)
    const [hint, setHint] = useState<string>('hint')

    const colors: string[] = ['red', 'green', 'blue', 'black']
    // const socket = io(process.env.REACT_APP_ENDPOINT || '')
    const socket = { on: (args: {}, callback: Function) => {} }

    socket.on('message', (message: any) => {
        console.log(message)
    })

    socket.on('userJoin userLeave', (users: Array<string>) => {
        setUsers(users)
    })

    socket.on('connection', (id: string) => {
        localStorage.setItem('id', id)
    })

    socket.on('draw', (id: string) => {
        if (id === localStorage.getItem('id')) {
            setIsDrawing(true)
        }
    })

    socket.on('hint', (hint: string) => {
        setHint(hint)
    })

    return (
        <div className={styles.root}>
            <aside className={styles.users}>
                <ul>
                    {users.map((user) => (
                        <li key={user}>
                            <p>{user}</p>
                        </li>
                    ))}
                </ul>
            </aside>
            <header>
                {isDrawing ? (
                    <>
                        <div className={styles.colors}>
                            {colors.map((color: string) => (
                                <div
                                    className={styles[color]}
                                    key={color}
                                ></div>
                            ))}
                        </div>
                        <h3 className={styles.word}>{'word'}</h3>
                    </>
                ) : (
                    <h3 className={styles.hint}>{hint}</h3>
                )}
            </header>
            <div className={styles.canvas}></div>
            <div className={styles.chat}>
                <ul>
                    <li>
                        <p className={styles.message}>
                            ManiacMaxo: hello there
                        </p>
                    </li>
                    <li>
                        <p className={styles.message}>
                            ManiacMaxo: hello there
                        </p>
                    </li>
                    <li>
                        <p className={styles.message}>
                            ManiacMaxo: this is a test long message for chat
                        </p>
                    </li>
                </ul>
                <input
                    type='text'
                    placeholder={
                        isDrawing ? ' You are drawing!' : 'Enter your guess'
                    }
                    maxLength={64}
                    disabled={isDrawing}
                />
            </div>
        </div>
    )
}

export default Lobby
