import { useEffect, useState } from 'react'
import { UserContext } from './UserContext'

interface Props {}

const UserContextProvider: React.FC<Props> = (props) => {
    const [name, setName] = useState<string | null>(null)
    const [avatarURL, setAvatarURL] = useState<string | null>(null)

    useEffect(() => {
        setName(localStorage.getItem('name') ?? '')
        const rand = Math.round(Math.random() * 50)
        setAvatarURL(
            localStorage.getItem('avatarURL') ?? `/assets/avatars/${rand}.png`
        )
    }, [])

    useEffect(() => {
        if (name === null) return
        localStorage.setItem('name', name)
    }, [name])

    useEffect(() => {
        if (avatarURL === null) return
        localStorage.setItem('avatarURL', avatarURL)
    }, [avatarURL])

    return (
        <UserContext.Provider
            value={{
                name,
                avatarURL,
                setName,
                setAvatarURL
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
