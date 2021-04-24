import React, { useContext, useEffect, useState } from 'react'
import { Comment, Input } from 'semantic-ui-react'
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

    useEffect(() => {
        if (!socket) return
        socket.on('message', (message: Message) => {
            const timestamp: string = new Date(message.timestamp)
                .toTimeString()
                .slice(0, 5)

            setMessages((m) => [
                ...m,
                {
                    ...message,
                    timestamp
                }
            ])
        })

        socket.on('correct', () => {
            setCanChat(false)
        })
    }, [socket])

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
