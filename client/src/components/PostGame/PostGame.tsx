import { LobbyContext } from '@/contexts'
import { User } from '@/types'
import React, { useContext } from 'react'
import { Button, Header, Image, List } from 'semantic-ui-react'
import styles from './PostGame.module.scss'

interface Props {
    users: User[]
}

const PostGame: React.FC<Props> = (props) => {
    const { setIsFinished } = useContext(LobbyContext)

    const orderedUsers = props.users.sort((a, b) => b.points - a.points)

    return (
        <div className='default-card'>
            <Header as='h1' textAlign='center'>
                Final Rankings
            </Header>
            <List horizontal ordered size='massive' className={styles.podium}>
                {orderedUsers.slice(0, 3).map((user) => (
                    <List.Item key={user.id}>
                        <Image src={user.avatarURL} avatar />
                        <List.Content>
                            <List.Header>{user.name}</List.Header>
                            {user.points}
                        </List.Content>
                    </List.Item>
                ))}
            </List>
            <List size='large'>
                {orderedUsers.slice(3).map((user) => (
                    <List.Item key={user.id}>
                        <Image src={user.avatarURL} avatar />
                        <List.Content>
                            <List.Header>{user.name}</List.Header>
                            {user.points}
                        </List.Content>
                    </List.Item>
                ))}
            </List>
            <Button primary onClick={() => setIsFinished(false)}>
                Continue
            </Button>
        </div>
    )
}

export default PostGame
