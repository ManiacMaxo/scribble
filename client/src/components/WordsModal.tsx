import { useLobby } from '@/store/lobby'
import { Dialog, Transition } from '@headlessui/react'
import React from 'react'

interface Props {
    isOpen: boolean
    options: string[]
}

const WordsModal: React.FC<Props> = (props) => {
    const socket = useLobby((s) => s.socket)

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
                <div className='flex min-h-screen items-center justify-center'>
                    <Dialog.Overlay className='fixed inset-0 opacity-50 dark:bg-slate-900' />
                    <div className='relative min-w-[500px] rounded-xl p-6 dark:bg-slate-700'>
                        <Dialog.Title className='mb-5 text-2xl'>
                            Pick a word
                        </Dialog.Title>

                        <div className='flex gap-3'>
                            {props.options.map((word) => (
                                <button
                                    className='btn btn-primary flex-1'
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
