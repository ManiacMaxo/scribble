import React, { useContext } from 'react'
import { Button, SemanticCOLORS } from 'semantic-ui-react'
import { ILobbyContext, LobbyContext } from '../../contexts/LobbyContext'
import styles from './DrawTools.module.scss'

interface Props {
    canvas: any
}

const DrawTools: React.FC<Props> = (props) => {
    const colours: SemanticCOLORS[] = [
        'red',
        'orange',
        'yellow',
        'green',
        'teal',
        'blue',
        'violet',
        'purple',
        'pink',
        'brown',
        'grey',
        'black'
    ]
    const { setColour } = useContext<ILobbyContext>(LobbyContext)

    return (
        <>
            <Button.Group className={styles.colors} widths='6'>
                {colours.map((clr: SemanticCOLORS) => (
                    <Button
                        key={clr}
                        color={clr}
                        onClick={() => {
                            setColour(clr)
                        }}
                    />
                ))}
            </Button.Group>
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
            <h3>{'word'}</h3>
        </>
    )
}

export default DrawTools
