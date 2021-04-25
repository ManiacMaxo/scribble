import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { io } from 'socket.io-client'
import {
    Chat,
    DrawTools,
    PostGame,
    UserList,
    WordsModal
} from '../../components'
import { ILobbyContext, LobbyContext } from '../../contexts/Lobby'
import { IUserContext, UserContext } from '../../contexts/User'
import styles from '../../styles/play.module.scss'

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
        setIsFinished,
        canDraw,
        setCanChat
    } = useContext<ILobbyContext>(LobbyContext)

    const canvasRef = useRef<any>(null)
    const [seconds, setSeconds] = useState<number>(0)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [data, setData] = useState<string>('')
    const [words, setWords] = useState<string[]>([])

    const router = useRouter()
    const { id } = router.query
    const { name } = useContext<IUserContext>(UserContext)

    useEffect(() => {
        if (!id) return
        if (!name) router.push(`/?lobby=${id}`)
        if (!socket) return setSocket(io(`/${id}`))

        socket.once('error', () => router.push('/'))
        socket.on('drawing', (data: string[]) => {
            console.log('drawing', data)
            setWords(data)
        })
        socket.on('timer', (time: number) => setSeconds(time))
        socket.on('hint', (hint: string) => {
            if (canDraw) return
            setWord(hint)
        })

        socket.on('turnStart', (data: string) => {
            setCanDraw(true)
            setCanChat(false)
            setWord(data)
            setOpenModal(false)
        })

        socket.on('turnEnd', () => {
            setCanDraw(false)
            setCanChat(true)
            canvasRef.current.clear()
        })
        socket.on('end', () => setIsFinished(true))

        socket.on('draw', (data) => {
            if (canDraw || !data) return
            canvasRef.current.loadSaveData(data, true)
        })

        // eslint-disable-next-line
    }, [id, socket])

    useEffect(() => {
        console.log(data)
        socket?.emit('draw', data)
    }, [data])

    useEffect(() => {
        console.log('words', words)
        if (words.length) setOpenModal(true)
    }, [words])

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
                canvasWidth='100%'
                canvasHeight='100%'
                disabled={!canDraw}
                onChange={(canvas) => {
                    if (!canDraw) return
                    setData(canvas.getSaveData())
                }}
            />
            <Chat />
            <WordsModal open={openModal} words={words} />
        </div>
    )
}

export default Play
