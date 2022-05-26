import {
    Chat,
    DrawTools,
    Layout,
    PostGame,
    UserList,
    WordsModal
} from '@/components'
import { useGameSocket } from '@/hooks'
import { NextPage } from 'next'
import React from 'react'

const Play: NextPage = () => {
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
                <div className='shadow-neutral/50 dark:bg-base-100 dark:shadow-base-300 grid h-[700px] grid-cols-[1fr_5fr_2fr] grid-rows-[1fr_7fr] gap-2.5 rounded-lg bg-slate-100 p-4 shadow-xl'>
                    <strong className='col-start-1 row-start-1 flex content-center items-center text-lg tabular-nums'>
                        {seconds ? `${seconds} seconds` : 'Loading...'}
                    </strong>
                    <header className='col-start-2 col-end-4 row-start-1 flex items-center justify-around'>
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
                    <WordsModal isOpen={openModal} options={words} />
                </div>
            </div>
        </Layout>
    )
}

export default Play
