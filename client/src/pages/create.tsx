import { Layout, LobbyCreator, LobbyUsers } from '@/components'
import { useLobby } from '@/store/lobby'
import { copyToClipboard } from '@/utils'
import { Tab } from '@headlessui/react'
import classnames from 'classnames'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiCopy } from 'react-icons/bi'
import { io } from 'socket.io-client'

const Create: NextPage = () => {
    const [isCreating, setIsCreating] = useState(true)
    const [gameLink, setGameLink] = useState('')
    const [url, setUrl] = useState('')

    const socket = useLobby((s) => s.socket)
    const users = useLobby((s) => s.users)
    const router = useRouter()

    useEffect(() => {
        if (!url) return
        useLobby.setState({
            socket: io(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${url}`)
        })
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
                <Tab.List className='mb-6 flex gap-3'>
                    <Tab
                        disabled={!isCreating}
                        className={({ selected }) =>
                            classnames(
                                'flex flex-col justify-center rounded-lg px-4 py-2',
                                selected
                                    ? 'bg-primary text-primary-content'
                                    : 'dark:bg-base-100 bg-slate-200'
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
                                'flex flex-col justify-center rounded-lg px-4 py-2',
                                selected
                                    ? 'bg-primary text-primary-content'
                                    : 'dark:bg-base-100 bg-slate-200'
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
                                    className='input input-bordered flex-1'
                                />
                                <button
                                    className='btn w-max shrink-0 gap-2 '
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
