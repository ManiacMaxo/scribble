import React, { useContext, useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { ILobbyContext, LobbyContext } from '../contexts/Lobby'

interface Props {
    open: boolean
}

const WordsModal: React.FC<Props> = (props) => {
    const { socket, setCanChat, setCanDraw } = useContext<ILobbyContext>(
        LobbyContext
    )
    const [words, setWords] = useState<string[]>([])

    socket?.on('newRound', (data: string[]) => {
        setCanDraw(true)
        setCanChat(false)
        setWords(data)
    })

    const submitWord = (event: any) => {
        socket?.emit('word', event.target.value)
    }

    return (
        <Modal size='tiny' open={props.open}>
            <Modal.Header>Pick a word</Modal.Header>
            <Modal.Content>
                {words.map((word) => (
                    <Button onClick={submitWord}>{word}</Button>
                ))}
            </Modal.Content>
        </Modal>
    )
}

export { WordsModal }
