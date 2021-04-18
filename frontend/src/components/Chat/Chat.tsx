import React, { useContext, useState } from 'react'
import { Comment, Input } from 'semantic-ui-react'
import { ILobbyContext, LobbyContext } from '../../contexts/Lobby'
import { IUserContext, UserContext } from '../../contexts/User'
import styles from './Chat.module.scss'

interface Props {}

interface Message {
    id: string
    username: string
    content: string
    timestamp: string
}

const Chat: React.FC<Props> = () => {
    const { socket, canChat, setCanChat } = useContext<ILobbyContext>(
        LobbyContext
    )
    const { username, avatarURL } = useContext<IUserContext>(UserContext)
    const [messages, setMessages] = useState<Message[]>([])

    socket?.on('message', (message: Message) => {
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

    socket?.on('correct', () => {
        setCanChat(false)
    })

    const handleSubmit = (event: any) => {
        event.preventDefault()
        if (!event.target[0].value || !canChat) return

        const data = {
            username,
            content: event.target.value
        }
        event.target[0].value = ''
        socket?.emit('message', data)
    }

    return (
        <div className={styles.root}>
            <Comment.Group className={styles.chat}>
                {messages.map((message) => (
                    <Comment key={message.id}>
                        <Comment.Avatar src={avatarURL} />
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
