import { LobbyContext } from '@/contexts'
import React, { useContext } from 'react'

const LobbyUsers: React.FC = () => {
    const { users, socket, id } = useContext(LobbyContext)

    const handleKick = (id: string) => {
        if (!socket) return
        socket.emit('kick', id)
    }

    if (!socket) return null
    return (
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {users.map((user) => (
                <div
                    key={user.id}
                    className='flex gap-2 px-2 py-4 bg-white dark:bg-base-200 rounded-xl'
                >
                    <img
                        src={user.avatarURL}
                        alt={user.name}
                        className='w-16 aspect-square'
                    />

                    <div className='flex flex-col justify-between flex-1'>
                        <span className='block overflow-hidden text-lg text-ellipsis whitespace-nowrap'>
                            {user.name}
                        </span>

                        {id !== user.id && (
                            <button
                                className='block w-full btn btn-outline btn-error btn-sm'
                                onClick={() => handleKick(user.id)}
                            >
                                Kick
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export { LobbyUsers }
