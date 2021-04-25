import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button, Icon, Input, Step } from 'semantic-ui-react'
import { io } from 'socket.io-client'
import { LobbyCreator, LobbyUsers } from '../components'
import { LobbyContext } from '../contexts/Lobby'

const Create: React.FC = (): JSX.Element => {
    const [isCreating, setIsCreating] = useState<boolean>(true)
    const [url, setUrl] = useState<string>('')
    const [gameLink, setGameLink] = useState<string>('')
    const router = useRouter()
    const { socket, setSocket, users } = useContext(LobbyContext)

    useEffect(() => {
        if (!url) return
        setSocket(io(`/${url}`))
        setGameLink(`${getDomain()}/play/${url}`)
    }, [url])

    const getDomain = () => {
        const { protocol, hostname, port } = window.location
        return protocol + '//' + hostname + (port ? ':' + port : '')
    }

    const handleStart = () => {
        socket?.emit('start')
        socket?.on('start', () => router.push(`/play/${url}`))
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
                        <LobbyUsers isOwner />
                        <Input
                            value={gameLink}
                            fluid
                            action={
                                <CopyToClipboard text={gameLink}>
                                    <Button
                                        color='blue'
                                        icon
                                        labelPosition='right'
                                    >
                                        Copy
                                        <Icon name='copy' />
                                    </Button>
                                </CopyToClipboard>
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
