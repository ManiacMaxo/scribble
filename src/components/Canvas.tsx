import React, { useCallback, useContext } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { LobbyContext } from '../contexts/Lobby'

interface Props {
    className: string
    canvas: React.MutableRefObject<any>
    setDrawData: (value: string) => void
}

const Canvas: React.FC<Props> = (props) => {
    const { canDraw, radius, colour } = useContext(LobbyContext)

    const onCanvasChange = useCallback((canvas: CanvasDraw) => {
        if (!canDraw) return
        props.setDrawData(canvas.getSaveData())
    }, [])
    return (
        <CanvasDraw
            ref={props.canvas}
            className={props.className}
            hideInterface
            hideGrid
            lazyRadius={0}
            canvasWidth='100%'
            canvasHeight='100%'
            brushRadius={radius}
            brushColor={colour}
            disabled={!canDraw}
            onChange={onCanvasChange}
        />
    )
}

export { Canvas }
