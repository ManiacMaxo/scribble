import { LobbyContext } from '@/contexts'
import { useGameSocket } from '@/hooks'
import React, { useContext, useEffect, useRef, useState } from 'react'

interface Props {
    className?: string
    width?: number | string
    height?: number | string
}

export enum Tool {
    Pencil = 'pencil'
}

export interface ICanvas {}

const Canvas: React.FC<Props> = (props) => {
    const ref = useRef<HTMLCanvasElement>(null)

    const { setDrawData } = useGameSocket()
    const { canDraw, radius, colour, socket } = useContext(LobbyContext)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (!socket) return

        socket.on('draw', (data: string) => {
            if (canDraw || !data) return
            console.log('got draw')
            ref?.current?.loadSaveData(data)
        })

        return () => {
            socket.off('draw')
        }
    }, [socket, ref, canDraw])

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return <canvas ref={ref} width='100%' height='100%' {...props} />
}

export { Canvas }
