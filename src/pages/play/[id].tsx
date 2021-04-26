import React from 'react'
import {
    Canvas,
    Chat,
    DrawTools,
    PostGame,
    UserList,
    WordsModal
} from '../../components'
import { useGameSocket } from '../../hooks'
import styles from '../../styles/play.module.scss'

const Play: React.FC = (): JSX.Element => {
    const {
        isFinished,
        endUsers,
        seconds,
        canDraw,
        canvasRef,
        word,
        openModal,
        words
    } = useGameSocket()

    return isFinished ? (
        <PostGame users={endUsers} />
    ) : (
        <>
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
                <Canvas className={styles.canvas} ref={canvasRef} />
                <Chat />
            </div>
            <WordsModal open={openModal} words={words} />
        </>
    )
}

export default Play
