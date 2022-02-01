import { LobbyContext } from '@/contexts'
import { useGameSocket } from '@/hooks'
import React, { useContext, useEffect, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'

interface Props {
    className?: string
}

const Canvas = React.forwardRef((props: Props, ref: any) => {
    const { setDrawData } = useGameSocket()
    const { canDraw, radius, colour, socket } = useContext(LobbyContext)
    const [mounted, setMounted] = useState(false)

    const onCanvasChange = (canvas: CanvasDraw) => {
        if (!canDraw) return
        setDrawData(canvas.getSaveData())
    }

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
    return (
        <CanvasDraw
            ref={ref}
            className={props.className}
            hideInterface
            hideGrid
            immediateLoading
            lazyRadius={0}
            canvasWidth='100%'
            canvasHeight='100%'
            brushRadius={radius}
            brushColor={colour}
            disabled={!canDraw}
            onChange={onCanvasChange}
        />
    )
})

export { Canvas }
