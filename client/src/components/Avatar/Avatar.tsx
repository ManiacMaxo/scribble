import { UserContext } from '@/contexts'
import React, { useContext, useState } from 'react'

const Avatar: React.FC = () => {
    const { avatarURL } = useContext(UserContext)
    const [avatars, _] = useState([...Array(50).keys()])
    const [selected, setSelected] = useState<number>()

    return (
        <div className='overflow-x-hidden'>
            {/* <div className='flex h-64 space-between'>
                {avatars.map((id) => (
                    <img
                        src={`/assets/avatars/${id}.png`}
                        key={id}
                        className='w-1/3 aspect-square'
                        onClick={() => setSelected(id)}
                    />
                ))}
            </div> */}

            <img
                src={avatarURL ?? 'assets/avatars/1.png'}
                className='h-64 mx-auto'
            />
        </div>
    )
}

export default Avatar
