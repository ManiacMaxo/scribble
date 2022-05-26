import { useLobby } from '@/store/lobby'
import React from 'react'

const UserList: React.FC = () => {
    const users = useLobby((s) => s.users)

    return (
        <ul className='space-y-3'>
            {users.map((user) => (
                <li key={user.id} className='flex items-center gap-2'>
                    <img
                        src={user.avatarURL}
                        alt={user.name}
                        className='aspect-square w-10'
                    />
                    <div className='flex-1'>
                        <span className='block overflow-hidden text-ellipsis font-bold'>
                            {user.name}
                        </span>
                        <span>{user.points} pts</span>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export { UserList }
