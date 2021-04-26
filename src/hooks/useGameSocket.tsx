import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { LobbyContext } from '../contexts/Lobby'
import { UserContext } from '../contexts/User'
import { User } from '../types'

export const useGameSocket = () => {
    const router = useRouter()
    const { id } = router.query
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
        radius,
        colour,
        setCanChat
    } = useContext(LobbyContext)

    const canvasRef = useRef<any>(null)
    const [seconds, setSeconds] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [drawData, setDrawData] = useState('')
    const [words, setWords] = useState<Array<string>>([])
    const [endUsers, setEndUsers] = useState<Array<User>>([])

    useEffect(() => {
        console.log('words', words)
        if (words.length) setOpenModal(true)
    }, [words])

    useEffect(() => {
        console.log(drawData)
        socket?.emit('draw', drawData)
    }, [drawData])

    useEffect(() => {
        if (!id) return
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
            canvasRef.current.clear()
        })
        socket.on('end', (users: User[]) => {
            setEndUsers(users)
            setIsFinished(true)
        })

        socket.on('draw', (data) => {
            if (canDraw || !data) return
            canvasRef.current.loadSaveData(data, true)
        })

        return () => {
            socket.off('error')
            socket.off('drawing')
            socket.off('timer')
            socket.off('hint')
            socket.off('turnStart')
            socket.off('turnEnd')
            socket.off('end')
            socket.off('draw')
        }

        // eslint-disable-next-line
    }, [id, socket])

    return {
        isFinished,
        endUsers,
        seconds,
        canDraw,
        canvasRef,
        word,
        radius,
        colour,
        openModal,
        words,
        setDrawData
    }
}
