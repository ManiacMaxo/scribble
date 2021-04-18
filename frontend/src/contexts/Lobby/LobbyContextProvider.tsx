import React, { useState } from 'react'
import { Socket } from 'socket.io-client'
import { User } from '../../types'
import { LobbyContext } from './LobbyContext'

interface Props {}

const LobbyContextProvider: React.FC<Props> = (props) => {
    const [canDraw, setCanDraw] = useState<boolean>(false)
    const [canChat, setCanChat] = useState<boolean>(!canDraw)
    const [isFinished, setIsFinished] = useState<boolean>(false)

    const [users, setUsers] = useState<User[]>([])

    const [socket, setSocket] = useState<Socket | undefined>(undefined)
    const [colour, setColour] = useState<string>('black')
    const [radius, setRadius] = useState<number>(12)
    const [word, setWord] = useState<string>('philantropy')

    const addUser = (user: User) => {
        setUsers((prev) => [...prev, user])
    }

    const removeUser = (user: User) => {
        setUsers((prev) => prev.filter((u) => u !== user))
    }

    socket?.onAny((event) => {
        console.log(`got ${event}`)
    })

    socket?.once('id', (data: string) => {
        // console.log('id ' + data)
        localStorage.setItem('id', data)
    })

    return (
        <LobbyContext.Provider
            value={{
                socket,
                colour,
                radius,
                word,
                canDraw,
                canChat,
                isFinished,
                users,
                setSocket,
                setColour,
                setRadius,
                setWord,
                setCanDraw,
                setCanChat,
                setIsFinished,
                addUser,
                removeUser
            }}
        >
            {props.children}
        </LobbyContext.Provider>
    )
}

export default LobbyContextProvider
