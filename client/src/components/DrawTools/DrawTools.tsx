import { LobbyContext } from '@/contexts'
import * as Slider from '@radix-ui/react-slider'
import React, { useContext } from 'react'
import { BiEraser, BiPencil, BiTrashAlt, BiUndo } from 'react-icons/bi'
import { FaTint } from 'react-icons/fa'
import { skribblio as colorTheme } from './colours'
import classnames from 'classnames'

interface Props {
    canvas: any
}

const DrawTools: React.FC<Props> = (props) => {
    const { colours, len } = colorTheme

    const { colour, setColour, setRadius, word, socket } =
        useContext(LobbyContext)

    const getBorderRadius = (index: number) => {
        if (index === 0) return 'rounded-tl-md'
        if (index === colours.length / 2 - 1) return 'rounded-tr-md'
        if (index === colours.length - 1) return 'rounded-br-md'
        if (index === colours.length / 2) return 'rounded-bl-md'
    }

    return (
        <>
            <div
                className='grid'
                style={{ gridTemplateColumns: `repeat(${len}, 30px)` }}
            >
                {colours.map((clr: string, index) => (
                    <button
                        key={clr}
                        className={classnames(
                            'w-full h-5 border-4',
                            getBorderRadius(index),
                            clr === colour
                                ? 'border-neutral-500'
                                : 'border-transparent'
                        )}
                        style={{ background: clr }}
                        onClick={() => setColour(clr)}
                    />
                ))}
            </div>

            <div className='relative flex'>
                <div className='btn-group'>
                    <button
                        className='btn'
                        title='draw'
                        onClick={() => setColour('black')}
                    >
                        <BiPencil />
                    </button>
                    <button
                        className='btn'
                        title='eraser'
                        onClick={() => setColour('white')}
                    >
                        <BiEraser />
                    </button>
                    <button className='btn' title='fill' onClick={() => {}}>
                        <FaTint />
                    </button>
                    <button
                        className='btn'
                        title='undo'
                        onClick={() => props.canvas.current.undo()}
                    >
                        <BiUndo />
                    </button>
                    <button
                        className='btn'
                        title='clear'
                        onClick={() => {
                            props.canvas.current.clear()
                            socket?.emit(
                                'draw',
                                JSON.stringify({
                                    lines: [],
                                    height: 0,
                                    width: 0
                                })
                            )
                        }}
                    >
                        <BiTrashAlt />
                    </button>
                </div>
                <Slider.Root
                    min={2}
                    max={50}
                    defaultValue={[12]}
                    onValueChange={(val) => setRadius(val[0])}
                    className='absolute flex items-center w-full h-4 mt-1 select-none top-full touch-none'
                    aria-label='radius'
                >
                    <Slider.Track className='rounded-full h-[2px] dark:bg-slate-50 grow'>
                        <Slider.Range className='w-full h-full rounded-full bg-inherit' />
                    </Slider.Track>
                    <Slider.Thumb className='block w-4 h-4 transition-all rounded-full shadow dark:bg-slate-50 focus:shadow-base-300 focus:shadow-lg hover:bg-slate-100' />
                </Slider.Root>
            </div>

            <span>{word}</span>
        </>
    )
}

export default DrawTools
