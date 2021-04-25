import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { useContext } from 'react'
import { Button } from 'semantic-ui-react'
import { ILobbyContext, LobbyContext } from '../../contexts/Lobby'
import { skribblio } from './colours'
import styles from './DrawTools.module.scss'

interface Props {
    canvas: any
}

const DrawTools: React.FC<Props> = (props) => {
    const { colours, len } = skribblio

    const {
        colour,
        setColour,
        setRadius,
        word,
        socket
    } = useContext<ILobbyContext>(LobbyContext)

    return (
        <>
            <div
                className={styles.colors}
                style={{ gridTemplateColumns: `repeat(${len}, 30px)` }}
            >
                {colours.map((clr: string) => (
                    <button
                        key={clr}
                        className={colour === clr ? styles.active : undefined}
                        style={{ background: clr }}
                        onClick={() => {
                            setColour(clr)
                        }}
                    />
                ))}
            </div>

            <div>
                <Button.Group basic>
                    <Button
                        title='draw'
                        icon='pencil'
                        onClick={() => {
                            setColour('black')
                        }}
                    />
                    <Button
                        title='eraser'
                        icon='eraser'
                        onClick={() => {
                            setColour('white')
                        }}
                    />
                    <Button title='fill' icon='tint' onClick={() => {}} />
                    <Button
                        title='undo'
                        icon='undo'
                        onClick={() => props.canvas.current.undo()}
                    />
                    <Button
                        title='clear'
                        icon='trash'
                        onClick={() => {
                            props.canvas.current.clear()
                            socket?.emit(
                                'drawing',
                                JSON.stringify({
                                    lines: [],
                                    height: 0,
                                    width: 0
                                })
                            )
                        }}
                    />
                </Button.Group>
                <Slider
                    className={styles.slider}
                    defaultValue={12}
                    onAfterChange={setRadius}
                    min={2}
                    max={50}
                />
            </div>

            <span>{word}</span>
        </>
    )
}

export default DrawTools
