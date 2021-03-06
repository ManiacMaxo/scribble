import React from 'react'
import styles from './Chat.module.scss'

interface Props {
    isDrawing: boolean
}

const Chat: React.FC<Props> = (props) => {
    return (
        <div className={styles.root}>
            <ul>
                <li>
                    <p className={styles.message}>ManiacMaxo: hello there</p>
                </li>
                <li>
                    <p className={styles.message}>ManiacMaxo: hello there</p>
                </li>
                <li>
                    <p className={styles.message}>
                        ManiacMaxo: this is a test long message for chat
                    </p>
                </li>
            </ul>
            <input
                type='text'
                placeholder={
                    props.isDrawing ? ' You are drawing!' : 'Enter your guess'
                }
                maxLength={64}
                disabled={props.isDrawing}
            />
        </div>
    )
}

export default Chat
