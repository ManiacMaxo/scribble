import { useUser } from '@/store/user'
import React from 'react'

const avatarIds = [...Array(50).keys()]

const Avatar: React.FC = () => {
    const avatarId = useUser((s) => s.avatarId)
    const setAvatar = useUser((s) => s.setAvatar)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code === 'ArrowLeft') {
            setAvatar(
                avatarId - 1 < 0
                    ? avatarIds[avatarIds.length - 1]
                    : avatarId - 1
            )
        } else if (e.code === 'ArrowRight') {
            setAvatar(avatarId + 1 === avatarIds.length ? 0 : avatarId + 1)
        }
    }

    return (
        <div
            className='focus:ring-primary-focus/30 dark:focus:ring-primary-focus overflow-x-hidden rounded p-2 focus:outline-none focus:ring'
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div className='space-between relative flex h-40 overflow-hidden md:h-48 lg:h-64'>
                {avatarIds.map((id, idx) => (
                    <img
                        style={{
                            left: `${(idx - (avatarId - 1)) * 35}%`
                        }}
                        src={`/assets/avatars/${id}.png`}
                        key={id}
                        className='duration-400 absolute aspect-square h-full cursor-pointer transition-all'
                        onClick={() => setAvatar(id)}
                    />
                ))}
            </div>
        </div>
    )
}

export { Avatar }
