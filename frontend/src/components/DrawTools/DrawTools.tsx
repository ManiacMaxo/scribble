import React, { useEffect, useState } from 'react'
import { CgColorBucket } from 'react-icons/cg'
import { FaEraser, FaTrash } from 'react-icons/fa'
import { ImPencil, ImUndo2 } from 'react-icons/im'
import styles from './DrawTools.module.scss'

interface Props {
    canvas: any
}

const DrawTools: React.FC<Props> = (props) => {
    const colours: string[] = ['black', 'white', 'red', 'green', 'blue']
    const [colour, setColour] = useState<string>(colours[0])

    useEffect(() => {
        // props.canvas.current.props.brushColor = colour
        console.log(props.canvas.current.props)
    }, [colour, props.canvas])

    return (
        <>
            <div className={styles.colours}>
                {colours.map((clr: string) => (
                    <div
                        className={styles[clr]}
                        key={clr}
                        onClick={() => {
                            setColour(clr)
                        }}
                    ></div>
                ))}
            </div>
            <div className={styles.controls}>
                <ImPencil title='draw' />
                <FaEraser title='erase' />
                <CgColorBucket title='fill' />
                <ImUndo2
                    onClick={() => props.canvas.current.undo()}
                    title='undo'
                />
                <FaTrash
                    onClick={() => props.canvas.current.clear()}
                    title='clear'
                />
            </div>
            <h3 className={styles.word}>{'word'}</h3>
        </>
    )
}

export default DrawTools
