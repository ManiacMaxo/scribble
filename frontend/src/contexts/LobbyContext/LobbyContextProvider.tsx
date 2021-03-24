import React, { useState } from 'react'
import { Socket } from 'socket.io-client'
import { LobbyContext } from './LobbyContext'

interface Props {}

const LobbyContextProvider: React.FC<Props> = (props) => {
    const [socket, setSocket] = useState<Socket | undefined>(undefined)
    const [colour, setColour] = useState<string>('black')
    const [radius, setRadius] = useState<number>(12)
    const [word, setWord] = useState<string>('')

    return (
        <LobbyContext.Provider
            value={{
                socket,
                colour,
                radius,
                word,
                setSocket,
                setColour,
                setRadius,
                setWord
            }}
        >
            {props.children}
        </LobbyContext.Provider>
    )
}

export default LobbyContextProvider
