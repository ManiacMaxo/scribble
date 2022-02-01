import { LobbyContext, UserContext } from '@/contexts'
import { User } from '@/types'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

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

    const canvasRef = useRef<any>()
    const [seconds, setSeconds] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [words, setWords] = useState<Array<string>>([])
    const [endUsers, setEndUsers] = useState<Array<User>>([])
    const [drawData, setDrawData] = useState('')

    useEffect(() => {
        words.length && setOpenModal(true)
    }, [words])

    useEffect(() => {
        drawData && socket?.emit('draw', drawData)
    }, [drawData])

    useEffect(() => {
        if (!router.isReady) return
        const { id } = router.query
        if (!name) router.push(`/?lobby=${id}`)
        if (!socket)
            return setSocket(
                io(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${id}`)
            )

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
            canvasRef?.current.clear()
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
