import React, { ReactNode } from 'react'
import { Helmet } from 'react-helmet'

type Props = {
    children?: ReactNode
    title?: string
}

const Layout: React.FC = ({
    children,
    title = 'Scribble - Multiplayer Drawing Game'
}: Props) => (
    <div className='main'>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        {children}
    </div>
)

export { Layout }
