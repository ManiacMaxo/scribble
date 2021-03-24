import React, { useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { Label } from 'semantic-ui-react'
import { io } from 'socket.io-client'
import { Chat, DrawTools } from '../../components'
import styles from './Lobby.module.scss'

interface Props {}

interface User {
    name: string
    points: number
}

const socket = io(process.env.REACT_APP_API_URL || '')

const Lobby: React.FC<Props> = (props) => {
    const canvas = useRef(null)
    const [users, setUsers] = useState<User[]>([])
    const [isDrawing, setIsDrawing] = useState<boolean>(false)
    const [hint, setHint] = useState<string>('h__t')
    const [canChat, setCanChat] = useState<boolean>(!isDrawing)

    useEffect(() => {
        // socket.on('userJoin', (data: User[]) => {
        //     console.log('user joined ' + data)
        //     setUsers(data)
        // })

        // socket.on('userLeave', (data: User[]) => {
        //     console.log('user left ' + data)
        //     setUsers(data)
        // })

        socket.onAny((event) => {
            console.log(`got ${event}`)
        })

        socket.once('id', (data: string) => {
            // console.log('id ' + data)
            localStorage.setItem('id', data)
        })

        socket.on('newRound', (data: string) => {
            if (data === localStorage.getItem('id')) {
                setIsDrawing(true)
                setCanChat(false)
                return
            }
            setCanChat(true)
            setIsDrawing(false)
        })

        socket.on('hint', (hint: string) => {
            setHint(hint)
        })

        socket.on('correct', () => {
            setCanChat(false)
        })
    }, [])

    return (
        <div className={styles.root}>
            <aside className={styles.users}>
                <ul>
                    {users.map((user) => (
                        <li key={user.name}>
                            <Label as='span'>
                                {user.name}
                                <Label.Detail>{user.points}</Label.Detail>
                            </Label>
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
            <Chat canChat={canChat} socket={socket} />
        </div>
    )
}

export default Lobby
