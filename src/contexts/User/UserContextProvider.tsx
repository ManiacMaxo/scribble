import { useEffect, useState } from 'react'
import { UserContext } from './UserContext'

interface Props {}

const UserContextProvider: React.FC<Props> = (props) => {
    const [username, setUsername] = useState<string | null>(null)
    const [avatarURL, setAvatarURL] = useState<string | null>(null)

    useEffect(() => {
        setUsername(localStorage.getItem('username') ?? '')
        const rand = Math.round(Math.random() * 50)
        setAvatarURL(
            localStorage.getItem('avatarURL') ?? `/assets/avatars/${rand}.png`
        )
    }, [])

    useEffect(() => {
        if (username === null) return
        localStorage.setItem('username', username)
    }, [username])

    useEffect(() => {
        if (avatarURL === null) return
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
