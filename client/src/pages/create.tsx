import { Layout, LobbyCreator, LobbyUsers } from '@/components'
import { LobbyContext } from '@/contexts'
import { copyToClipboard } from '@/utils'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { BiCopy } from 'react-icons/bi'
import { io } from 'socket.io-client'

const Create: React.FC = () => {
    const [isCreating, setIsCreating] = useState(true)
    const [gameLink, setGameLink] = useState('')
    const [url, setUrl] = useState('')

    const { socket, setSocket, users } = useContext(LobbyContext)
    const router = useRouter()

    useEffect(() => {
        if (!url) return
        setSocket(io(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${url}`))
        const domain = new URL(window.location.href)
        setGameLink(`${domain.origin}/play/${url}`)
    }, [url])

    const handleStart = () => {
        router.push(`/play/${url}`)
        socket?.emit('start')
    }

    return (
        <Layout>
            <div className='flex mb-6'>
                <div className={'flex flex-col justify-center py-2 px-4'}>
                    <h2>Settings</h2>
                    <span>Choose your game options</span>
                </div>

                <div className={'flex flex-col justify-center py-2 px-4'}>
                    <h2>Invite players</h2>
                </div>
            </div>
            <div className='default-card'>
                {isCreating ? (
                    <LobbyCreator
                        setUrl={setUrl}
                        setIsCreating={setIsCreating}
                    />
                ) : (
                    <>
                        <LobbyUsers />

                        <div className='form-control'>
                            <div className='input-group'>
                                <input
                                    type='text'
                                    value={gameLink}
                                    readOnly
                                    className='flex-1 input input-bordered'
                                />
                                <button
                                    className='gap-2 btn shrink-0 w-max '
                                    onClick={() => copyToClipboard(gameLink)}
                                >
                                    Copy <BiCopy className='text-xl' />
                                </button>
                            </div>
                        </div>

                        <button
                            className='btn btn-primary'
                            onClick={handleStart}
                            disabled={users.length < 3}
                        >
                            Start
                        </button>
                    </>
                )}
            </div>
        </Layout>
    )
}

export default Create
