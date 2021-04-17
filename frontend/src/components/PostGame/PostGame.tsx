import React from 'react'
import { Image, List } from 'semantic-ui-react'
import { User } from '../../types'

interface Props {
    users: User[]
}

const PostGame: React.FC<Props> = (props) => {
    return (
        <div className='default-card'>
            <List ordered>
                {props.users.map((user) => (
                    <List.Item>
                        <Image src={user.avatarURL} />
                        <List.Content>
                            <List.Header>{user.name}</List.Header>
                            {user.points}
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </div>
    )
}

export default PostGame
