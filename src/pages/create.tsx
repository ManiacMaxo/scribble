import React, { useContext, useEffect, useState } from 'react'
import { Button, Input, Step } from 'semantic-ui-react'
import { io } from 'socket.io-client'
import { LobbyCreator, LobbyUsers } from '../components'
import { LobbyContext } from '../contexts/Lobby'

const Create: React.FC = (): JSX.Element => {
    const [isCreating, setIsCreating] = useState<boolean>(true)
    const [url, setUrl] = useState<string>('')

    const { setSocket } = useContext(LobbyContext)

    useEffect(() => {
        if (!url) return
        setSocket(
            io(process.env.REACT_APP_WS + `/play/${url}`, {
                reconnectionAttempts: 1
            })
        )
        // eslint-disable-next-line
    }, [url])

    const getDomain = () => {
        const { protocol, hostname, port } = window.location
        return protocol + '//' + hostname + (port ? ':' + port : '')
    }

    const handleStart = () => {}

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
                        <LobbyUsers users={[]} isOwner />
                        <Input
                            value={`${getDomain()}/play/${url}`}
                            fluid
                            action={{
                                color: 'blue',
                                labelPosition: 'right',
                                icon: 'copy',
                                content: 'Copy'
                            }}
                        />
                        <Button fluid onClick={handleStart}>
                            Start
                        </Button>
                    </>
                )}
            </div>
        </>
    )
}

export default Create
