import React, { useContext, useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { Label } from 'semantic-ui-react'
import { io } from 'socket.io-client'
import { Chat, DrawTools, WordsModal } from '../components'
import LobbyContextProvider, {
    ILobbyContext,
    LobbyContext
} from '../contexts/Lobby'
import styles from '../styles/play.module.scss'
import { User } from '../types'

const playContext = (): JSX.Element => {
    return (
        <LobbyContextProvider>
            <Play />
        </LobbyContextProvider>
    )
}

const socket = io(process.env.WS || '')

const Play = (): JSX.Element => {
    const {
        setSocket,
        word,
        setWord,
        colour,
        radius
    } = useContext<ILobbyContext>(LobbyContext)

    const canvasRef = useRef(null)
    const [users, setUsers] = useState<User[]>([])
    const [canDraw, setCanDraw] = useState<boolean>(false)
    const [canChat, setCanChat] = useState<boolean>(!canDraw)
    const [isFinished, setIsFinished] = useState<boolean>(false)
    const [seconds, setSeconds] = useState<number>(180)
    const [wordsList, setWordsList] = useState<string[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)

    useEffect(() => {
        setSocket(socket)
        let interval: NodeJS.Timeout
        // socket.on('userJoin', (data: User[]) => {
        //     console.log('user joined ' + data)
        //     setUsers(data)
        // })

        // socket.on('userLeave', (data: User[]) => {
        //     console.log('user left ' + data)
        //     setUsers(data)
        // })

        socket.on('newRound', (data: string[]) => {
            setCanDraw(true)
            setCanChat(false)
            setOpenModal(true)
            setWordsList(data)
        })

        socket.on('roundStart', (roundSeconds: number) => {
            setOpenModal(false)
            setSeconds(roundSeconds)

            interval = setInterval(() => {
                setSeconds((prev: number) => prev - 1)
            }, 1000)
        })

        socket.on('roundEnd', () => {
            clearInterval(interval)
            setIsFinished(true)
            setCanChat(true)
            setCanDraw(false)
        })

        socket.on('hint', (hint: string) => {
            setWord(hint)
        })

        socket.on('correct', () => {
            setCanChat(false)
        })
    }, [])

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <h3>{`${seconds} seconds`}</h3>
                {canDraw ? (
                    <DrawTools canvas={canvasRef} />
                ) : (
                    <h3 className={styles.hint}>{word}</h3>
                )}
            </header>
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
            <CanvasDraw
                ref={canvasRef}
                className={styles.canvas}
                hideInterface
                hideGrid
                lazyRadius={0}
                brushRadius={radius}
                brushColor={colour}
                style={{ width: '100%', height: '100%' }}
                disabled={!canDraw}
            />
            <Chat canChat={canChat} />
            <WordsModal words={wordsList} open={openModal} />
        </div>
    )
}

export default playContext
