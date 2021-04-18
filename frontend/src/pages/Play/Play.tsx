import React, { useContext, useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { useLocation } from 'react-router'
import { io } from 'socket.io-client'
import {
    Chat,
    DrawTools,
    PostGame,
    UserList,
    WordsModal
} from '../../components'
import { ILobbyContext, LobbyContext } from '../../contexts/Lobby'
import styles from './Play.module.scss'

const Play: React.FC = (): JSX.Element => {
    const {
        socket,
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
    const { pathname } = useLocation()

    useEffect(() => {
        if (!socket) {
            setSocket(
                io(process.env.REACT_APP_WS + pathname, {
                    reconnectionAttempts: 1
                })
            )
        }

        let interval: NodeJS.Timeout

        socket?.on('newRound', () => setOpenModal(true))

        socket?.on('roundStart', (roundSeconds: number) => {
            setOpenModal(false)
            setSeconds(roundSeconds)

            interval = setInterval(() => {
                setSeconds((prev: number) => prev - 1)
            }, 1000)
        })

        socket?.on('roundEnd', () => {
            clearInterval(interval)
            setIsFinished(true)
            setCanChat(true)
            setCanDraw(false)
        })

        socket?.on('hint', (hint: string) => {
            setWord(hint)
        })
        // eslint-disable-next-line
    }, [pathname, socket])

    return isFinished ? (
        <PostGame />
    ) : (
        <div className={styles.root}>
            <span className={styles.timer}>{`${seconds} seconds`}</span>
            <header className={styles.header}>
                {canDraw ? (
                    <DrawTools canvas={canvasRef} />
                ) : (
                    <span className={styles.hint}>{word}</span>
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

export default Play
