import { LobbyContext, UserContext } from '@/contexts'
import { Message } from '@/utils/types'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { v4 } from 'uuid'

const Chat: React.FC = () => {
    const { socket, canChat, setCanChat } = useContext(LobbyContext)
    const { name, avatarURL } = useContext(UserContext)
    const [messages, setMessages] = useState<Array<Message>>([])
    const [message, setMessage] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)

    const maxChatHistory = 30

    const addMessage = (message: Message) => {
        setMessages((prev) => [
            ...prev.slice(-maxChatHistory + 1),
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
                timestamp: new Date().toTimeString()
            })
        )

        socket.on('correct', () => setCanChat(false))

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
            avatarURL,
            content: message
        })

        setMessage('')
    }

    return (
        <div className='flex flex-col justify-between h-full col-start-3 row-start-2 p-1 overflow-y-hidden'>
            <div className='overflow-y-scroll h-[90%] flex flex-col gap-3'>
                {messages.map((message) => (
                    <div key={message.id} className='flex items-start gap-2'>
                        <img
                            src={message.avatarURL}
                            alt={message.username}
                            className='w-10 aspect-square shrink-0'
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
                            <p className='text-sm break-all text-slate-500 dark:text-slate-300'>
                                {message.content}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <div className='input-group'>
                        <input
                            type='text'
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            className='flex-1 input input-bordered'
                            maxLength={64}
                            disabled={!canChat}
                            placeholder={
                                canChat
                                    ? 'Enter your guess'
                                    : "You can't chat now"
                            }
                        />
                        <button
                            className='btn btn-primary shrink-0 w-max'
                            disabled={!canChat}
                        >
                            <BiSend className='text-xl' />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export { Chat }
