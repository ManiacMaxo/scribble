import { UserContext } from '@/contexts'
import React, { useContext, useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { Image } from 'semantic-ui-react'
import styles from './Avatar.module.scss'

const Avatar: React.FC = () => {
    const { avatarURL, setAvatarURL } = useContext(UserContext)
    const avatars: number[] = [...Array(50).keys()]

    const [selected, setSelected] = useState<number>()

    useEffect(() => {
        setSelected(parseInt(avatarURL?.match(/\d/g)?.join('') ?? '0'))
    }, [avatarURL])

    return (
        <Carousel
            selectedItem={selected}
            onChange={(id) => {
                setAvatarURL(`/assets/avatars/${id}.png`)
            }}
            centerMode
            centerSlidePercentage={35}
            swipeable
            emulateTouch
            infiniteLoop
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            useKeyboardArrows
        >
            {avatars.map((id) => (
                <Image
                    size='small'
                    src={`/assets/avatars/${id}.png`}
                    key={id}
                    className={styles.avatar}
                />
            ))}
        </Carousel>
    )
}

export default Avatar