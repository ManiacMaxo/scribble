import {
    Chat,
    DrawTools,
    Layout,
    PostGame,
    UserList,
    WordsModal
} from '@/components'
import { useGameSocket } from '@/hooks'
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
        <Layout>
            <div className='container'>
                <div className='rounded-lg h-[700px] p-4 shadow-xl shadow-neutral/50 bg-slate-100 dark:bg-base-100 dark:shadow-base-300 grid gap-2.5 grid-cols-[1fr_5fr_2fr] grid-rows-[1fr_7fr]'>
                    <strong className='flex items-center content-center col-start-1 row-start-1 text-lg tabular-nums'>
                        {seconds ? `${seconds} seconds` : 'Loading...'}
                    </strong>
                    <header className='flex items-center justify-around col-start-2 col-end-4 row-start-1'>
                        <DrawTools canvas={canvasRef} />
                        {/* {canDraw ? (
                        ) : (
                            <strong>{word}</strong>
                        )} */}
                    </header>
                    <aside className='col-start-1 row-start-2 row-end-3'>
                        <UserList />
                    </aside>
                    {/* <Canvas className='col-start-2 row-start-2' ref={canvasRef} /> */}
                    <Chat />
                    <WordsModal open={openModal} words={words} />
                </div>
            </div>
        </Layout>
    )
}

export default Play
