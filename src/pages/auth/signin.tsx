import { getProviders, signIn } from 'next-auth/client'
import React from 'react'
import { GoMarkGithub } from 'react-icons/go'
import { Button, Icon } from 'semantic-ui-react'

interface Provider {
    name: string
    id: string
    callbackUrl: string
    signinUrl: string
    type: string
}

interface Props {
    providers: Provider[]
}

const signin: React.FC<Props> = ({ providers }): JSX.Element => {
    const icons = new Map([
        ['GitHub', <Icon as={GoMarkGithub} />],
        ['Discord', <Icon name='discord' />]
    ])

    return (
        <div className='default-card md'>
            {Object.values(providers).map((provider) => (
                <Button
                    icon
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                    style={{ marginBottom: '0.5rem' }}
                >
                    {icons.get(provider.name)}
                    Sign in with {provider.name}
                </Button>
            ))}
        </div>
    )
}

export const getServerSideProps = async (_context: any) => {
    const providers = await getProviders()

    return {
        props: { providers }
    }
}

export default signin
