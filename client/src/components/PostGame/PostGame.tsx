import { useLobby } from '@/store/lobby'
import { User } from '@/utils/types'
import React, { useMemo } from 'react'

interface Props {
    users: User[]
}

const PostGame: React.FC<Props> = (props) => {
    const orderedUsers = useMemo(
        () => props.users.sort((a, b) => b.points - a.points),
        []
    )

    return (
        <div className='default-card'>
            <h1 className='text-center text-2xl'>Final Rankings</h1>

            <ol className='flex items-center justify-between gap-5'>
                {orderedUsers.slice(0, 3).map((user) => (
                    <li key={user.id} className='w-1/4 '>
                        <img
                            src={user.avatarURL}
                            className='avatar mb-2 aspect-square'
                        />
                        <div className='text-center'>
                            <h3 className='text-lg'>{user.name}</h3>
                            <span className='text-sm'>{user.points} pts</span>
                        </div>
                    </li>
                ))}
            </ol>

            <ol>
                {orderedUsers.slice(3).map((user) => (
                    <li key={user.id} className='flex items-center gap-2'>
                        <img
                            src={user.avatarURL}
                            className='avatar aspect-square w-16'
                        />
                        <div>
                            <h3>{user.name}</h3>
                            <span>{user.points} pts</span>
                        </div>
                    </li>
                ))}
            </ol>

            <button
                className='btn btn-primary'
                onClick={() => useLobby.setState({ isFinished: false })}
            >
                Continue
            </button>
        </div>
    )
}

export default PostGame
