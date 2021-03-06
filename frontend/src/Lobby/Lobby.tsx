import React, { useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { Chat, DrawTools } from '../components'
import styles from './Lobby.module.scss'

interface Props {}

const Lobby: React.FunctionComponent<Props> = (props) => {
    const canvas = useRef(null)
    const [users, setUsers] = useState<Array<string>>([])
    const [isDrawing, setIsDrawing] = useState<boolean>(true)
    const [hint, setHint] = useState<string>('hint')

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
                    <DrawTools canvas={canvas} />
                ) : (
                    <h3 className={styles.hint}>{hint}</h3>
                )}
            </header>
            <CanvasDraw
                ref={canvas}
                className={styles.canvas}
                hideInterface
                hideGrid
                lazyRadius={0}
                brushColor={'black'}
                style={{ width: '100%', height: '100%' }}
                disabled={!isDrawing}
            />
            <Chat isDrawing={isDrawing} />
        </div>
    )
}

export default Lobby
