import { LobbyContext } from '@/contexts'
import { User } from '@/utils/types'
import Image from 'next/image'
import React, { useContext, useMemo } from 'react'
import { List } from 'semantic-ui-react'

interface Props {
    users: User[]
}

const PostGame: React.FC<Props> = (props) => {
    const { setIsFinished } = useContext(LobbyContext)

    const orderedUsers = useMemo(
        () => props.users.sort((a, b) => b.points - a.points),
        []
    )

    return (
        <div className='default-card'>
            <h1 className='text-center'>Final Rankings</h1>
            <List
                horizontal
                ordered
                size='massive'
                className='flex justify-between'
            >
                {orderedUsers.slice(0, 3).map((user) => (
                    <List.Item key={user.id}>
                        <Image src={user.avatarURL} className='avatar' />
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
                        <Image src={user.avatarURL} className='avatar' />
                        <List.Content>
                            <List.Header>{user.name}</List.Header>
                            {user.points}
                        </List.Content>
                    </List.Item>
                ))}
            </List>
            <button
                className='btn btn-primary'
                onClick={() => setIsFinished(false)}
            >
                Continue
            </button>
        </div>
    )
}

export default PostGame
