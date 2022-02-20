import { LobbyContext } from '@/contexts'
import React, { useContext } from 'react'

const UserList: React.FC = () => {
    const { users } = useContext(LobbyContext)

    return (
        <ul className='space-y-3'>
            {users.map((user) => (
                <li key={user.id} className='flex items-center gap-2'>
                    <img
                        src={user.avatarURL}
                        alt={user.name}
                        className='w-10 aspect-square'
                    />
                    <div className='flex-1'>
                        <span className='block overflow-hidden font-bold text-ellipsis'>
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
