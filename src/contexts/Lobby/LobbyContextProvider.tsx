import React, { useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { User } from '../../types'
import { UserContext } from '../User'
import { LobbyContext } from './LobbyContext'

interface Props {}

const LobbyContextProvider: React.FC<Props> = (props) => {
    const [canDraw, setCanDraw] = useState<boolean>(false)
    const [canChat, setCanChat] = useState<boolean>(!canDraw)

    const [colour, setColour] = useState<string>('black')
    const [radius, setRadius] = useState<number>(12)
    const [word, setWord] = useState<string>('')

    const [isFinished, setIsFinished] = useState<boolean>(false)

    const [users, setUsers] = useState<User[]>([])
    const [socket, setSocket] = useState<Socket | undefined>(undefined)

    const { name, avatarURL } = useContext(UserContext)

    const addUser = (user: User) => {
        setUsers((prev) => [...prev, user])
    }

    const removeUser = (user: User) => {
        setUsers((prev) => prev.filter((u) => u.id !== user.id))
    }

    useEffect(() => {
        if (!socket) return
        socket.onAny((event) => {
            console.log(`got ${event}`)
        })

        socket.once('connect', () => {
            socket.emit('user', { name, avatarURL })
        })

        socket.once('users', (data: User[]) => {
            setUsers(data)
        })

        socket.on('userJoin', (data: User) => {
            if (users.find((u) => u.id === data.id)) return
            addUser(data)
        })

        socket.on('userLeave', (data: User) => {
            removeUser(data)
        })

        socket.once('error', () => socket.disconnect())

        socket.on('disconnect', () => setUsers([]))
    }, [socket])

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
                setUsers
            }}
        >
            {props.children}
        </LobbyContext.Provider>
    )
}

export default LobbyContextProvider
