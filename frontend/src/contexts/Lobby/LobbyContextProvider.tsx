import React, { useState } from 'react'
import { Socket } from 'socket.io-client'
import { User } from '../../types'
import { LobbyContext } from './LobbyContext'

interface Props {}

const LobbyContextProvider: React.FC<Props> = (props) => {
    const [canDraw, setCanDraw] = useState<boolean>(false)
    const [canChat, setCanChat] = useState<boolean>(!canDraw)
    const [isFinished, setIsFinished] = useState<boolean>(false)

    const [users, setUsers] = useState<User[]>([
        {
            id: 'alsdjfpqe',
            name: 'test',
            points: 100,
            avatarURL: '/assets/avatars/2.png'
        },
        {
            id: 'asd;iqewpoir',
            name: 'test2',
            points: 500,
            avatarURL: '/assets/avatars/16.png'
        },
        {
            id: 'vxckhqwe',
            name: 'test3',
            points: 10,
            avatarURL: '/assets/avatars/47.png'
        },
        {
            id: 'qweroizcv',
            name: 'test4',
            points: 15,
            avatarURL: '/assets/avatars/43.png'
        },
        {
            id: 'cvxqe',
            name: 'test5',
            points: 85,
            avatarURL: '/assets/avatars/33.png'
        }
    ])

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
