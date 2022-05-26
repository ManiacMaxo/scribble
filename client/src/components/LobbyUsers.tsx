import { useLobby } from '@/store/lobby'
import React from 'react'

const LobbyUsers: React.FC = () => {
    const socket = useLobby((s) => s.socket)
    const users = useLobby((s) => s.users)
    const id = useLobby((s) => s.id)

    if (!socket) return null
    return (
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {users.map((user) => (
                <div
                    key={user.id}
                    className='dark:bg-base-200 flex gap-2 rounded-xl bg-white px-2 py-4'
                >
                    <img
                        src={user.avatarURL}
                        alt={user.name}
                        className='aspect-square w-16'
                    />

                    <div className='flex flex-1 flex-col justify-between'>
                        <span className='block overflow-hidden text-ellipsis whitespace-nowrap text-lg'>
                            {user.name}
                        </span>

                        {id !== user.id && (
                            <button
                                className='btn btn-outline btn-error btn-sm block w-full'
                                onClick={() => socket.emit('kick', id)}
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
