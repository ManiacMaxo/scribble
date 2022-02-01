import { Chat, DrawTools, PostGame, UserList, WordsModal } from '@/components'
import { useGameSocket } from '@/hooks'
import styles from '@/styles/play.module.scss'
import React from 'react'

const Play: React.FC = () => {
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

    if (isFinished) return <PostGame users={endUsers} />
    // if (false) return <Lobby />

    return (
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
            {/* <Canvas className={styles.canvas} ref={canvasRef} /> */}
            <Chat />
            <WordsModal open={openModal} words={words} />
        </div>
    )
}

export default Play
