import Carousel, {
    arrowsPlugin,
    slidesToShowPlugin
} from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import React, { useContext } from 'react'
import { Button, Image } from 'semantic-ui-react'
import { IUserContext, UserContext } from '../../contexts/UserContext'

interface Props {}

const Avatar: React.FC<Props> = () => {
    const { avatarURL, setAvatarURL } = useContext<IUserContext>(UserContext)
    const avatars: number[] = Array.from(Array(50).keys())

    return (
        <Carousel
            value={parseInt(avatarURL.match(/\d/g)?.join('') ?? '0')}
            onChange={(id) => setAvatarURL(`/assets/avatars/${id}.png`)}
            plugins={[
                'infinite',
                'centered',
                {
                    resolve: slidesToShowPlugin,
                    options: {
                        numberOfSlides: 2
                    }
                },
                {
                    resolve: arrowsPlugin,
                    options: {
                        arrowLeft: (
                            <Button icon='arrow alternate circle left' />
                        ),
                        arrowRight: (
                            <Button icon='arrow alternate circle right' />
                        ),
                        addArrowClickHandler: true
                    }
                }
            ]}
            slides={avatars.map((id) => (
                <Image
                    size='small'
                    src={`/assets/avatars/${id}.png`}
                    key={id}
                />
            ))}
        />
    )
}

export default Avatar
