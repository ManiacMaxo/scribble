import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Comment, Input, Ref } from 'semantic-ui-react'
import { Socket } from 'socket.io-client'
import styles from './Chat.module.scss'

interface Props {
    canChat: boolean
    socket: Socket
}

const Chat: React.FC<Props> = (props) => {
    const chatRef = useRef(null)
    const [name, setName] = useState<string | null>()

    useEffect(() => {
        setName(localStorage.getItem('name'))

        props.socket.on('message', (message: any) => {
            console.log(message)
            // chat.children.push(
            //     <Comment key={message.id}>
            //         <p className={styles.message}>
            //             {message.name}: {message.content}
            //         </p>
            //     </Comment>
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
                <Comment.Group className={styles.chat}></Comment.Group>
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
