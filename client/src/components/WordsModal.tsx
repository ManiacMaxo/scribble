import { LobbyContext } from '@/contexts'
import React, { useContext } from 'react'
import { Modal } from 'semantic-ui-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

interface Props {
    open: boolean
    words: string[]
}

const WordsModal: React.FC<Props> = (props) => {
    const { socket } = useContext(LobbyContext)

    const submitWord = (data: string) => {
        socket?.emit('drawingResponse', data)
    }

    return (
        <DialogPrimitive.Root>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className='fixed inset-0' />

                <DialogPrimitive.Content className='rounded-xl'>
                    <DialogPrimitive.Title>Pick a word</DialogPrimitive.Title>
                </DialogPrimitive.Content>
                <Modal size='tiny' open={props.open}>
                    <Modal.Header>Pick a word</Modal.Header>
                    <Modal.Content>
                        {props.words.map((word) => (
                            <button
                                className='btn btn-primary'
                                key={word}
                                onClick={() => submitWord(word)}
                            >
                                {word}
                            </button>
                        ))}
                    </Modal.Content>
                </Modal>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    )
}

export { WordsModal }
