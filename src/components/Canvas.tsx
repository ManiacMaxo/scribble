import React, { useContext, useEffect } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { LobbyContext } from '../contexts/Lobby'
import { useGameSocket } from '../hooks'

interface Props {
    className?: string
}

const Canvas = React.forwardRef((props: Props, ref: any) => {
    const { setDrawData } = useGameSocket()
    const { canDraw, radius, colour, socket } = useContext(LobbyContext)

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
