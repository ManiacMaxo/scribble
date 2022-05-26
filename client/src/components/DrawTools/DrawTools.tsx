import { Slider } from '@/components'
import { MAX_BRUSH_SIZE, MIN_BRUSH_SIZE, useDraw } from '@/store/draw'
import { useLobby } from '@/store/lobby'
import classnames from 'classnames'
import React from 'react'
import { BiEraser, BiPencil, BiTrashAlt, BiUndo } from 'react-icons/bi'
import { FaTint } from 'react-icons/fa'
import { skribblio as colourTheme } from './colours'

interface Props {
    canvas: any
}

const DrawTools: React.FC<Props> = (_props) => {
    const word = useLobby((s) => s.word)
    const size = useDraw((s) => s.size)
    const colour = useDraw((s) => s.colour)
    const mode = useDraw((s) => s.mode)
    const changeColour = useDraw((s) => s.changeColour)

    const getBorderRadius = (index: number) => {
        if (index === 0) return 'rounded-tl-md'
        if (index === colourTheme.length / 2 - 1) return 'rounded-tr-md'
        if (index === colourTheme.length - 1) return 'rounded-br-md'
        if (index === colourTheme.length / 2) return 'rounded-bl-md'
    }

    return (
        <>
            <div
                className='grid'
                style={{
                    gridTemplateColumns: `repeat(${Math.ceil(
                        colourTheme.length / 2
                    )}, 2rem)`
                }}
            >
                {colourTheme.map((clr, index) => (
                    <button
                        key={clr}
                        className={classnames(
                            'h-5 w-full border-4 focus:z-[1]',
                            getBorderRadius(index),
                            mode !== 'erase' && clr === colour
                                ? 'border-neutral-500'
                                : 'border-transparent'
                        )}
                        style={{ background: clr }}
                        disabled={clr === colour}
                        onClick={() => clr !== colour && changeColour(clr)}
                    />
                ))}
            </div>

            <div className='relative flex'>
                <div className='btn-group'>
                    <button
                        className='btn focus:z-[1]'
                        title='draw'
                        onClick={() => useDraw.setState({ mode: 'draw' })}
                    >
                        <BiPencil />
                    </button>
                    <button
                        className='btn focus:z-[1]'
                        title='eraser'
                        onClick={() => useDraw.setState({ mode: 'erase' })}
                    >
                        <BiEraser />
                    </button>
                    <button
                        className='btn focus:z-[1]'
                        title='fill'
                        disabled
                        onClick={() => useDraw.setState({ mode: 'fill' })}
                    >
                        <FaTint />
                    </button>
                    <button
                        className='btn focus:z-[1]'
                        title='undo'
                        onClick={() => {}}
                    >
                        <BiUndo />
                    </button>
                    <button
                        className='btn focus:z-[1]'
                        title='clear'
                        onClick={() => {}}
                    >
                        <BiTrashAlt />
                    </button>
                </div>
                <Slider
                    min={MIN_BRUSH_SIZE}
                    max={MAX_BRUSH_SIZE}
                    value={[size]}
                    onValueChange={(val) => useDraw.setState({ size: val[0] })}
                />
            </div>

            <span>{word}</span>
        </>
    )
}

export default DrawTools
