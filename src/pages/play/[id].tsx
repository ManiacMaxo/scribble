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
        setCanChat,
        setIsFinished,
        canDraw
    } = useContext<ILobbyContext>(LobbyContext)

    const canvasRef = useRef<any>(null)
    const [seconds, setSeconds] = useState<number>(180)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [data, setData] = useState<string>('')
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) return
        if (!socket) return setSocket(io(`/${id}`))

        socket.once('error', () => router.push('/'))
        socket.on('drawing', () => setOpenModal(true))
        socket.on('timer', (time: number) => setSeconds(time))
        socket.on('hint', (hint: string) => setWord(hint))

        socket.on('turnStart', () => setOpenModal(false))

        socket.on('turnEnd', () => {
            setIsFinished(true)
            setCanChat(true)
            setCanDraw(false)
        })

        socket.on('draw', (data) => {
            if (canDraw) return
            canvasRef.current.loadSaveData(data, true)
        })

        // eslint-disable-next-line
    }, [id, socket])

    useEffect(() => {
        console.log(data)
        socket?.emit('draw', data)
    }, [data])

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
                onChange={(canvas) => setData(canvas.getSaveData())}
            />
            <Chat />
            <WordsModal open={openModal} />
        </div>
    )
}

export default Play
