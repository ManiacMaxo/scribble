import { useEffect, useState } from 'react'
import { UserContext } from './UserContext'

interface Props {
    children: React.ReactNode
}

const UserContextProvider: React.FC<Props> = (props) => {
    const [username, setUsername] = useState<string>(
        () => localStorage.getItem('username') ?? ''
    )
    const [avatarURL, setAvatarURL] = useState<string>(
        () =>
            localStorage.getItem('avatarURL') ??
            `/assets/avatars/${Math.random() * 50}.png`
    )

    useEffect(() => {
        localStorage.setItem('username', username)
    }, [username])

    useEffect(() => {
        localStorage.setItem('avatarURL', avatarURL)
    }, [avatarURL])

    return (
        <UserContext.Provider
            value={{
                username,
                avatarURL,
                setUsername,
                setAvatarURL
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
