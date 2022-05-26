import { useGameSocket } from '@/hooks'
import { useLobby } from '@/store/lobby'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
    className?: string
    width?: number | string
    height?: number | string
}

export enum Tool {
    Pencil = 'pencil'
}

export interface ICanvas {}

const Canvas: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const ref = useRef<HTMLCanvasElement>(null)
    const [mounted, setMounted] = useState(false)

    const { setDrawData } = useGameSocket()
    const canDraw = useLobby((s) => s.canDraw)
    const socket = useLobby((s) => s.socket)
    // const colour = useDraw((s) => s.colour)
    // const size = useDraw((s) => s.size)

    useEffect(() => {
        if (!socket) return

        socket.on('draw', (data: string) => {
            if (canDraw || !data) return
            console.log('got draw')
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
