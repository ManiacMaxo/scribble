import { useEffect, useState } from 'react'
import { UserContext } from './UserContext'

interface Props {}

const UserContextProvider: React.FC<Props> = (props) => {
    const [username, setUsername] = useState<string>('')
    const [avatarURL, setAvatarURL] = useState<string>(
        `/assets/avatars/${Math.random() * 50}.png`
    )

    useEffect(() => {
        setUsername(localStorage.getItem('username') ?? '')
        setAvatarURL(
            localStorage.getItem('avatarURL') ??
                `/assets/avatars/${Math.random() * 50}.png`
        )
    }, [])

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
