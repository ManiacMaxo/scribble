import React from 'react'
import styles from './Avatar.module.scss'

interface Props {}

const Avatar: React.FC<Props> = () => {
    const avatars = [
        'https://react.semantic-ui.com/images/avatar/small/matt.jpg',
        'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
    ]

    return (
        <div className={styles.root}>
            {/* <Button compact>
                <Icon name='arrow circle left'></Icon>
            </Button>
            <Image
                src='https://react.semantic-ui.com/images/avatar/large/matt.jpg'
                size='small'
            />
            <Button compact>
                <Icon name='arrow circle right'></Icon>
            </Button> */}
        </div>
    )
}

export default Avatar
