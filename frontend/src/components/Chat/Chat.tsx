import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Comment, Input, Ref } from 'semantic-ui-react'
import { Socket } from 'socket.io-client'
import styles from './Chat.module.scss'

interface Props {
    canChat: boolean
    socket: Socket
}

const name = localStorage.getItem('name')

const Chat: React.FC<Props> = (props) => {
    const [messages, setMessages] = useState<any[]>([])
    const chatRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        props.socket.on('message', (message: any) => {
            console.log(message)
            setMessages((m) => [...m, message])
            // chatRef.current?.append(
            //     document.createElement(
            //         <div key={message.id}>
            //             <p className={styles.message}>
            //                 {message.name}: {message.content}
            //             </p>
            //         </div>
            //     )
            // )
        })
    }, [props.socket])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (!event.target[0].value) return

        const data = {
            name,
            content: event.target[0].value
        }
        event.target[0].value = ''
        props.socket.emit('message', data)
    }

    return (
        <div className={styles.root}>
            <Ref innerRef={chatRef}>
                <Comment.Group className={styles.chat}>
                    {messages.map((message) => (
                        <Comment key={message.id}>
                            <p className={styles.message}>
                                {message.name}: {message.content}
                            </p>
                        </Comment>
                    ))}
                </Comment.Group>
            </Ref>
            <form onSubmit={handleSubmit}>
                <Input
                    fluid
                    action={{
                        compact: true,
                        color: 'blue',
                        icon: 'send',
                        type: 'submit'
                    }}
                    placeholder={
                        props.canChat
                            ? 'Enter your guess'
                            : `You can't chat now`
                    }
                    maxLength={64}
                    disabled={!props.canChat}
                />
            </form>
        </div>
    )
}

export default Chat
