import { useLobby } from '@/store/lobby'
import { useUser } from '@/store/user'
import { Message } from '@/utils/types'
import React, { useEffect, useRef, useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { v4 } from 'uuid'

const MAX_CHAT_HISTORY = 30

const Chat: React.FC = () => {
    const socket = useLobby((s) => s.socket)
    const canChat = useLobby((s) => s.canChat)

    const name = useUser((s) => s.name)
    const avatarURL = useUser((s) => s.avatarURL)

    const [messages, setMessages] = useState<Array<Message>>([])
    const [message, setMessage] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)

    const addMessage = (message: Message) => {
        setMessages((prev) => [
            ...prev.slice(-MAX_CHAT_HISTORY + 1),
            {
                ...message,
                timestamp: new Date(message.timestamp)
                    .toTimeString()
                    .slice(0, 5)
            }
        ])
    }

    useEffect(() => {
        if (!socket) return

        socket.on('message', (message: Message) => addMessage(message))
        socket.on('serverMessage', (content: string) =>
            addMessage({
                id: v4(),
                username: 'Event',
                avatarURL: '/assets/server.png',
                content,
                timestamp: new Date().toUTCString()
            })
        )

        socket.on('correct', () => useLobby.setState({ canChat: false }))

        return () => {
            socket.off('message')
            socket.off('serverMessage')
            socket.off('correct')
        }
    }, [socket])

    useEffect(() => bottomRef.current?.scrollIntoView(), [messages, bottomRef])

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        if (!message || !canChat) return

        socket?.emit('message', {
            username: name,
            avatarURL: avatarURL(),
            content: message
        })

        setMessage('')
    }

    return (
        <div className='col-start-3 row-start-2 flex h-full flex-col justify-between overflow-y-hidden p-1'>
            <div className='flex h-[90%] flex-col gap-3 overflow-y-scroll'>
                {messages.map((message) => (
                    <div key={message.id} className='flex items-start gap-2'>
                        <img
                            src={message.avatarURL}
                            alt={message.username}
                            className='aspect-square w-10 shrink-0'
                        />
                        <div className='flex-1 space-y-1'>
                            <div className='flex items-end gap-x-1'>
                                <span className='block leading-none'>
                                    {message.username}
                                </span>
                                <span className='block text-xs leading-none text-slate-500'>
                                    {message.timestamp}
                                </span>
                            </div>
                            <p className='break-all text-sm text-slate-500 dark:text-slate-300'>
                                {message.content}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <input
                        type='text'
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        className='input input-bordered flex-1 focus:z-[1]'
                        maxLength={64}
                        disabled={!canChat}
                        placeholder={
                            canChat ? 'Enter your guess' : "You can't chat now"
                        }
                    />
                    <button
                        className='btn btn-primary w-max shrink-0'
                        disabled={!canChat}
                    >
                        <BiSend className='text-xl' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export { Chat }
