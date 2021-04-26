import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { LobbyContext } from '../contexts/Lobby'
import { UserContext } from '../contexts/User'
import { User } from '../types'

export const useGameSocket = () => {
    const router = useRouter()
    const { name } = useContext(UserContext)

    const {
        isFinished,
        socket,
        setSocket,
        setWord,
        setCanDraw,
        setIsFinished,
        canDraw,
        word,
        setCanChat
    } = useContext(LobbyContext)

    const canvasRef: any = useRef<any>()
    const [seconds, setSeconds] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [words, setWords] = useState<Array<string>>([])
    const [endUsers, setEndUsers] = useState<Array<User>>([])
    const [drawData, setDrawData] = useState('')

    useEffect(() => {
        if (words.length) setOpenModal(true)
    }, [words])

    useEffect(() => {
        if (drawData === '') return
        socket?.emit('draw', drawData)
    }, [drawData])

    useEffect(() => {
        if (!router.isReady) return
        const { id } = router.query
        if (!name) router.push(`/?lobby=${id}`)
        if (!socket) return setSocket(io(`/${id}`))

        socket.once('error', () => router.push('/'))

        socket.on('drawing', (data: string[]) => {
            console.log('drawing', data)
            setWords(data)
        })

        socket.on('timer', (time: number) => setSeconds(time))

        socket.on('hint', (hint: string) => {
            if (canDraw) return
            setWord(hint)
        })

        socket.on('turnStart', (data: string) => {
            setCanDraw(true)
            setCanChat(false)
            setWord(data)
            setOpenModal(false)
        })

        socket.on('turnEnd', () => {
            setCanDraw(false)
            setCanChat(true)
            canvasRef?.current?.clear()
        })

        socket.on('end', (users: User[]) => {
            setEndUsers(users)
            setIsFinished(true)
        })

        return () => {
            socket.off('error')
            socket.off('drawing')
            socket.off('timer')
            socket.off('hint')
            socket.off('turnStart')
            socket.off('turnEnd')
            socket.off('end')
        }

        // eslint-disable-next-line
    }, [router, socket])

    return {
        setDrawData,
        isFinished,
        endUsers,
        seconds,
        canDraw,
        canvasRef,
        word,
        openModal,
        words
    }
}
