import { Layout, LobbyCreator, LobbyUsers } from '@/components'
import { LobbyContext } from '@/contexts'
import { copyToClipboard } from '@/utils'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { BiCopy } from 'react-icons/bi'
import { io } from 'socket.io-client'
import { Tab } from '@headlessui/react'
import classnames from 'classnames'

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
            <Tab.Group selectedIndex={isCreating ? 0 : 1}>
                <Tab.List className='flex gap-3 mb-6'>
                    <Tab
                        disabled={!isCreating}
                        className={({ selected }) =>
                            classnames(
                                'flex flex-col justify-center px-4 py-2 rounded-lg',
                                selected
                                    ? 'bg-primary text-primary-content'
                                    : 'bg-slate-200 dark:bg-base-100'
                            )
                        }
                    >
                        <h2 className='text-lg'>Settings</h2>
                        <span className='text-sm'>
                            Choose your game options
                        </span>
                    </Tab>
                    <Tab
                        disabled={isCreating}
                        className={({ selected }) =>
                            classnames(
                                'flex flex-col justify-center px-4 py-2 rounded-lg',
                                selected
                                    ? 'bg-primary text-primary-content'
                                    : 'bg-slate-200 dark:bg-base-100'
                            )
                        }
                    >
                        <h2 className='text-lg'>Invite players</h2>
                    </Tab>
                </Tab.List>
                <Tab.Panels as={React.Fragment}>
                    <Tab.Panel className='default-card'>
                        <LobbyCreator
                            setUrl={setUrl}
                            setIsCreating={setIsCreating}
                        />
                    </Tab.Panel>
                    <Tab.Panel className='default-card'>
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
                            title={
                                users.length < 3
                                    ? 'Lobby needs at least 3 players'
                                    : 'Start the game'
                            }
                        >
                            Start
                        </button>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </Layout>
    )
}

export default Create
