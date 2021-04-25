import React, { useContext } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { ILobbyContext, LobbyContext } from '../contexts/Lobby'

interface Props {
    open: boolean
    words: string[]
}

const WordsModal: React.FC<Props> = (props) => {
    const { socket } = useContext<ILobbyContext>(LobbyContext)

    const submitWord = (data: string) => {
        socket?.emit('drawingResponse', data)
    }

    return (
        <Modal size='tiny' open={props.open}>
            <Modal.Header>Pick a word</Modal.Header>
            <Modal.Content>
                {props.words.map((word) => (
                    <Button onClick={() => submitWord(word)}>{word}</Button>
                ))}
            </Modal.Content>
        </Modal>
    )
}

export { WordsModal }
