import React, { useContext, useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { io } from 'socket.io-client'
import { Chat, DrawTools, PostGame, UserList, WordsModal } from '../components'
import LobbyContextProvider, {
    ILobbyContext,
    LobbyContext
} from '../contexts/Lobby'
import styles from '../styles/play.module.scss'

const playContext = (): JSX.Element => (
    <LobbyContextProvider>
        <Play />
    </LobbyContextProvider>
)

const socket = io(process.env.WS || '', { reconnectionAttempts: 1 })

const Play = (): JSX.Element => {
    const {
        setSocket,
        word,
        setWord,
        colour,
        radius,
        isFinished,
        setCanDraw,
        setCanChat,
        setIsFinished,
        canDraw
    } = useContext<ILobbyContext>(LobbyContext)

    const canvasRef = useRef(null)
    const [seconds, setSeconds] = useState<number>(180)
    const [openModal, setOpenModal] = useState<boolean>(false)

    useEffect(() => {
        setSocket(socket)
        let interval: NodeJS.Timeout

        socket.on('newRound', () => setOpenModal(true))

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
    }, [])

    return isFinished ? (
        <PostGame />
    ) : (
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
                <UserList />
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
            <Chat />
            <WordsModal open={openModal} />
        </div>
    )
}

export default playContext
