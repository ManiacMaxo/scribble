import { LobbyContext } from '@/contexts'
import React, { useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
    isOpen: boolean
    options: string[]
}

const WordsModal: React.FC<Props> = (props) => {
    const { socket } = useContext(LobbyContext)

    const submitWord = (data: string) => socket?.emit('drawingResponse', data)

    return (
        <Transition
            show={props.isOpen}
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
        >
            <Dialog
                onClose={() => {}}
                className='fixed inset-0 overflow-y-auto'
            >
                <div className='flex items-center justify-center min-h-screen'>
                    <Dialog.Overlay className='fixed inset-0 opacity-50 dark:bg-slate-900' />
                    <div className='relative p-6 rounded-xl dark:bg-slate-700 min-w-[500px]'>
                        <Dialog.Title className='mb-5 text-2xl'>
                            Pick a word
                        </Dialog.Title>

                        <div className='flex gap-3'>
                            {props.options.map((word) => (
                                <button
                                    className='flex-1 btn btn-primary'
                                    key={word}
                                    onClick={() => submitWord(word)}
                                >
                                    {word}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export { WordsModal }
