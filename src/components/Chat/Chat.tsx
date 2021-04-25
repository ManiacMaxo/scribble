import React, { useContext, useEffect, useRef, useState } from 'react'
import { Comment, Input } from 'semantic-ui-react'
import { v4 } from 'uuid'
import { ILobbyContext, LobbyContext } from '../../contexts/Lobby'
import { IUserContext, UserContext } from '../../contexts/User'
import { Message } from '../../types'
import styles from './Chat.module.scss'

interface Props {}

const Chat: React.FC<Props> = () => {
    const { socket, canChat, setCanChat } = useContext<ILobbyContext>(
        LobbyContext
    )
    const { name, avatarURL } = useContext<IUserContext>(UserContext)
    const [messages, setMessages] = useState<Message[]>([])
    const bottomRef = useRef<any>(null)

    const maxChatHistory = 30

    useEffect(() => {
        if (!socket) return
        socket.on('message', (message: Message) => {
            setMessages((prev) => [
                ...prev.slice(-maxChatHistory + 1),
                {
                    ...message,
                    timestamp: new Date(message.timestamp)
                        .toTimeString()
                        .slice(0, 5)
                }
            ])
        })

        socket.on('serverMessage', (content: string) => {
            setMessages((prev) => [
                ...prev.slice(-maxChatHistory + 1),
                {
                    id: v4(),
                    username: 'Event',
                    avatarURL: '/assets/server.png',
                    content,
                    timestamp: new Date().toTimeString().slice(0, 5)
                }
            ])
        })

        socket.on('correct', () => {
            setCanChat(false)
        })
    }, [socket])

    useEffect(() => {
        bottomRef.current?.scrollIntoView()
    }, [messages, bottomRef])

    const handleSubmit = (event: any) => {
        event.preventDefault()
        if (!event.target[0].value || !canChat) return

        const data = {
            username: name,

            avatarURL,
            content: event.target[0].value
        }
        event.target[0].value = ''
        socket?.emit('message', data)
    }

    return (
        <div className={styles.root}>
            <Comment.Group className={styles.chat}>
                {messages.map((message) => (
                    <Comment key={message.id}>
                        <Comment.Avatar src={message.avatarURL} />
                        <Comment.Content>
                            <Comment.Author as='span'>
                                {message.username}
                            </Comment.Author>
                            <Comment.Metadata as='span'>
                                {message.timestamp}
                            </Comment.Metadata>
                            <Comment.Text>{message.content}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                ))}
                <div ref={bottomRef} />
            </Comment.Group>
            <form onSubmit={handleSubmit}>
                <Input
                    fluid
                    action={{
                        compact: true,
                        color: 'blue',
                        icon: 'send',
                        type: 'submit',
                        disabled: !canChat
                    }}
                    placeholder={
                        canChat ? 'Enter your guess' : `You can't chat now`
                    }
                    maxLength={64}
                    disabled={!canChat}
                />
            </form>
        </div>
    )
}

export default Chat
