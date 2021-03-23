import React, { FormEvent, useRef } from 'react'
import { Comment, Input } from 'semantic-ui-react'
import { Socket } from 'socket.io-client'
import styles from './Chat.module.scss'

interface Props {
    canChat: boolean
    socket: Socket
}

const Chat: React.FC<Props> = (props) => {
    const chat = useRef(null)

    props.socket.once('message', (message: any) => {
        console.log(message)
        // chat.children.push(
        //     <Comment key={message.id}>
        //         <p className={styles.message}>
        //             {message.user}: {message.content}
        //         </p>
        //     </Comment>
        // )
    })

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        const data = {
            user: localStorage.getItem('name') || 'john',
            content: event.target[0].value
        }
        event.target[0].value = ''
        props.socket.emit('message', data)
    }

    return (
        <div className={styles.root}>
            <Comment.Group className={styles.chat} ref={chat}></Comment.Group>
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
