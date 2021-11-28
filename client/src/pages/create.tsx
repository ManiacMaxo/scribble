import { LobbyCreator, LobbyUsers } from '@/components'
import { LobbyContext } from '@/contexts'
import { copyToClipboard } from '@/utils'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Icon, Input, Step } from 'semantic-ui-react'
import { io } from 'socket.io-client'

const Create: React.FC = () => {
    const [isCreating, setIsCreating] = useState(true)
    const [gameLink, setGameLink] = useState('')
    const [url, setUrl] = useState('')

    const { socket, setSocket, users } = useContext(LobbyContext)
    const router = useRouter()

    useEffect(() => {
        if (!url) return
        setSocket(io(`/${url}`))
        setGameLink(`${getDomain()}/play/${url}`)
    }, [url])

    const getDomain = () => {
        console.log(router.basePath)
        const { protocol, hostname, port } = window.location
        return protocol + '//' + hostname + (port ? ':' + port : '')
    }

    const handleStart = () => {
        router.push(`/play/${url}`)
        socket?.emit('start')
    }

    return (
        <>
            <Step.Group ordered>
                <Step active={isCreating} completed={!isCreating}>
                    <Step.Content>
                        <Step.Title>Settings</Step.Title>
                        <Step.Description>
                            Choose your game options
                        </Step.Description>
                    </Step.Content>
                </Step>

                <Step active={!isCreating}>
                    <Step.Content>
                        <Step.Title>Invite players</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
            <div className='default-card'>
                {isCreating ? (
                    <LobbyCreator
                        setUrl={setUrl}
                        setIsCreating={setIsCreating}
                    />
                ) : (
                    <>
                        <LobbyUsers />
                        <Input
                            value={gameLink}
                            fluid
                            action={
                                <Button
                                    color='blue'
                                    icon
                                    labelPosition='right'
                                    onClick={() => copyToClipboard(gameLink)}
                                >
                                    Copy
                                    <Icon name='copy' />
                                </Button>
                            }
                        />
                        <Button
                            fluid
                            primary
                            onClick={handleStart}
                            disabled={users.length < 3}
                        >
                            Start
                        </Button>
                    </>
                )}
            </div>
        </>
    )
}

export default Create
