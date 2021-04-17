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

    const { colour, setColour, setRadius } = useContext<ILobbyContext>(
        LobbyContext
    )
    const handleChangeRadius = (value: number) => {
        setRadius(value)
    }

    return (
        <>
            <Button.Group
                className={styles.colors}
                widths={len}
                style={{ maxWidth: `${(50 * colours.length) / 2}px` }}
            >
                {colours.map((clr: string) => (
                    <Button
                        toggle
                        active={colour === clr}
                        key={clr}
                        color={undefined}
                        style={{ background: clr }}
                        onClick={() => {
                            setColour(clr)
                        }}
                    />
                ))}
            </Button.Group>

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
                        onClick={() => props.canvas.current.clear()}
                    />
                </Button.Group>
                <Slider
                    defaultValue={12}
                    onAfterChange={handleChangeRadius}
                    min={2}
                    max={50}
                />
            </div>

            <h3>{'word'}</h3>
        </>
    )
}

export default DrawTools
